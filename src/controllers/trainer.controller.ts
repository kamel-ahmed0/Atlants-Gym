import { Request, Response } from 'express';
import Booking from '../models/booking';
import { ClassSession } from '../models/class.session.model';
import { User } from '../models/user.model';

export const getTrainerBookings = async (req: Request, res: Response) => {
  try {
    const request = req as any;

    const trainerEmail = request.user.email;

    const page = Math.max(parseInt(request.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(request.query.limit, 10) || 10, 1);
    const skip = (page - 1) * limit;

    const trainer = await User.findOne({ email: trainerEmail }).select('_id').lean();
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const trainerSessions = await ClassSession.find({ trainer: trainer._id })
      .select('_id')
      .lean();
    const sessionIds = trainerSessions.map(session => session._id);

    const [bookings, totalCount] = await Promise.all([
      Booking.find({ session: { $in: sessionIds } })
        .skip(skip)
        .limit(limit)
        .lean(),
      Booking.countDocuments({ session: { $in: sessionIds } })
    ]);

    return res.status(200).json({
      message: 'Here are the bookings for your sessions',
      bookings: bookings,
      pagination: {
        totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const request = req as any;

    const trainerEmail = request.user.email;
    const trainer = await User.findOne({ email: trainerEmail });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const { title, description, date, capacity } = req.body;

    if (!title || !date || !capacity) {
      return res.status(400).json({ message: 'title, date and capacity are required' });
    }

    const newSession = new ClassSession({
      title,
      description,
      date,
      capacity,
      trainer: trainer._id
    });

    await newSession.save();
    return res.status(201).json({ message: 'Session created successfully', session: newSession });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const request = req as any;

    const sessionId = request.params.sessionId;
    const trainer = await User.findOne({ email: request.user.email });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const session = await ClassSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.trainer.toString() !== trainer._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own sessions' });
    }

    const { title, description, date, capacity } = req.body;
    if (title) session.title = title;
    if (description) session.description = description;
    if (date) session.date = date;
    if (capacity) session.capacity = capacity;

    await session.save();
    return res.status(200).json({ message: 'Session updated successfully', session });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const request = req as any;

    const sessionId = request.params.sessionId;
    const trainer = await User.findOne({ email: request.user.email });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const session = await ClassSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    if (session.trainer.toString() !== trainer._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own sessions' });
    }

    await ClassSession.findByIdAndDelete(sessionId);
    return res.status(200).json({ message: 'Session deleted successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
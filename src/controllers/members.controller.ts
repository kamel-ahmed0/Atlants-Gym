import { Request, Response } from 'express';
import Booking from '../models/booking'; 
import { ClassSession } from '../models/class.session.model'; 
import { User } from '../models/user.model';

export const bookSession = async (req: Request, res: Response) => {
  try {
    const request = req as any; 

    const sessionId = request.params.sessionId;
    const userEmail = request.user.email; 

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const session = await ClassSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const existingBooking = await Booking.findOne({ session: sessionId, member: user._id });
    if (existingBooking) {
      return res.status(400).json({ message: 'You already booked this session' });
    }

    const bookedCount = await Booking.countDocuments({ session: sessionId, status: 'booked' });

    let status = 'booked';
    if (bookedCount >= session.capacity) {
      status = 'waitlisted';
    }
 
    const newBooking = new Booking({
      session: sessionId,
      member: user._id,
      status: status
    });
    
    await newBooking.save();

    if(status === 'waitlisted') {
      return res.status(200).json({ message: 'You are waitlisted for this session', booking: newBooking });
    }
    
    return res.status(201).json({ message: 'Booking successful', booking: newBooking });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const request = req as any;

    const bookingId = request.params.bookingId;
    const userEmail = request.user.email;

    const user = await User.findOne({ email: userEmail });
    const booking = await Booking.findById(bookingId);

    if (!booking || !user) {
      return res.status(404).json({ message: 'Booking or User not found' });
    }

    if (booking.member.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const nextInLine = await Booking.findOne({ session: booking.session, status: 'waitlisted' });
    if (nextInLine) {
      nextInLine.status = 'booked';
      await nextInLine.save();
    }

    return res.status(200).json({ message: 'Booking cancelled successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const request = req as any;
    const sessions = await ClassSession.find().populate('trainer', 'fullname email').lean();

    return res.status(200).json({
      message: 'Available sessions',
      sessions: sessions
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const request = req as any;
    const sessionId = request.params.sessionId;
    const session = await ClassSession.findById(sessionId).populate('trainer', 'fullname email');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    return res.status(200).json({
      message: 'Session details',
      session: session
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
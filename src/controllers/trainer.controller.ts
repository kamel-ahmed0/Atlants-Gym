import { Request, Response } from 'express';
import Booking from '../models/booking'; 
import { ClassSession } from '../models/class.session.model';
import { User } from '../models/user.model';

export const getTrainerBookings = async (req: Request, res: Response) => {
  try {
    const request = req as any;

    if (request.user.role !== 'Trainer') {
      return res.status(403).json({ message: 'Only trainers can view this' });
    }

    const trainerEmail = request.user.email;

    const trainer = await User.findOne({ email: trainerEmail });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const trainerSessions = await ClassSession.find({ trainer: trainer._id });
    
    const sessionIds = [];
    for (let i = 0; i < trainerSessions.length; i++) {
      sessionIds.push(trainerSessions[i]._id);
    }

    const bookings = await Booking.find({ session: { $in: sessionIds } });

    return res.status(200).json({ 
      message: 'Here are the bookings for your sessions',
      bookings: bookings 
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
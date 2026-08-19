import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassSession',
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'waitlisted'],
    default: 'booked'
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
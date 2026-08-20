import mongoose from "mongoose";

const ClassSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const ClassSession = mongoose.model('ClassSession', ClassSessionSchema);
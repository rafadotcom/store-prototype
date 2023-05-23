import mongoose from "mongoose";

const boloSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  
})

export const Bolo = mongoose.models.Bolo || mongoose.model('Bolo', boloSchema);
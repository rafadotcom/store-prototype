import mongoose from "mongoose";

const cafeSchema = new mongoose.Schema({
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

module.exports = mongoose.models.Cafe || mongoose.model('Cafe', cafeSchema)
import mongoose, { Document, model, Model, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  NIF: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: String,
    required: true,
  },
  morada: {
    type: String,
    required: true,
  },
  telemovel: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },


})

const User = mongoose.models.User || model("User", userSchema)

export default User
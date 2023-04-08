import { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  NIF: number;
  dataNascimento: Date;
  morada: string;
  telemovel: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser, Model<IUser>>({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  NIF: {
    type: Number,
    required: true,
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  morada: {
    type: String,
    required: true,
  },
  telemovel: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default model<IUser>("Utilizadores", UserSchema);


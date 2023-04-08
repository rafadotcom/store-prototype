import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  senha: string;
  nome: string;
  NIF: Number;
  DataNascimento: Date;
  Morada: string;
  telemovel: Number;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, lowercase: true, required: [true, "Não pode ser vazio"] },
    senha: String,
    nome: String,
    NIF: Number,
    DataNascimento: Date,
    Morada: String,
    telemovel: Number
  },
  { timestamps: true }
);

let User: Model<IUser>;

try {
  User = mongoose.model<IUser>('User');
} catch (error) {
  User = mongoose.model<IUser>('User', UserSchema);
}

export default User;

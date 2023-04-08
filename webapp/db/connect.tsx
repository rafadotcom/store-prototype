import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = "mongodb+srv://admin:admin123@ptiptr.unbaobh.mongodb.net/ptiptr?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}



async function connect(): Promise<Mongoose> {
  const mongoose = require('mongoose');
  const connection = await mongoose.connect(MONGODB_URI);
  return connection;
}

export default connect;

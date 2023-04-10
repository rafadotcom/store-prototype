import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://admin:admin123@projeto-bd.o2s20vn.mongodb.net/?retryWrites=true&w=majority";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.log("MongoDB connection failed: ", error.message);
  }
}

export default connect;

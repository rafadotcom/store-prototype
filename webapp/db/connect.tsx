// connect.tsx
import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://admin:admin123@ptiptr.unbaobh.mongodb.net/ptiptr?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
}

export default connect;

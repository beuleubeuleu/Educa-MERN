import mongoose from "mongoose";

export const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/cDisPLON');
  console.log("Connected to MongoDB");
}
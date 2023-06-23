import mongoose from "mongoose";

export const main = async (mongoURI:string) => {
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDB");
}
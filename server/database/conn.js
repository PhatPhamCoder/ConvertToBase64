import mongoose from "mongoose";

export default function Connect() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/");
    console.log("Database Connected Succesfully!");
    mongoose.set("strictQuery", false);
  } catch (error) {
    console.log("Database error");
  }
}

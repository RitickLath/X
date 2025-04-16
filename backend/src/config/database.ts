import mongoose from "mongoose";

// establishing database connection.
export const databaseConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
    console.log("database Connected Successfully");
  } catch (error) {
    console.log("Error While connecting to database");
    throw error;
  }
};
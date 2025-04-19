import mongoose from "mongoose";
import { User } from "../models";

// establishing database connection.
export const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI as string);

    console.log("database Connected Successfully");
  } catch (error) {
    console.log("Error While connecting to database");
    throw error;
  }
};

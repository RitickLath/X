import express, { Request, response, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";

export const seedAuth = express.Router();

// signup
seedAuth.post("/signup", async (req: Request, res: Response) => {
  let { data } = req.body || {};

  for (let i = 0; i < data.length; i++) {
    const hashedPassword = await bcrypt.hash(data[i].password, 8);
    data[i].password = hashedPassword;
  }

  const response = await User.create(data);
  res.status(200).json({ success: true, data: response });
});

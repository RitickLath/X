import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRETJWT as string) as {
      id: string;
    };
    const userExist = await User.findById(decoded.id);
    // @ts-ignore
    if (userExist) {
      req.id = decoded.id;
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }
  } catch (error: any) {
    console.error("Auth Middleware Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
    return;
  }
};

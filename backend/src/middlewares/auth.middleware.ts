import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
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
    // @ts-ignore
    req.id = decoded.id;
    next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
    return;
  }
};

export interface Isignup {
  username: string;
  password: string;
  email: string;
}

import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  id?: string;
}

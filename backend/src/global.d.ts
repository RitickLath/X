// src/types/express/index.d.ts or src/types/express.d.ts

import { Request } from "express";

// Augment Express to include `id` in the request
declare global {
  namespace Express {
    interface Request {
      id?: string; // or `id: string` if it is required
    }
  }
}

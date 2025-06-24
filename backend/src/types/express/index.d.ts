import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    auth?: {
      sub: string;
      [key: string]: any;
    };
    userId: string;
    auth0Id: string;
  }
}

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

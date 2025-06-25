import { auth } from "express-oauth2-jwt-bearer";
import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
import User from "../models/user";
import { asyncHandler } from "../../utils/asyncHandler";
import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// const AUTH0_CLIENT_SECRET = import.meta.env.VITE_AUTH0_CLIENT_SECRET;

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

// export const jwtParse = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { authorization } = req.headers;
//     console.log("Auth header", req.headers.authorization);
//     // Bearer Token
//     if (!authorization || !authorization.startsWith("Bearer ")) {
//       return res.sendStatus(401);
//     }

//     const token = authorization.split(" ")[1];
//     try {
//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET!
//       ) as jwt.JwtPayload;
//       const auth0Id = decoded.sub;
//       const user = await User.findOne({ auth0Id });
//       if (!user) {
//         return res.sendStatus(401);
//       }
//       req.auth0Id = auth0Id as string;
//       req.userId = user._id!.toString();
//       next();
//     } catch (error) {
//       return res.sendStatus(401);
//     }
//   }
// );

// updated version


export const jwtParse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract the Auth0 user ID from the token payload
    const auth0Id = req.auth?.payload?.sub;

    if (!auth0Id) {
      return res.status(401).json({ message: "Missing Auth0 ID in token." });
    }

    const user = await User.findOne({ auth0Id });

    if (!user || !user._id) {
      return res.status(401).json({ message: "User not found." });
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();

    next();
  }
);

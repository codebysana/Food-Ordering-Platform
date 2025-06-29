import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import restaurantRoute from "./routes/restaurantRoute";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", userRoute);
app.use("/api/my/restaurant", restaurantRoute);

app.listen(5000, () => {
  console.log("Server started on localhost:5000");
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to Database!");
});

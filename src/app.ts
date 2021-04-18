import express from "express";
import morgan from "morgan"
import connectDB from "./database/db"

connectDB();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

export default app;
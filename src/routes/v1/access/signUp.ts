import express from "express";
import { signUp } from "../../../controllers/v1/access/signUp";

const router = express.Router();

router.post("/", signUp);

export default router;

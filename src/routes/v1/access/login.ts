import express from "express";
import { login } from "../../../controllers/v1/access/login";

const router = express.Router();

router.post("/", login);

export default router;

import express from "express";
import authentication from "../../../auth/authentication";
import { logout } from "../../../controllers/v1/access/logout";

const router = express.Router();

router.delete("/", authentication, logout);

export default router;

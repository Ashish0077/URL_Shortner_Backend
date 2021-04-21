import express from "express";
import link from "./link/link";
import singUp from "./access/signUp";
import login from "./access/login";
import user from "./user/user";

const router = express.Router();

router.use("/signup", singUp);
router.use("/login", login);
router.use("/link", link);
router.use("/profile", user);

export default router;

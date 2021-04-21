import express from "express";
import authentication from "../../../auth/authentication";
import { getProfile, updateProfile } from "../../../controllers/v1/user/user";

const router = express.Router();

/* 
  All the routes below this are private API
  Protected by ACCESS_TOKEN
*/
router.use("/", authentication);

router.get("/my", getProfile);
router.patch("/", updateProfile);

export default router;

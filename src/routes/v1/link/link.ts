import express from "express";
import authentication from "../../../auth/authentication";
import { createLink, getLink, deleteLink, getAllLinks } from "../../../controllers/v1/link/link";

const router = express.Router();

/* 
  All the routes below this are private API
  Protected by ACCESS_TOKEN
*/
router.use("/", authentication);

router.post("/", createLink);
router.get("/all", getAllLinks);
router.get("/:uuid", getLink);
router.delete("/:uuid", deleteLink);

export default router;

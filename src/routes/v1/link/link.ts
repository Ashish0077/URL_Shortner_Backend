import express from "express"
import { createLink, getLink, deleteLink } from "../../../controllers/v1/link/link";

const router = express.Router();

router.post("/", createLink);
router.get("/:uuid", getLink);
router.delete("/:uuid", deleteLink);

export default router;
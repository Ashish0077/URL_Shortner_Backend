import express from "express"
import link from "./link/link"

const router = express.Router();

router.use("/link", link)

export default router;
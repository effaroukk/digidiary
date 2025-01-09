import express from "express";
import getAllSongs from "../controllers/search.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth.authUser, getAllSongs);

export default router;

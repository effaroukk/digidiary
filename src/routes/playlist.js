import express from "express";
import controller from "../controllers/playlists.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth.authUser, controller.createPlaylist);
router.get("/", auth.authUser, controller.getAllPlaylists);
router.get("/:id", auth.authUser, controller.getPlaylist);
router.get("/fav", auth.authUser, controller.favPlaylist);
router.get("/random", auth.authUser, controller.randomPlaylist);
router.patch("/edit/:id", auth.authUser, controller.updatePlaylist);
router.patch("/add", auth.authUser, controller.addSongsToPlaylist);
router.patch("/remove", auth.authUser, controller.removeSong);
router.delete("/:id", auth.authUser, controller.deletePlaylist);

export default router;

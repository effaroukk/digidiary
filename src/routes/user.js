import express from "express";
import userControllers from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.get("/", auth.authUser, auth.checkRole, userControllers.getAllUsers);
router.get("/:id", auth.authUser, userControllers.getUser);
router.patch("/:id", auth.authUser, userControllers.updateUser);
router.delete("/:id", auth.authUser, userControllers.deleteUser);

export default router;

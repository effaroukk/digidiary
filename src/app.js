import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./database/db.js";
import userRouter from "./routes/user.js";
import musicRouter from "./routes/music.js";
// import searchRouter from "./routes/search.js";
import seedAdmin from "./seeders/admin.js";
// import playlistRouter from "./routes/playlist.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
connection();
seedAdmin();

app.get("/", (_, res) => {
	return res.status(200).json({ message: "Music Player App is Running" });
});

app.use("/api/users", userRouter);
app.use("/api/music", musicRouter);
// app.use("/api/playlist", playlistRouter);
// app.use("/api/", searchRouter)

app.listen(port, () => {
	console.log(`Server is Listening on http://localhost:${port}`);
});

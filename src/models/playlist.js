import mongoose from "mongoose";

const { Schema } = mongoose;

const ObjectId = mongoose.Types.ObjectId;

const playlistSchema = new Schema({
	name: { type: String, required: true },
	user: { type: ObjectId, ref: "user", required: true },
	description: { type: String },
	songs: { type: Array, default: [] },
	img: { type: String },
});

export default mongoose.model("Playlist", playlistSchema);

import mongoose from "mongoose";

const { Schema } = mongoose;

const musicSchema = new Schema({
	songTitle: { type: String, required: true },
	artist: { type: String, required: true },
	album: { type: String, required: true },
	songUrl: { type: String, required: true },
	imageUrl: { type: String },
	playCount: { type: Number, default: 0 },
	duration: { type: String, required: true },
});

export default mongoose.model("music", musicSchema);

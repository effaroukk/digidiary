import music from "../models/music.js";
import user from "../models/user.js";

const createMusic = async (req, res) => {
	try {
		const newMusic = await music.create({ ...req.body });
		return res.status(201).json({ message: "New music Created", newMusic });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const getAllMusic = async (req, res) => {
	try {
		const allMusic = await music.find();
		return res.status(200).json(allMusic);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const getSingleMusic = async (req, res) => {
	try {
		const { id } = req.params;
		const findMusic = await music.findById(id);
		if (!findMusic)
			return res.status(404).json({ message: "Music Not Found" });
		return res.status(200).json(findMusic);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const updateMusic = async (req, res) => {
	try {
		const { id } = req.params;
		const findAndUpdateMusic = await music.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!findAndUpdateMusic)
			return res.status(404).json({ message: "Music Not Found" });
		return res.status(200).json({ message: "Music Updated Successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const deleteMusic = async (req, res) => {
	try {
		const { id } = req.params;
		const findAndDeleteMusic = await music.findByIdAndDelete(id);
		if (!findAndDeleteMusic)
			return res.status(404).json({ message: "Music Not Found" });
		return res.status(200).json({ message: "Music Deleted Successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const likeSong = async (req, res) => {
	try {
		const { id } = req.params;
		let message = "";
		const findMusic = await music.findById(id);
		if (!findMusic) {
			return res.status(404).json({ message: "Music Not Found	" });
		}
		const findUser = await user.findById(req.user._id);
		const index = findUser.likedSongs.indexOf(music._id);
		if (index === -1) {
			findUser.likedSongs.push(music._id);
			message = "Added to liked music list";
		} else {
			findUser.likedSongs.splice(index, 1);
			message = "Removed from liked music list";
		}
		await findUser.save();
		return res.status(200).json({ message: message });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const getLikedSongs = async (req, res) => {
	const findUser = await user.findById(req.user._id);
	const findMusic = await music.find({ _id: findUser.likedSongs });
	return res.status(200).json({ findMusic });
};

export default {
	createMusic,
	getAllMusic,
	getSingleMusic,
	updateMusic,
	deleteMusic,
	likeSong,
	getLikedSongs,
};

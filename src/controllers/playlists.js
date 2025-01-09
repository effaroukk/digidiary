import music from "../models/music";
import Playlist from "../models/playlist.js";
import user from "../models/user.js";

const createPlaylist = async (req, res) => {
	try {
		const findUser = await user.findById(req.user._id);
		const playlist = await Playlist.create({
			...req.body,
			user: findUser._id,
		});
		findUser.playlists.push(playlist._id);
		await findUser.save();
		return res.status(201).json(playlist);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const updatePlaylist = async (req, res) => {
	try {
		const { id } = req.params;
		const playlist = await Playlist.findById(id);
		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found" });
		}
		const findUser = await user.findById(req.user._id);
		if (findUser._id !== playlist.user) {
			return res.status(403).json({ message: "Unauthorized" });
		}
		playlist.name = req.body.name;
		playlist.description = req.body.description;
		playlist.img = req.body.img;
		await Playlist.save();

		return res
			.status(200)
			.json({ message: "Playlist updated successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const addSongsToPlaylist = async (req, res) => {
	try {
		const { id } = req.params;
		const findUser = await user.findById(req.user._id);
		const playlist = await Playlist.findById(id);
		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found" });
		}
		if (findUser._id !== playlist.user) {
			return res.status(403).json({ message: "Unauthorized" });
		}
		if (playlist.songs.indexOf(res.body.songId) === -1) {
			playlist.songs.push(res.body.songId);
		}
		playlist.save();
		return res.status(200).json({ message: "Song Added to Playlist" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const removeSong = async (req, res) => {
	try {
		const { id } = req.params;
		const findUser = await user.findById(req.user._id);
		const playlist = await Playlist.findById(id);
		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found" });
		}
		if (findUser._id !== playlist.user) {
			return res.status(403).json({ message: "Unauthorized" });
		}
		const index = playlist.songs.indexOf(req.body.songId);
		playlist.songs.splice(index, 1);
		playlist.save();
		return res.status(200).json({ message: "Song Removed to Playlist" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const favPlaylist = async (req, res) => {
	try {
		const findUser = await user.findById(req.user._id);
		const playlist = await Playlist.find({ _id: findUser.playlists });
		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found" });
		}
		return res.status(200).json(playlist);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const randomPlaylist = async (req, res) => {
	try {
		const playlist = await Playlist.aggregate([{ $sample: { size: 10 } }]);
		return res.status(200).json(playlist);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const getPlaylist = async (req, res) => {
	try {
		const { id } = req.params;
		const playlist = await Playlist.findById(id);
		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found" });
		}
		const findSongs = await music.find({ _id: playlist.songs });
		return res.status(200).json(playlist, findSongs);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const getAllPlaylists = async (req, res) => {
	try {
		const playlist = await Playlist.find();
		return res.status(200).json(playlist);
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

const deletePlaylist = async (req, res) => {
	try {
		const { id } = req.params;
		const findUser = await user.findById(req.user._id);
		const playlist = await Playlist.findById(id);
		if (!playlist) {
			return res.status(404).json({ message: "Playlist not found" });
		}
		if (findUser._id !== playlist.user) {
			return res.status(403).json({ message: "Unauthorized" });
		}
		const index = findUser.playlists.indexOf(id);
		findUser.playlists.splice(index, 1);
		await findUser.save();
		await Playlist.remove();
		return res.status(200).json({ message: "Playlist Removed " });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "An error has occurred, please contact the administrator",
		});
	}
};

export default {
	createPlaylist,
	updatePlaylist,
	addSongsToPlaylist,
	removeSong,
	favPlaylist,
	randomPlaylist,
	getPlaylist,
	getAllPlaylists,
	deletePlaylist
}
import music from "../models/music";
import Playlist from "../models/playlist";

const getAllSongs = async (req, res) => {
	try {
		const { search } = req.query;
		if (search !== "") {
			const songs = await music
				.find({
					name: { $regex: search, $options: "i" },
				})
				.limit(10);
			const playlists = await Playlist.find({
				name: { $regex: search, $options: "i" },
			}).limit(10);
			return res.status(200).json(songs, playlists);
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

export default getAllSongs;
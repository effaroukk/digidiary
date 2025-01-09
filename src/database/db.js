import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.URI;

const connection = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error(err.message);
	}
};

export default connection;

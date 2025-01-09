import bcrypt from "bcrypt";
import createToken from "../services/jwt.js";
import user from "../models/user.js";

const createUser = async (req, res) => {
	try {
		const { email, username, password, confirmPassword } = req.body;
		const checkMail = await user.findOne({ email });
		const checkUser = await user.findOne({ username });
		if (checkMail) {
			return res
				.status(400)
				.json({ message: "User with this Email already exists" });
		}
		if (checkUser) {
			return res
				.status(400)
				.json({ message: "User with this Username already exists" });
		}
		if (confirmPassword !== password) {
			return res.status(401).json({ message: "Passwords do not match" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await user.create({
			email: email,
			username: username,
			password: hashPassword,
		});
		const token = createToken(newUser);
		return res.status(201).json({ message: "New User Created", token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const findUser = await user.findOne({ email });
		if (!findUser) {
			return res.status(404).json({ message: "Invalid Email or Password" });
		}
		const match = await bcrypt.compare(password, findUser.password);
		if (!match) {
			return res.status(404).json({ message: "Invalid Email or Password" });
		}
		const token = createToken(findUser);
		return res
			.status(200)
			.json({ message: "Successfully Logged In", token });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const getAllUsers = async (_, res) => {
	try {
		const allUsers = await user.find().select("-password -__v");
		return res.status(200).json(allUsers);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (id !== req.user.id)
			return res.status(401).json({ message: "Access Denied" });
		const findUser = await user.findById(id).select("-password -__v");
		// if (!findUser)
		// 	return res.status(404).json({ message: "User Not Found" });
		return res.status(200).json(findUser);
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email } = req.body;
		if (req.user.id !== id)
			return res.status(401).json({ message: "Access Denied" });
		const checkMail = await user.findOne({ email });
		const checkUsername = await user.findOne({ username });
		if (checkMail) {
			return res
				.status(400)
				.json({ message: "User with this Email already exists" });
		}
		if (checkUsername) {
			return res
				.status(400)
				.json({ message: "User with this Username already exists" });
		}
		const updateUser = await user.findByIdAndUpdate(id, {$set: req.body});
		// if (!updateUser)
		// 	return res.status(404).json({ message: "User Not Found" });
		return res.status(200).json({ message: "User Updated Successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (req.user.id !== id)
			return res.status(401).json({ message: "Access Denied" });
		const deleteUser = await user.findByIdAndDelete(id);
		if (!deleteUser)
			return res.status(404).json({ message: "User Not Found" });
		return res.status(200).json({ message: "User Deleted Successfully" });
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

export default {
	createUser,
	loginUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
};

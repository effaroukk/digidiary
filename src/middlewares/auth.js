import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authUser = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({ message: "Access Denied" });
		}
		const splitHeader = authHeader.split(" ");
		if (splitHeader[0] !== "Bearer") {
			return res.status(401).json({ message: "Access Denied" });
		}
		const token = splitHeader[1];
		if (!token) {
			return res.status(401).json({ message: "Access Denied" });
		}
		const decodeToken = Jwt.verify(token, process.env.SECRET);
		if (!decodeToken) {
			return res.status(400).json({ message: "Invalid Token" });
		}
		req.user = decodeToken;
		next();
	} catch (err) {
		console.log(err)
		return res
			.status(500)
			.json({ message: "An Error Occurred, Please Contact The Admin" });
	}
};

const checkRole = (req, res, next) => {
	if (req.user.role !== "admin")
		return res
			.status(401)
			.json({ message: "This Route is Restricted to Admin Users" });
	next();
};

export default { authUser, checkRole };
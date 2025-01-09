import jwt from "jsonwebtoken";

const createToken = (user) => {
	try {
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				username: user.username,
				role: user.role,
			},
			process.env.SECRET,
			{ expiresIn: 56000 }
		);
		return token;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default createToken;

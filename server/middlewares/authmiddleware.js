import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Unauthorized" });
    }
};

export default protect;
const jwt = require("jsonwebtoken");

// Middleware to protect routes: verifies JWT token and attaches user info to request
module.exports = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store decoded token info in req.user
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

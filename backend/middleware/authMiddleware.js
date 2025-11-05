import jwt from "jsonwebtoken";

// Default auth middleware used across routes
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request object
    req.user = decoded;
    req.userId = decoded.id || decoded._id || decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;

// named export for compatibility
export { authMiddleware as verifyToken };

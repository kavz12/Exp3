import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretkey123"
    );
    req.userId = decoded.id; // 👈 make user ID available in routes
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

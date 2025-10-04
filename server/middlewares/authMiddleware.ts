export const authMiddleware = (req, res, next) => {
  res.send("authMiddleware");
  next();
};

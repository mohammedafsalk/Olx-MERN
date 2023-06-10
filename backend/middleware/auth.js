import Jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Authentication failed: Token missing" });
  }

  try {
    const verified = Jwt.verify(token, "secretkey");
    if (!verified) {
      return res
        .status(401)
        .json({ error: true, message: "Authentication failed: Invalid token" });
    }
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: true, message: "Authentication failed: Invalid token" });
  }
}

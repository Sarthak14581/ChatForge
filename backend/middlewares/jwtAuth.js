import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js";


dotenv.config();

export const jwtAuthMiddleware = (req, res, next) => {
  
    // logger.debug("auth token in middeware: ", req.cookies.token)
    // check if autharization header is passed
    if(!req.cookies.token) return res.status(401).json({error: "Token Not Found"});
  
   // extract jwt token from the req header
  // const token = req.headers.authorization.split(" ")[1];
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user information to the request object
    req.userPayload = decoded;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ erroe: "Invalid Token" });
  }
};

// function to generate jwt token
export const generateJwtToken = (userData) => {
  // generate a new token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "4d"});
}
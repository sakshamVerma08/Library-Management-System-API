import { type Request, type Response , type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  // Step 1. Look for JWT token in Authorization header , inside Bearer schema.
  
  // Step 2. If not there, then return 401 Not Authenticated HTTP response. (403 is Unauthorized to view resource)

  // Step 3. Verify the Signature of the JWT token, attach the user information taken from the token to the request body, then call next()

  const auth = req.headers.authorization;

  if(!auth || !auth.startsWith('Bearer')){
    return res.status(401).json({message:"Not Authenticated"});
  }

  const token= auth.split(' ')[1];


  const verifiedToken: JwtPayload= jwt.verify(token!,process.env.JWT_SECRET!) as JwtPayload;
  console.log("id:", verifiedToken.sub);
  
  req.userId = verifiedToken.sub;
  next();
};

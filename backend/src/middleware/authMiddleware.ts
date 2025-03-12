import { Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface DecodedToken extends JwtPayload {
  id: number;
  username: string;
  user_type: string;
}

export interface CustomRequest extends Request {
  user?: DecodedToken;
  params: { [key: string]: string };  // ✅ Ensure params exist
  query: { [key: string]: string };   // ✅ Ensure query exists
}
export interface DecodedToken extends JwtPayload {
  id: number;
  username: string;
  user_type: string;
}

export interface CustomRequest extends Request {
  user?: DecodedToken;
  params: { [key: string]: string };
  query: { [key: string]: string };
  body: any; // ✅ Ensure body exists
}

export const authenticate = (req: CustomRequest, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


//auth
export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized!!" })
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string, role: string };
        if (!verify) {
            return res.status(401).json({ message: "Unauthorized!!" })
        }
        req.user = verify ;
        next();
    } catch (err) {
        return res.status(401).json({ message: "invailed token" })
    }
}
//role checker
export function requireRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            return res.status(401).json({ message: "Unauthorized!!" });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access denied!!" });
        }
        next();
    };
}
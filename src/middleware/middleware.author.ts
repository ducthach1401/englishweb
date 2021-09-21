import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/response.service";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const admin = (<any>req).locals.isAdmin;
        if (admin){
            return next();
        }
        errorHandler(req, res, 'Unauthorized', 403);
    } catch (error) {
        throw error;
    }
}
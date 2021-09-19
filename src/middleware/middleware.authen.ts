import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/response.service";

export const isAuthen = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;
        const decoded = <any>Jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        (<any>req).locals = decoded ;
        next(); 
    } catch (error) {
        errorHandler(req, res, 'Unauthorized', 403);
    }
}
import { Request, Response, NextFunction } from "express";
import { ErrorMessage, ErrorResponseCode } from "./constants";

export const errorHandlerApp = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        let keys = Object.keys(ErrorMessage).filter((x) => ErrorMessage[x as keyof typeof ErrorMessage] == err.message);
        const code = keys.length > 0 ? ErrorResponseCode[keys[0] as keyof typeof ErrorResponseCode] : 500;
        res.status(code).send({message: err.message, code: code});
    }
}
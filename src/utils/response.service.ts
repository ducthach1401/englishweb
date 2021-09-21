import { Request, Response } from "express";
import { ErrorMessage, ErrorResponseCode } from "./constants";

export const successHandler = (req: Request, res: Response, data: any, message: string, code?: any) => {
    if (!res.headersSent) {
        res.status(code || 200).json({
            success: true,
            message,
            result: data,
            code: code || 200
        });
    }
}

export const errorHandler = (req: Request, res: Response, error: any, code?: any) => {
    let returnCode, result, message;
    if (typeof(error) !== "string") {
        if (error.name == "CastError") {
            message = `Invalid ${error.path}: ${error.value}`;
            returnCode = 400;
        }
        message = error.message;
        returnCode = error.statusCode? error.statusCode : (code ? code : 500);
    } else {
        message = error;
        returnCode = code || 500;
    }
    result = {
        success: false,
        message: message || "Internal Server",
        code: returnCode
    }
    if (!res.headersSent) {
        res.status(code || returnCode).json(result);
    }
}
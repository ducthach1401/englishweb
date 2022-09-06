import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { SchemaDefinition } from "mongoose";
import { errorHandler } from "../utils/response.service";

export function validateBodySchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { error, value } = schema.validate(data);
      if (error) {
        errorHandler(req, res, error, 400);
      } else {
        next();
      }
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };
}

export function validateQuerySchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.query;
      const { error, value } = schema.validate(data);
      if (error) {
        errorHandler(req, res, error, 400);
      } else {
        next();
      }
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };
}

export function validateParamsSchema(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.params;
      const { error, value } = schema.validate(data);
      if (error) {
        errorHandler(req, res, error, 400);
      } else {
        next();
      }
    } catch (error) {
      errorHandler(req, res, error, 500);
    }
  };
}

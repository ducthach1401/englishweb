import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export default function config(app: Application) {
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
}
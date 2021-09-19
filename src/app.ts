import express, { Application } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { CombineRoute } from "./modules/index";
import config from "./config/config";


mongoose.connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
}).then(async () =>{
    const app: Application = express();
    const port = process.env.PORT || 5000;
    
    config(app);
    const combineRoute = new CombineRoute();
    combineRoute.start(app);

    app.listen(port, () => {
        console.log(`Server is running on ${port} at http://localhost:8080`);
    });
}).catch((err) => {console.log("Cannot connect to database. Error:", err);})
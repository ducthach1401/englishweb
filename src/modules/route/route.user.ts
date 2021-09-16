import { Application } from "express";
import { userController } from "../controller/controller.user";

export class userRoute {
    public routeGroup: userController = new userController();

    public route(app: Application){
        
    }
}
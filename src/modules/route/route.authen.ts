import { Application } from "express";
import { authenController } from "../controller/controller.authen";

export class authenRoute{
    private auth: authenController= new authenController();
    public route(app: Application){
        
    }
}
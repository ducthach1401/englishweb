import { Application } from "express";
import { questionController } from "../controller/controller.question";

export class questionRoute{
    private quest: questionController= new questionController();
    public route(app: Application){
        
    }
}
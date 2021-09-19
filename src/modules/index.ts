import { Application, Request, Response } from "express";
import { authenRoute } from "./route/route.authen";
import { questionRoute } from "./route/route.question";
import { userRoute } from "./route/route.user";

export class CombineRoute {
    private questRoute = new questionRoute();
    private userRoute = new userRoute();
    private authenRoute = new authenRoute();
    public start(app: Application) {
        this.questRoute.route(app);
        this.userRoute.route(app);
        this.authenRoute.route(app);
    }
}
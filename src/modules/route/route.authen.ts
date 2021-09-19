import { Application } from "express";
import { validateBodySchema } from "../../middleware/middleware.validate";
import { authenController } from "../controller/controller.authen";

export class authenRoute{
    private auth: authenController= new authenController();
    public route(app: Application){
        app.route('/v1/login')
            .post(validateBodySchema, this.auth.login);
        app.route('/v1/refresh')
            .get();
    }
}
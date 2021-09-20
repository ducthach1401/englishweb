import { Application } from "express";
import { validateBodySchema } from "../../middleware/middleware.validate";
import { authenController } from "../controller/controller.authen";
import { loginSchema } from "../DTO/DTO.auth";

export class authenRoute{
    private auth: authenController= new authenController();
    public route(app: Application){
        app.route('/v1/login')
            .post(validateBodySchema(loginSchema), this.auth.login);
        app.route('/v1/refresh')
            .get(this.auth.refresh);
    }
}
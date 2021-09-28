import { Application } from "express";
import { isAuthen } from "../../middleware/middleware.authen";
import { isAdmin } from "../../middleware/middleware.author";
import { validateBodySchema } from "../../middleware/middleware.validate";
import { userController } from "../controller/controller.user";
import { createUserSchema, passwordSchema, updateNameSchema } from "../DTO/DTO.user";

export class userRoute {
    public user: userController = new userController();

    public route(app: Application){
        app.route('/v1/register')
            .post(validateBodySchema(createUserSchema), this.user.createUser);

        app.route('/v1/user')
            .all(isAuthen)
            .put(validateBodySchema(updateNameSchema), this.user.updateUser)
            .get(this.user.getUser);

        app.route('/v1/user/password')
            .put(isAuthen, validateBodySchema(passwordSchema), this.user.updatePassword);

        app.route('/v1/user/manager/:id')
            .all(isAuthen, isAdmin)
            .delete(this.user.deleteUser)
            .put(this.user.updateUserForAdmin)
        
        app.route('/v1/user/all')
            .all(isAuthen)
            .get(this.user.getAllUser);
    }
}
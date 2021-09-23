import { Application } from "express";
import { isAuthen } from "../../middleware/middleware.authen";
import { isAdmin } from "../../middleware/middleware.author";
import { validateBodySchema, validateQuerySchema, validateParamsSchema } from "../../middleware/middleware.validate";
import { questionController } from "../controller/controller.question";
import { categorySchema, englishSchema, getQuestionsSchema, updateQuestionSchema } from "../DTO/DTO.question";

export class questionRoute{
    private quest: questionController= new questionController();
    public route(app: Application){
        app.route('/v1/question')
            .all(isAuthen)
            .get(validateQuerySchema(getQuestionsSchema),this.quest.getQuestions);

        app.route('/v1/question/test')
            .all(isAuthen)
            .get(this.quest.createTest)
            .post(validateBodySchema(categorySchema),this.quest.createTestCategory);

        app.route('/v1/manager/:english')
            .all(isAuthen)
            .put(isAdmin, validateBodySchema(updateQuestionSchema) ,this.quest.updateQuestion)
            .delete(isAdmin, validateParamsSchema(englishSchema) ,this.quest.deleteQuestion)
            .get(this.quest.getOne);
        
        app.route('/v1/question/all')
            .get(isAuthen, this.quest.getAll);
        
        app.route('/v1/category/all')
            .get(isAuthen, this.quest.getCategory);
    }
}
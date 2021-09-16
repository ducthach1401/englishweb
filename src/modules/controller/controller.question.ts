import { questionService } from "../service/service.question";
import Quest from './../model/model.question'

export class questionController {
    public question: questionService = new questionService();
}
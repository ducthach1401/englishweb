import { Request, Response } from "express";
import { questionService } from "../service/service.question";
import Quest from './../model/model.question'
import {errorHandler, successHandler} from './../../utils/response.service';

export class questionController {
    private question: questionService = new questionService();
    
}
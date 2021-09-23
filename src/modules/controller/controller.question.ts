import { Request, Response } from "express";
import { questionService } from "../service/service.question";
import Quest from './../model/model.question'
import {errorHandler, successHandler} from './../../utils/response.service';

export class questionController {
    private question: questionService = new questionService();
    public getAll = async (req: Request, res: Response) => {
        try {
            const result = await this.question.getAll();
            successHandler(req, res, result, "Success", 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public getOne = async (req: Request, res: Response) => {
        try {
            const data = {
                english: req.params.english,
                isDelete: false
            }
            const result = await this.question.getOne(data);
            successHandler(req, res, result, "Success", 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public getQuestions = async (req: Request, res: Response) => {
        try {
            const data = {
                ...req.query,
                isDelete: false
            };
            const result = await this.question.getQuestion(data);
            successHandler(req, res, result, "Success", 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public updateQuestion = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const filter = {
                english: req.params.english,
                isDelete: false
            }
            const result = await this.question.updateQuestion(data, filter);
            successHandler(req, res, '', 'Update Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public deleteQuestion = async (req: Request, res: Response) => {
        try {
            const filter = {
                english: req.params.english,
                isDelete: false
            }
            const result = await this.question.deleteQuestion(filter);
            successHandler(req, res, '', 'Delete Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public createTestCategory = async (req: Request, res: Response) => {
        try {
            const category = req.body;
            const result = await this.question.createTestCategory(category);
            if (result.length == 0){
                errorHandler(req, res, 'Not Found', 404);
            }
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public createTest = async (req: Request, res: Response) => {
        try {
            const result = await this.question.createTest();
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public getCategory = async (req: Request, res: Response) => {
        try {
            let result = await this.question.getCategoryAll();
            result = result.map((element: any) => {
                return element.category
            });
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }
}
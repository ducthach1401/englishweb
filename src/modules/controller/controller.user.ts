import { userService } from '../service/service.user';
import Quest from './../model/model.question'
import {errorHandler, successHandler} from './../../utils/response.service';
import { Request, Response } from "express";

export class userController {
    private user: userService = new userService();
    public getUser = async (req: Request, res: Response) => {
        try {
            const data: any = {
                username: (<any>req).authen.username
            }
            const result = this.user.getUser(data);
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public getAllUser = async (req: Request, res: Response) => {
        try {
            const data: any = {
                username: (<any>req).authen.username
            }
            const result = this.user.getAllUser();
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const dataLogin = req.body;
            const result = this.user.createUser(dataLogin);
            successHandler(req, res, result, 'Login Success', 200)
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public updateName = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = this.user.updateUser(data);
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public updatePassword = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const result = this.user.updateUser(data);
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const id: any = {
                _id: req.params.id
            }
            const result = this.user.deleteUser(id);
            successHandler(req, res, '', 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }
}
import { userService } from '../service/service.user';
import Quest from './../model/model.question'
import {errorHandler, successHandler} from './../../utils/response.service';
import { Request, Response } from "express";
import { serializerUserInfo } from '../serializer/user.serializer';

export class userController {
    private user: userService = new userService();
    public getUser = async (req: Request, res: Response) => {
        try {
            const data: any = {
                username: (<any>req).locals.username,
                isDelete: false
            }
            const result = await this.user.getUser(data);
            successHandler(req, res, serializerUserInfo(result), 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public getAllUser = async (req: Request, res: Response) => {
        try {
            const result = await this.user.getAllUser();
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const dataLogin = req.body;
            const result = await this.user.createUser(dataLogin);
            successHandler(req, res, result, 'Success', 200)
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const username = {
                username: (<any>req).locals.username,
                isDelete: false
            }
            const result = await this.user.updateUser(data, username);
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public updateUserForAdmin = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const id = {
                _id: req.params.id,
                isDelete: false
            }
            const result = await this.user.updateUser(data, id);
            successHandler(req, res, result, 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const id: any = {
                _id: req.params.id,
                isDelete: false
            }
            const result = await this.user.deleteUser(id);
            successHandler(req, res, '', 'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }
}
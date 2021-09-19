import { authenService } from "../service/service.authen";
import { Request, Response } from "express";
import {errorHandler, successHandler} from './../../utils/response.service';

export class authenController {
    private authen: authenService = new authenService();
    public login = async (req: Request, res: Response) => {
        try {
            const data: any = req.body;
            const result: any = await this.authen.login(data);
            successHandler(req, res, '' ,'Login Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public refresh = async (req: Request, res: Response) => {
        try {
            const token: any = (<any>req).refresh_token;
            const result: any = await this.authen.refresh(token);
            successHandler(req, res, '' ,'Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }
}
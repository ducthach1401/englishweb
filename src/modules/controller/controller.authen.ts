import { authenService } from "../service/service.authen";
import { Request, Response } from "express";
import {errorHandler, successHandler} from './../../utils/response.service';

export class authenController {
    private authen: authenService = new authenService();
    public login = async (req: Request, res: Response) => {
        try {
            const data: any = req.body;
            const result: any = await this.authen.login(data);
            res.cookie('access_token', result.accessToken, {
                httpOnly: true
            });
            res.cookie('refresh_token', result.refreshToken, {
                httpOnly: true
            });
            successHandler(req, res, '' ,'Login Success', 200);
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }

    public refresh = async (req: Request, res: Response) => {
        try {
            const token: any = req.cookies.refresh_token;
            const result: any = await this.authen.refresh(token);
            if (result) {
                res.cookie('access_token', result.accessToken, {
                    httpOnly: true
                });
                successHandler(req, res, result ,'Success', 200);
            } else {
                errorHandler(req, res, 'Invalid Refresh Token', 401);
            }
        } catch (error) {
            errorHandler(req, res, error, 400);
        }
    }
}
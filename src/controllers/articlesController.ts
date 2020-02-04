import * as request from "request-promise-native";
import {NextFunction, Request, Response, Router} from "express";
import {CryptoService} from "../services/crypto.service";
import * as HttpStatus from "http-status-codes";
import {ApiResponseError} from "../resources/interfaces/ApiResponseError";
import {Crypto} from "../entities/Crypto";
import {UserService} from "../services/users.service";
import errors from "../assets/i18n/en/errors";
import messages from "../assets/i18n/en/messages";


const articleRouter: Router = Router();

articleRouter.route('/')

    .get(async (req: Request, res: Response, next: NextFunction) => {

        const params = req.query;
        const baseUrl = 'https://newsapi.org/v2/everything' ;

        var options = {
            uri: baseUrl,
            qs: params,
            headers: {
                'X-key': 'af6b695c10a1e33cd0a11198a09b5534',
                'X-api-key': 'c61670771ef04313ae3521d5aa5ccf81'
            },
            json: true,
            gzip: true
        };

        try {
            const result = await request.get(options);
            // return 200 even if no user found. Empty array. Not an error
            res.status(HttpStatus.OK).json({
                success: true,
                data: result
            });
        } catch (err) {
            const error: ApiResponseError = {
                code: HttpStatus.BAD_REQUEST,
                errorObj: err
            };
            next(error);
        }
    });

articleRouter.route('/:id')

    .get(async (req: Request, res: Response, next: NextFunction) => {

        const articleID = req.params.id;

        const baseUrl = 'https://newsapi.org/v2/everything';

        var options = {
            uri: baseUrl,
            qs: {
                q: articleID,
            },
            headers: {
                'X-key': 'af6b695c10a1e33cd0a11198a09b5534',
                'X-api-key': 'c61670771ef04313ae3521d5aa5ccf81'
            },
            json: true,
            gzip: true
        };

        try {
            const result = await request.get(options);
            // return 200 even if no user found. Empty array. Not an error
            res.status(HttpStatus.OK).json({
                success: true,
                data: result
            });
        } catch (err) {
            const error: ApiResponseError = {
                code: HttpStatus.BAD_REQUEST,
                errorObj: err
            };
            next(error);
        }
    });

export default articleRouter;
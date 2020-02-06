import * as request from "request-promise-native";
import {NextFunction, Request, Response, Router} from "express";
import {CryptoService} from "../services/crypto.service";
import * as HttpStatus from "http-status-codes";
import {ApiResponseError} from "../resources/interfaces/ApiResponseError";
import {Crypto} from "../entities/Crypto";
import {UserService} from "../services/users.service";
import errors from "../assets/i18n/en/errors";
import messages from "../assets/i18n/en/messages";
import {ArticleService} from "../services/article.service";
import {Article} from "../entities/Article";


const articleRouter: Router = Router();

articleRouter.route('/')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        const articleService = new ArticleService();
        try {
            const response = await articleService.getAll();
            // return 200 even if no article found. Empty array. Not an error
            res.status(HttpStatus.OK).json({
                success: true,
                data: response
            });
        } catch (err) {
            const error: ApiResponseError = {
                code: HttpStatus.BAD_REQUEST,
                errorObj: err
            };
            next(error);
        }
    });

articleRouter.route('/registered/')
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
    })
    .post(async (req: Request, res: Response, next: NextFunction) => {

        const article:Article = req.body.article;
        const articleService = new ArticleService();
        articleService.instantiate(article);
        try {
            const response = await articleService.insert(article);
            // return 200 even if no article found. Empty array. Not an error
            res.status(HttpStatus.OK).json({
                success: true,
                data: response
            });
        } catch (err) {
            const error: ApiResponseError = {
                code: HttpStatus.BAD_REQUEST,
                errorObj: err
            };
            next(error);
        }
    });

articleRouter.route('/registered/:id')

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
    })
    .delete(async (req: Request, res: Response, next: NextFunction) => {

        const articleID = req.params.id;

        const articleService = new ArticleService();

        try {
            const article = await articleService.getById(articleID);
            if(!article){
                res.status(HttpStatus.NOT_FOUND).json({
                    success: true,
                    message: "Article not found"
                });
            }
            const response = await articleService.delete(article);
            // return 200 even if no article found. Empty array. Not an error
            res.status(HttpStatus.OK).json({
                success: true,
                data: response
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

import * as request from "request-promise-native";
import {NextFunction, Request, Response, Router} from "express";
import {CryptoService} from "../services/crypto.service";
import * as HttpStatus from "http-status-codes";
import {ApiResponseError} from "../resources/interfaces/ApiResponseError";
import {Crypto} from "../entities/Crypto";
import {UserService} from "../services/users.service";
import errors from "../assets/i18n/en/errors";


const cryptoRouter: Router = Router();

cryptoRouter.route('/')
    .get(async (req: Request, res: Response, next: NextFunction) => {
        const cryptoService = new CryptoService();

        try {
            const response = await cryptoService.getAll();
            // return 200 even if no user found. Empty array. Not an error
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

cryptoRouter.route('/sparkline/:symbol')

    .get(async (req: Request, res: Response, next: NextFunction) => {

        const cryptoID = req.params.symbol;
        const date_ob = new Date();
        const old_date = new Date();
        old_date.setDate(old_date.getDate() - 1);
        const cryptoService = new CryptoService();
        const baseUrl = 'https://api.nomics.com/v1/currencies/sparkline';
        console.log(cryptoService.ISODateString(date_ob));
        console.log(cryptoService.ISODateString(old_date));
        var options = {
            uri: baseUrl,
            qs: {
                'ids': cryptoID,
                'convert': "EUR",
                'end':cryptoService.ISODateString(date_ob),
                'start':cryptoService.ISODateString(old_date),
                'key': 'af6b695c10a1e33cd0a11198a09b5534',
            },
            headers: {
                'X-key': 'af6b695c10a1e33cd0a11198a09b5534'
            },
            json: true,
            gzip: true
        };

        const result = await request.get(options);

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

cryptoRouter.route('/:symbol')

    .get(async (req: Request, res: Response, next: NextFunction) => {
        const cryptoID = req.params.symbol;
        const cryptoService = new CryptoService();
        try {
            const crypto = await cryptoService.getById(cryptoID);

            // if user not found
            if (!crypto) {
                res.status(HttpStatus.NOT_FOUND).json({
                    success: false,
                    message: `${errors.entityNotFound}: crypto id`
                });
                return;
            }
            // return found user
            res.status(HttpStatus.OK).json({
                success: true,
                user: crypto
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

        const cryptoID = req.params.symbol;
        const baseUrl = 'https://api.nomics.com/v1/currencies/ticker';
        var options = {
            uri: baseUrl,
            qs: {
                'ids': cryptoID,
                'convert': "EUR",
                'key': 'af6b695c10a1e33cd0a11198a09b5534',
            },
            headers: {
                'key': 'af6b695c10a1e33cd0a11198a09b5534'
            },
            json: true,
            gzip: true
        };

        const result = await request.get(options);
        const crypto:Crypto = new Crypto();
        for (let data of result){
            crypto.IDs = data.id;
            crypto.name = data.name;
            crypto.URL = data.logo_url;
            crypto.currentPrice = data.price;
            crypto.highPrice = data.high;
        }
        console.log(crypto);
        const cryptoService = new CryptoService();
        cryptoService.instantiate(crypto);
        try {
            const response = await cryptoService.insert(crypto);
            // return 200 even if no user found. Empty array. Not an error
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
    })
    .put(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PUT");
        const cryptoService = new CryptoService();
        const cryptoID = req.params.symbol;
        const baseUrl = 'https://api.nomics.com/v1/currencies/ticker';
        var options = {
            uri: baseUrl,
            qs: {
                'ids': cryptoID,
                'convert': "EUR",
                'key': 'af6b695c10a1e33cd0a11198a09b5534',
            },
            headers: {
                'key': 'af6b695c10a1e33cd0a11198a09b5534'
            },
            json: true,
            gzip: true
        };

        const result = await request.get(options);
        const crypto = await cryptoService.getByIds(cryptoID);
        for (let data of result){
            crypto.IDs = data.id;
            crypto.name = data.name;
            crypto.URL = data.logo_url;
            crypto.currentPrice = data.price;
            crypto.highPrice = data.high;
        }
        console.log(crypto);
        try {
            const response = await cryptoService.update(crypto);
            // return 200 even if no crypto found. Empty array. Not an error
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


export default cryptoRouter;

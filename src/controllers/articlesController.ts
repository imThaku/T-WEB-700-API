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

articleRouter.route('/:id')

    .get(async (req: Request, res: Response, next: NextFunction) => {

        const articleID = req.params.symbol;

        const cryptoService = new CryptoService();
        const baseUrl = 'https://api.nomics.com/v1/currencies/sparkline';
        var options = {
            uri: baseUrl,
            qs: {
                'ids': articleID,
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
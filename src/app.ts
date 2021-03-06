import 'reflect-metadata';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import {createConnection} from 'typeorm';
import config from './config/config';
import configprod from './config/config-prod';
import {AuthHandler} from './middlewares/authHandler';
import genericErrorHandler from './middlewares/genericErrorHandler';
import nodeErrorHandler from './middlewares/nodeErrorHandler';
import notFoundHandler from './middlewares/notFoundHandler';
import routes from './routes';
import {Logger, ILogger} from './utils/logger';
import * as swagger from "swagger-express-ts";
import {SwaggerDefinitionConstant} from "swagger-express-ts";


export class Application {
    app: express.Application;
    config = config;
    logger: ILogger;

    constructor() {
        if (process.env.NODE_ENV == "prod") {
            this.config = configprod;
        }
        this.logger = new Logger(__filename);
        this.app = express();
        this.app.locals.name = this.config.name;
        this.app.locals.version = this.config.version;

        this.app.use(require('express-status-monitor')());
        let corsOptions = {
            origin: '*',
            optionsSuccessStatus: 200
        };
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use(morgan('dev', {
            skip: (() => process.env.NODE_ENV === 'test')
        }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(new AuthHandler().initialize());

        this.app.use('/api', routes);
        this.app.use(genericErrorHandler);
        this.app.use(notFoundHandler);
        this.app.use( '/api-docs/swagger', express.static( 'swagger' ) );
        this.app.use( '/api-docs/swagger/assets', express.static( 'node_modules/swagger-ui-dist' ) );
        this.app.use(swagger.express(
            {
                definition: {
                    info: {
                        title: "My api",
                        version: "1.0"
                    },
                    externalDocs: {
                        url: "My url"
                    }
                    // Models can be defined here
                }
            }
        ));

    }

    setupDbAndServer = async () => {
        const conn = await createConnection();
        this.logger.info(`Connected to database. Connection: ${conn.name} / ${conn.options.database} / ${this.config.db.database}`);
        await this.startServer();
    }

    startServer(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.app.listen(+this.config.port,( process.env.NODE_ENV === 'prod' ? process.env.PROD_APP_HOST : process.env.APP_HOST), () => {
                this.logger.info(`Server started at http://${( process.env.NODE_ENV === 'prod' ? process.env.PROD_APP_HOST : process.env.APP_HOST)}:${this.config.port}`);
                resolve(true);
            }).on('error', nodeErrorHandler);
        });
    }
}

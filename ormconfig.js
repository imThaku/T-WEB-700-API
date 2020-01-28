module.exports =
    {
        "type": process.env.NODE_ENV === "test" ? "sqlite" : "mysql",
        "host": process.env.NODE_ENV === "test" ? process.env.TEST_DB_HOST : process.env.NODE_ENV === "prod" ? process.env.PROD_DB_HOST : process.env.DB_HOS,
        "port": process.env.NODE_ENV === "test" ? process.env.TEST_DB_PORT : process.env.NODE_ENV === "prod" ? process.env.PROD_DB_PORT : process.env.DB_PORT,
        "username": process.env.NODE_ENV === "test" ? process.env.TEST_DB_USERNAME : process.env.NODE_ENV === "prod" ? process.env.PROD_DB_USERNAME : process.env.DB_USERNAME,
        "password": process.env.NODE_ENV === "test" ? process.env.TEST_DB_PASSWORD : process.env.NODE_ENV === "prod" ? process.env.PROD_DB_PASSWORD : process.env.DB_PASSWORD,
        "database": process.env.NODE_ENV === "test" ? process.env.TEST_DB_NAME : process.env.NODE_ENV === "prod" ? process.env.PROD_DB_NAME : process.env.DB_NAME,
        "synchronize": true,
        "logging": false,
        "dropSchema": process.env.NODE_ENV === "test" ? true : false,
        "entities": [
            "src/entities/**/*.ts"
        ],
        "migrations": [
            "src/migration/**/*.ts"
        ],
        "subscribers": [
            "src/subscriber/**/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/entities",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
        }
    }


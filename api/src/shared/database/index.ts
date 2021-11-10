import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
    host: string;
    database: string;
}

getConnectionOptions().then((options) => {
    const newOptions = options as IOptions;
    newOptions.host =
        process.env.NODE_ENV === "test" ? "localhost" : "db_precato";
    newOptions.database =
        process.env.NODE_ENV === "test" ? "db_test" : newOptions.database;
    createConnection({
        ...options,
    });
});

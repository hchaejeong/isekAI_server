import { DataSource, DataSourceOptions } from "typeorm";

const appDataSource = new DataSource({
    type: 'postgres',
    host: "localhost",
    port: 5432,
    database: "isekai",
    username: "postgres",
    password: "isekai",
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    uuidExtension: 'uuid-ossp',  
} as DataSourceOptions);

export default appDataSource;
import { DataSource, DataSourceOptions } from "typeorm";

const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
} as DataSourceOptions);
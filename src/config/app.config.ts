export const appConfig = () => ({
    environment: process.env.NODE_ENV || 'production',
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        type: process.env.DB_TYPE,
        autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false,
        synchronize: process.env.DB_SYNC === 'true' ? true : false
    }
})
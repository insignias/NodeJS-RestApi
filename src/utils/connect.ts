import mongoose from "mongoose";
import config from 'config';
import logger from './logger';

async function connect() {
    const uri = config.get<string>('dbUri');
    let connection;
    try {
        connection = await mongoose.connect(uri)
        logger.info('Connected to DB')
    } catch (error: any) {
        logger.error(`Could not connect to db: ${error.message}`)
        throw new Error(`Could not connect to db: ${error.message}`)
    }
    return connection;
}

export default connect;
import * as mongoose from 'mongoose';
import config from '../env/index';

interface IConnectOptions {
    autoReconnect: boolean;
    reconnectTries: number; // Never stop trying to reconnect
    reconnectInterval: number;
    loggerLevel ? : string;
    useNewUrlParser ? : boolean;
}

/**
 * @constant {IConnectOptions}
 */
const connectOptions: IConnectOptions = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser : true
};

/**
 * @exports
 * DB 설정 초기화
 */
export function init() {
    mongoose.set('useCreateIndex', true)

    const MONGO_URI: string = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;
    mongoose.connect(MONGO_URI, connectOptions);

    // handlers
    mongoose.connection.on('connecting', () => {
        console.log('\x1b[32m', 'MongoDB :: connecting');
    });

    mongoose.connection.on('error', (error) => {
        console.log('\x1b[31m', `MongoDB :: connection ${error}`);
        mongoose.disconnect();
    });

    mongoose.connection.on('connected', () => {
        console.log('\x1b[32m', 'MongoDB :: connected');
    });

    mongoose.connection.once('open', () => {
        console.log('\x1b[32m', 'MongoDB :: connection opened');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('\x1b[33m"', 'MongoDB :: reconnected');
    });

    mongoose.connection.on('reconnectFailed', () => {
        console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('\x1b[31m', 'MongoDB :: disconnected');
    });

    mongoose.connection.on('fullsetup', () => {
        console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d');
    });
}

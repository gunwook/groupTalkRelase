import * as express from 'express';
import * as Middleware from '../middleware/middleware';
import * as Routes from '../../routes';
import * as connections from '../db/connection';
import ChatServer from '../../socket/ChatServer'
import Redis from '../../utils/RedisUtils'
/**
 * @constant {express.Application}
 */
const app: express.Application = express();

/**
 * @constructs mongodb 초기화
 */
connections.init()


/**
 * @constructs ioredis Redis 서버 구축
 */
Redis.init()

/** 
 * @constructs express.Application 설정 초기
 */
Middleware.configure(app);

/**
 * @constructs express.Application Routes
 */
Routes.init(app);

/**
 * @constructs express.Application Error Handler
 */
Middleware.initErrorHandler(app);

/**
 * @constructs socket.io 채팅 서버 구축 
 */
ChatServer.init(app)



app.set('port', process.env.PORT || 3000);

app.set('secret', process.env.SECRET || 'superSecret');

/**
 * @exports {express.Application}
 */
export default app;

import * as express from 'express';
import * as http from 'http';
import * as jwtConfig from '../config/middleware/jwtAuth';
import * as swaggerUi from 'swagger-ui-express';
import AuthRouter from './AuthRouter';
import FCMRouter from './FcmRouter';
import UploadRouter from './UploadRouter'
import * as graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import { getSchemas } from '../graphql/schema'
import * as morgan from 'morgan'
let swaggerDoc: Object;

try {
    swaggerDoc = require('../../swagger.json');
} catch (error) {
    console.log('***************************************************');
    console.log('  Seems like you doesn\`t have swagger.json file');
    console.log('  Please, run: ');
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
    console.log('***************************************************');
}

/**
 * @export
 * @param {express.Application} app
 */
export async function init(app: express.Application){
    const router: express.Router = express.Router();

    /** 
     * @description
     * http logging
     * @constructs
    */
   app.use(morgan(function (tokens, req, res) {
    let message = ""

    if (req.url != '/login' && req.url != '/signup' && req.url != '/password') {
        message = req.method == 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body)
    }

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      message
    ].join(' ')
  }))


    const schema = await getSchemas()

    app.use(
        "/graphql",
        jwtConfig.isAuthenticated,
        graphqlHTTP(req => ({
            schema,
            graphiql : true,
            context : {
                user_id : req["user"]
            }
    })))

    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use('/auth', AuthRouter);

    /**
     * @description FCM Router /fcm URL
     * @constructs
     */
    app.use('/fcm', jwtConfig.isAuthenticated, FCMRouter)

    /**
     * @description Upload files related to the working place
     */
    app.use('/upload', jwtConfig.isAuthenticated ,UploadRouter)

    /**
     * @description
     *  If swagger.json file exists in root folder, shows swagger api description
     *  else send commands, how to get swagger.json file
     * @constructs
     */
    if (swaggerDoc) {
        app.use('/docs', swaggerUi.serve);
        app.get('/docs', swaggerUi.setup(swaggerDoc));
    } else {
        app.get('/docs', (req, res) => {
            res.send('<p>Seems like you doesn\'t have <code>swagger.json</code> file.</p>' +
                '<p>For generate doc file use: <code>swagger-jsdoc -d swaggerDef.js -o swagger.json</code> in terminal</p>' +
                '<p>Then, restart your application</p>');
        });
    }

    /** 
     * @description No results returned mean the object is not found
     * @constructs
     */
    app.use((req, res, next) => {
        res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
     * @constructs all routes
     */
    app.use(router);
}

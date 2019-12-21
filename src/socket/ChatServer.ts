import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import * as express from 'express';
import { socketCode } from '../utils/CodeUtils'
import * as jwtConfig from '../config/middleware/jwtAuth';
import { logger } from '../utils/logger';
import { createChat } from '../components/Chat'
import ChatModel , { IChatModel } from '../components/Chat/model'
import { findOne } from '../components/User';
export default class ChatServer {
    public static readonly PORT:number = 8080;

    private static instance: ChatServer;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;
    private app : express.Application


    /**
     * @export
     * @param {express.Application} app
     */
    static init(app :  express.Application) {
        if (!ChatServer.instance) {
            ChatServer.instance = new ChatServer(app);
        }
        return ChatServer.instance;
    }


    constructor(app :  express.Application) {
        this.app = app
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.CHAT_PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server , {
            pingInterval: 5000,
            pingTimeout: 10000
        });
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on(socketCode.connection, (socket) => {
            console.log('Connected client on port %s.', this.port);

            socket.on(socketCode.disconnect, () => {
                console.log('Client disconnected');
            });

            socket.on(socketCode.event_join , (message) => {
                socket.join(message.room, () => {
                    this.io.to(message.room).emit(socketCode.event_init,"success");
                });
            })

            socket.on(socketCode.event_message, (async message => {
                
                try{
                    const jwt = await jwtConfig.getUserInfo(message.token) 

                    const model : IChatModel = new ChatModel({
                        message : message.data,
                        date : message.time,
                        email : jwt.email,
                        room_id : message.room,
                        name : jwt.name,
                        image : "",
                        profile_img : jwt.profile_img
                    });

                    
                    createChat(model).then(data => {
                        logger.info(`socket to send : ${message.room}`)
                        socket.join(message.room, () => {
                            this.io.to(message.room).emit(socketCode.event_message, data);
                        });
                    }).catch(error => {
                        logger.error(error)
                    })
                }catch(error){
                    logger.error(error)
                }
            }))
        });
    }
}
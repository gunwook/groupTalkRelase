import * as IoRedis from 'ioredis'
import {Redis} from 'ioredis'
import { logger } from './logger';
import {stringify} from '../utils/CommonUtils'
import CError from './CError';



class RedisUtils {
    public static instance : RedisUtils
    private redis : Redis
    
    constructor() {
        if(RedisUtils.instance) return RedisUtils.instance
        
        RedisUtils.instance = this
    }

    static init(){
        let _redis = new RedisUtils()

        _redis.initialize()
    }

    /**
     * @description 초기화 진행
     */
    initialize(){
        this.redis = new IoRedis({
            port: Number(process.env.REDIS_PORT),
            host: process.env.REDIS_HOST,
            family: 4,
            password: '',
            db: 0
        });

        this.redis.ping().then((e => {
            logger.info('Connect Redis')
        })).catch(err => {
            logger.error(`Error : ${err}`)
        })
    }

    /** 
     * hmget , hset 으로 저장한 데이터 여러개의 fields 값 가져오기
     * @param key key
     * @param fields fields
     */
     async getObject(key, fields) {
        try {
            return await this.redis.hmget(key, fields);
        }
        catch (err) {
            logger.error(err)

            throw new CError(err)
        }
    }

    /**
     * redis key 삭제
     * @param key key
     */
    async deleteKey(key){
        try {
            var result = await this.redis.del(key)
            return result
        }catch (err) {
            logger.error(err)

            throw new CError(err)
        }
    }
    /**
     * redis key 삭제
     * @param key key
     */
    async hdeleteKey(key , fields){
        try {
            var result = await this.redis.hdel(key , fields)
            return result
        }catch (err) {
            logger.error(err)

            throw new CError(err)
        }
    }
    /** 
     * hset key 값에 여러개의 fields 저장
     * @param key key
     * @param obj value 
     */
    async setObject(key , obj  , value , expire = 86400) {
        try{
            let res = await this.redis.hset(key,obj,stringify(value))
            
            this.redis.expire(key, expire)
            return res
        }catch(err){
            logger.error(err)

            throw new CError(err)
        }
    }
}

export default RedisUtils
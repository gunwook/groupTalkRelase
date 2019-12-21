import { Arg, FieldResolver, Query, Resolver, Root, Mutation, Ctx } from "type-graphql";
import {Movie ,  MovieData} from "../schema/movie";
import { Place , PlaceData}  from "../schema/place"
import {getApi} from '../../utils/NetworkUtils'
import Redis from '../../utils/RedisUtils'
import { RedisCode , Api , Parameter , PlaceCode , PlaceList} from '../../utils/CodeUtils'
import {pad } from '../../utils/CommonUtils'
import {compact} from 'lodash'
import { isArrayEmpty , parse} from '../../utils/CommonUtils'
import { movie} from '../data/test'
import { format } from "logform";
import { logger } from "../../utils/logger";

@Resolver(of => Movie)
export default class {


  /**
   * @description 저번주 영화 정보에 대해서 호출 진행
   */
  @Query(returns => [Movie], { nullable: true })
  async getMovie(): Promise<MovieData[]> {
    try {
      let redis = await Redis.instance.getObject(RedisCode.MOVIE,RedisCode.DATA)
      let _array = compact(parse(redis))
      if(isArrayEmpty(_array)) {
        let date = new Date()

        let response = await getApi(Api.MOVIE_URL,{key : process.env.MOVIE_API_KEY , targetDt : `${date.getFullYear()}${pad(date.getMonth()+1,2)}${pad(date.getDate() - 7,2)}`, weekGb : 0})

        let movieList : MovieData[] = []
        for (let data of response.data.boxOfficeResult.weeklyBoxOfficeList) {
          let model : MovieData = {
              rank : data.rank,
              movieNm : data.movieNm,
              openDt : data.openDt
          }

          movieList.push(model)
        }
        let _ = await Redis.instance.setObject(RedisCode.MOVIE,RedisCode.DATA,movieList,604800)
        return movieList
      }else{
        return _array as MovieData[]
      }
    }catch(e) {
      logger.error(e)
      return []
    }
  }

  /**
   * @description 주변 정보에 Type에 맞춰서 호출 진행
   * @param _location 위치정보 ex) 37.545198,127.054577
   * @param _type 타입 지정 ex) bakery , book_store , cafe , park , shopping_mall , restaurant , movie_theater
   */
  @Query(returns => [Place], {nullable : true})
  async getPlace(@Arg(Parameter.LOCATION) _location: string , @Arg(Parameter.TYPE) _type : string) : Promise<PlaceData[]>{
    try {
        let type = ""

        switch(_type) {
            case PlaceCode.BAKERY : type = PlaceList.BAKERY
            break
            case PlaceCode.BOOKSTORE : type = PlaceList.BOOKSTORE
            break
            case PlaceCode.CAFE : type = PlaceList.CAFE
            break
            case PlaceCode.PARK : type = PlaceList.PARK
            break
            case PlaceCode.SHOPPINGMALL :  type = PlaceList.SHOPPINGMALL
            break
            case PlaceCode.RESTAURANT : type = PlaceList.RESTAURANT
            break
            case PlaceCode.MOVIETHEATER : type = PlaceList.MOVIETHEATER
            break
        }

        let response = await getApi(Api.PLACE_URL, {key : process.env.PLACE_API_KEY , location : _location , radius : 3000 , type : type})

        let placeList : PlaceData[] = []

        for (let data of response.data.results){
          let model : PlaceData = {
              name : data.name,
              lat : data.geometry.location.lat,
              lon : data.geometry.location.lng
          }


          placeList.push(model)
        }

        return placeList
    } catch (error) {
      logger.error(error)
      return []
    }
  }
}
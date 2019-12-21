import axios from 'axios'
import { Api } from './CodeUtils'

export function getApi(baseUrl , params){
    return axios.get(baseUrl, {
        params,
        withCredentials : true
    })
}
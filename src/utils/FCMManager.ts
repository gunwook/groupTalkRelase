const FCM = require('fcm-node');
import { retry } from './CommonUtils';

let penv = process.env;
class FCMMannger {
    static sendPush(message) : Promise<string> {

        let fcm = new FCM(penv.PUSH_KEY);

        let push_message = {
            to: message.push_id,
            priority: "high",
            data: {
                type: message.type,   
                data : message.data
            }
        }

        return retry(3,new Promise(function (resolve, reject) {
            fcm.send(push_message, function(err, response) {
                if(err) {
                    console.log("FCM PUSH FAIL -> " + JSON.stringify(err));
                    reject(err);
                }else {
                    console.log("FCM PUSH SUCCESS -> " + JSON.stringify(response));
                    resolve(response);
                }
            });
        }), 100)
    }
}



export default FCMMannger;
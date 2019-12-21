import CError from "./CError";

export function getSocketRoom() : string {
    return `${generateRandom(1,9)}_${new Date().getTime()}`
}

export function wait(time) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, time || 0);
    });
}
export function retry(cont, fn, delay) {
    return fn.catch(function (err) {
        return cont > 0 ? this.wait(delay).then(function () {
            return this.retry(cont - 1, fn, delay);
        }) : Promise.reject('failed');
    })
}

export function generateRandom (min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
}

export function pad(n, width) : string {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

export function isArrayEmpty(array) : boolean {
    if(array !== undefined && array.length > 0) return false
    else return true
}

export function stringify(obj) {
    try {
        return JSON.stringify(obj);
    } catch (err) {
        throw new CError("redis convert failed");
    }
} 

export function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

export function parse(value) {
    let valueToReturn = value;
    try {
        if (valueToReturn == "null" || valueToReturn == "undefined") {
            return null;
        }
        valueToReturn = JSON.parse(value);
    } catch(err) {
        // nothing to do
    }
    return valueToReturn;
}
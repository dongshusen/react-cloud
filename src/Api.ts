const axios = require('axios');

export function Api(api_:string, param:{}, fecth?:string) {
    let _fetch = fecth ?? 'get';
    return new Promise((resolve, reject) => {
        switch (_fetch) {
            case "get":
                console.log("begin a get request,and url:", api_);
                axios.get(`http://180.76.135.45:8888/${api_}`)
                    .then(function (response:any) {
                        resolve(response);
                    })
                    .catch(function (error:any) {
                        console.log("get request GET failed.", error);
                        reject(error);
                    });
                break;
            case "post":
                axios.post(`/${api_}`, param)
                    .then(function (response:any) {
                        resolve(response);
                    })
                    .catch(function (error:any) {
                        console.log("get request POST failed.", error);
                        reject(error);
                    });
                break;
            default:
                break;
        }
    });
}
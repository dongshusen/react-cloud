const axios = require('axios');

export function dsServiceApi(api_: string, param: {}) {
    return new Promise((resolve, reject) => {
        axios.post(`/ds_service/${api_}`, param)
            .then(function (response: any) {
                resolve(response);
            })
            .catch(function (error: any) {
                console.log("get request POST failed.", error);
                reject(error);
            });
    });
}
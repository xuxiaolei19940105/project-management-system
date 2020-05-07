import Qs from 'qs'
import axios from 'axios';

var _uploadAxios = axios.create({ timeout: 1000 * 12 });
_uploadAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function post(url, params) {
    return new Promise((resolve, reject) => {
        _uploadAxios
            .post(url, Qs.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    }).catch((err) => { console.log(err) });
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        _uploadAxios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    }).catch(() => { });
}

export default _uploadAxios;
import axios from 'axios'
import server from '../config/server'
export default {
    post(url, params = {}) {
        return request('post', url, params)
    },
    get(url, params = {}) {
        return request('get', url, params)
    }
}
function request(method, url, params) {
    const config = {
        method: method,
    }
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        config.url = url
    } else {
        config.url = server + url
    }
    switch (method) {
        case 'get':
            config.params = params
            break;
        case 'post':
            config.data = params
            break;
    }
    return axios(config).then(handleRes)
}


function handleRes(res) {
    if (!res || !res.data) {
        throw new Error();
    }
    let ret = Number(res.data.ret)
    switch (ret) {
        case 0:
            return res.data.data
        default:
            console.error(ret)
            throw new Error(res.msg);
    }
}
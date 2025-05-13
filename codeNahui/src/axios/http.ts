import axios from "axios";
import {throttle} from "lodash";

axios.defaults.timeout = 15000; // 请求超时时间
axios.defaults.baseURL = "https://api.rrsjk.com";

axios.defaults.headers.get['Content-Type'] = 'application/json';

// axios respone拦截器
axios.interceptors.response.use(
    res => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
        if (res.status === 200) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    },
    error => {
        return Promise.reject(error.response);
    }
);

// * 通知事件
const feishuWebhook = (res: any) => {
    get('https://www.feishu.cn/flow/api/trigger-webhook/e9a5bf38ae4ba450297b3a11e99efd55', {
        url: res.config.url,
        status: res.status,
        error: res.data.error,
        message: res.data.message,
        timestamp: res.data.timestamp
    }).then(r => console.log(r))
}

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params: object = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                throttle(feishuWebhook(err), 1800000)
                reject(err);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params: object = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export {
    get,
    post,
};

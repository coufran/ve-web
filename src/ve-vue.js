import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Axios from 'axios'
import numeral from 'numeral'
import moment from 'moment'

import util from './util'

import dataStore from './data-store'
import config from './config'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 添加各种工具
Vue.prototype.dataStore = dataStore;
Vue.prototype.numeral = numeral;
Vue.prototype.moment = moment;

// 定义axios组件
Vue.prototype.axios = Axios.create({
    baseURL: config.server.url + "/web",
    timeout: 10000
});

// 添加鉴权请求头
let token; // 全局token存储
let refreshing = false;
const getToken = async () => {
    console.debug("before");
    console.debug(token);
    token = token || JSON.parse(localStorage.getItem("token"));
    if(!token) {
        window.location.href = "login.html";
    }
    // accessToken未过期
    if (token.accessExpire >= moment().valueOf()) {
        return token.accessToken;
    }
    // accessToken和refreshToken都过期了
    if (token.refreshExpire < moment().valueOf()) {
        window.location.href = "login.html";
        return null;
    }
    // accessToken过期，但是refresh没过期
    // 交换
    while(refreshing) {
        await util.sleep(10);
        console.debug("await");
        console.debug(token);
        if(token.accessExpire >= moment().valueOf()) { // accessToken有效，返回
            return token.accessToken;
        }
    }
    refreshing = true; // 设置状态正在刷新
    let response = await Vue.prototype.axios
        .request({
            url: "/auth/refresh",
            public: true,
            method: "POST",
            params: {
                refreshToken: token.refreshToken
            }
        });
    if (!response.success) { // 交换失败
        window.location.href = "login.html";
        return;
    }
    token = response.data;
    localStorage.setItem("token", JSON.stringify(token));
    console.debug("refresh");
    console.debug(token);
    refreshing = false; // 设置状态完成刷新

    return token.accessToken;
};
Vue.prototype.axios.interceptors.request.use(async config => {
    console.debug(config.url);
    // 开放接口，不需要Token Header
    if(config.public) {
        return config;
    }
    // 否则，添加Token Header
    let token = await getToken();
    config.headers = {
        'Token': token
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 解析响应数据
Vue.prototype.axios.interceptors.response.use(function(response) {
    if(response.data && !response.data.success && response.data.code=="401") {
        window.location.href = "login.html";
    }
    return response.data;
}, function(error) {
    if(error.response) {
        console.error(error.response);
        alert("系统错误，请联系管理员");
    } else if(error.request) {
        console.error(error.request);
        alert("请检查您的网络");
    } else {
        alert("未知异常，请联系管理员");
    }
    return Promise.reject(error);
})

// Vue配置
Vue.config.productionTip = false
Vue.config.devtools = true

// 启用Bootstrap-Vue组件库
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// 导出Vue
export default Vue
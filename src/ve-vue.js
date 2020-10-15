import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 定义axios组件
Vue.prototype.axios = Axios.create({
    // baseURL: 'http://127.0.0.1:8080/web',
    baseURL: 'http://192.168.2.198:8080/web',
    timeout: 10000
});
// 添加鉴权请求头
Vue.prototype.axios.interceptors.request.use(function (config) {
    config.headers = {
        'Token': sessionStorage.getItem("token")
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 解析响应数据
Vue.prototype.axios.interceptors.response.use(function(response) {
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
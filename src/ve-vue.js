import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.axios = Axios.create({
    baseURL: 'http://192.168.168.61:8080/web',
    timeout: 10000
});
Vue.prototype.axios.interceptors.request.use(function (config) {
    config.headers = {
        'Token': sessionStorage.getItem("token")
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});
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

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default Vue
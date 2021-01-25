import Vue from '../ve-vue.js'
import App from './App.vue'
import store from "@/data-store";

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')

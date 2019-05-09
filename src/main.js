// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import publicMethods from '../src/public/js/public';
import {
  postRequest
} from "./utils/api";
import {
  getRequest
} from "./utils/api";
import {
  putRequest
} from "./utils/api";
import {
  deleteRequest
} from "./utils/api";
import {
  postKeyValueRequest
} from "./utils/api";

Vue.config.productionTip = false
// Vue.prototype.postRequest = postRequest;
// Vue.prototype.getRequest = getRequest;
// Vue.prototype.putRequest = putRequest;
// Vue.prototype.deleteRequest = deleteRequest;
// Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.$axios = axios;
Vue.prototype.$isEmpty = publicMethods.isEmpty;

// router.beforeEach((to,from,next)=>{
//   if (to.path=='/'||window.sessionStorage.getItem("user")){
//     next();
//   }
//   else {
//     next('/');
//   }
// });

Vue.use(ElementUI, {
  size: "small"
});

/* eslint-disable no-new */
new Vue({
  el: '#aaa',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

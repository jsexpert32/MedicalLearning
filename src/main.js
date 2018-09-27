import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from "vee-validate";
import VueLetterAvatar from 'vue-letter-avatar';
import App from './App.vue'
import store from './store'
import router from './router'
import join from 'url-join'
//import {authPlugin} from "./plugins/AuthPlugin.js"
import { sync } from 'vuex-router-sync'
import Storage from './services/Storage'
import * as filters from './filters'
import * as properties from './properties'
import { isNeedAuthorizationUrl } from './filters';
import 'expose-loader?$!expose-loader?jQuery!jquery'

require('./asset/styles/main.scss')


// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//stavljamo Axios u pogon
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(VueLetterAvatar);

//Vue.use(authPlugin);
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// Configure the base path with interceptors 

Vue.axios.interceptors.request.use(function (config) {
  // Concatenate base path if not an absolute URL
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(properties.baseUrl, config.url);
  }
  var token = Storage.get(properties.token,null);
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})

// expose the app, the router and the store.
// note we are not mounting the app here, since bootstrapping will be
// different depending on whether we are in a browser or on the server.
export { app, router, store }

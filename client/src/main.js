import Vue from 'vue';
import router from './router';
import App from './App.vue'
import axios from 'axios';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// Vue.prototype.$user = JSON.parse(localStorage.user);

if (localStorage.user != undefined) {
  Vue.prototype.$token = JSON.parse(localStorage.user).token;
  Vue.prototype.$user = JSON.parse(localStorage.user);
  console.log(localStorage.user);
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

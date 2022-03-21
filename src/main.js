import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

Vue.use(Buefy)
Vue.use(VueAxios, axios)

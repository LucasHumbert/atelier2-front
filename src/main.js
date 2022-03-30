import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import 'buefy/dist/buefy.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import VueYouTubeEmbed from 'vue-youtube-embed'

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(Buefy)
Vue.use(VueAxios, axios)
Vue.use(VueYouTubeEmbed)

Vue.prototype.$urlEvent = 'http://51.159.78.9:62560/';
Vue.prototype.$urlAuth = 'http://51.159.78.9:62563/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

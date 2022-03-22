import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: "",
  },
  getters: {

  },
  mutations: {
    setToken(state, token){
      state.accessToken = token
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

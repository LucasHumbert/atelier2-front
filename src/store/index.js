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
    user_id: ''
  },
  getters: {

  },
  mutations: {
    setToken(state, token){
      state.accessToken = token
    },
    setUserId(state, user_id){
      state.user_id = user_id
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})

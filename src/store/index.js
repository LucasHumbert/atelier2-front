import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    connectionToken: "",
    member: false,
    members: []
  },
  getters: {
    getMember: (state) => (idMember) => {
      return state.members.find(member => member.id === idMember)
    }
  },
  mutations: {
    setToken(state, token){
      state.connectionToken = token
    },
    setMember(state, member) {
      state.member = member
    },
    setMembers(state, members) {
      state.members = members
    }
  },
  actions: {
  },
  modules: {
  }
})

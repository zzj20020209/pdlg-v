import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sname: ""
  },
  getters: {
    getsname(state) {
      return state.sname;
    }
  },
  mutations: {
    setsname(state,val) {
      state.sname = val;
    }
  },
  actions: {}
})

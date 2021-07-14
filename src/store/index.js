import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: []
  },
  mutations: {
    GET_GALLERIES (state, payload) {
      state.galleries = payload.galArray
    }
  },
  actions: {
  },
  modules: {
  }
})

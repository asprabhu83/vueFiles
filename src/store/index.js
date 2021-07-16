import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: [],
    laoding: false
  },
  mutations: {
    GET_GALLERIES (state, payload) {
      state.galleries = payload.galArray
      this.$store.state.loading = false
    }
  },
  actions: {
  },
  modules: {
  }
})

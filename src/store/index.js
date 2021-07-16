import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: [],
    loading: false,
    projects: [],
    selectedProject: {}
  },
  mutations: {
    GET_GALLERIES (state, payload) {
      state.galleries = payload.galArray
      state.loading = false
    }
  },
  actions: {
  },
  modules: {
  }
})

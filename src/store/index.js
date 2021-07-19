import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: [],
    loading: false,
    projects: [],
    selectedProject: {},
    selectedImage: 0
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

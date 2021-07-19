import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: [],
    loading: false,
    projects: [],
    selectedProject: {},
    selectedImage: 0,
    appURI: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_URI_PREFIX : process.env.VUE_APP_API_URI_PREFIX
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

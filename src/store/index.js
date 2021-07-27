import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: [],
    loading: false,
    projects: [],
    selectedProject: {},
    selectedImage: 0,
    designComponent: 0,
    bboxComponent: 0,
    appURI: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_URI_PREFIX : process.env.VUE_APP_API_URI_PREFIX
  },
  mutations: {
    GET_GALLERIES (state, payload) {
      state.galleries = payload.galArray
      state.loading = false
    },
    PUSH_BOUNDING_BOX (state, payload) {
      state.selectedProject.Details.forEach(detail => {
        if (detail.image_Location === state.selectedImage) {
          detail.boundingBoxes = payload
        }
      })
    },
    PUSH_ATTRIBUTE_VALUES (state, payload) {
      state.selectedProject.Details.forEach(detail => {
        if (detail.image_Location === state.selectedImage) {
          console.log(detail)
        }
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

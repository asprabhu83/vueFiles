import { createStore } from 'vuex'

export default createStore({
  state: {
    galleries: [],
    loading: false,
    project_id: '',
    mainProjects: [],
    selectedMainProject: {},
    projects: [],
    selectedProject: {},
    selectedImage: 0,
    classes: [],
    attributes: [],
    designComponent: 0,
    bboxTool: false,
    bboxComponent: 0,
    currentSlide: 0,
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
          detail.boundingBoxes.push(payload)
        }
      })
    },
    PUSH_ATTRIBUTE_VALUES (state, payload) {
      state.selectedProject.Details.forEach(detail => {
        if (detail.image_Location === state.selectedImage) {
          detail.boundingBoxes.forEach(boundingbox => {
            if (boundingbox && boundingbox.attributeValues.length === 0) {
              if (boundingbox.selectedClass !== '') {
                payload.forEach(element => {
                  if (element && element.attribute_Values) {
                    element.attribute_Values = element.attribute_Values.split(',')
                  }
                })
                boundingbox.attributeValues = payload
              }
            }
          })
        }
      })
    }
  },
  actions: {
  },
  modules: {
  }
})

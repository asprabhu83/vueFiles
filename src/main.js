import { createApp } from 'vue'
import './assets/css/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
import bboxAnnotator from '@/components/annotate/bbox_annotator.js'
library.add(faUserSecret, faCloudUploadAlt)
const Vue = createApp(App)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$bboxAnnotator', { value: bboxAnnotator })
Vue.use(store).use(router).use(VueAxios, axios).mount('#app')

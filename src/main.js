import { createApp } from 'vue'
import './assets/css/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faCloudUploadAlt, faPlus, faTrash, faTimes, faSave, faEdit, faSignOutAlt, faUserPlus, faChevronLeft, faChevronRight, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueAxios from 'vue-axios'
library.add(faUserSecret, faCloudUploadAlt, faPlus, faTrash, faTimes, faSave, faEdit, faSignOutAlt, faUserPlus, faChevronLeft, faChevronRight, faUserCircle)
const Vue = createApp(App)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(store).use(router).use(VueAxios, axios).mount('#app')
console.log(process.env)

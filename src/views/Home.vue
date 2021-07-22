<template>
  <section class="py-8 px-4">
  <h2 class="text-lg font-medium text-gray-900 truncate pb-8 px-1">Create Project</h2>
 <form method="post" action="" enctype="multipart/form-data" ref="videoForm" class="w-full max-w-lg">
  <div class="w-full flex flex-wrap -mx-3 mb-6">
    <div class="w-1/2  px-3 mb-6 ">
      <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" v-model="formData.title" placeholder="Enter Project Name">
    </div>
  <div class="w-1/3  px-3 mb-6 md:mb-0">
    <label
  class="w-60 flex inline-flex items-center items-center px-4 py-1.5 bg-white hover:bg-gray-600 rounded-md shadow-md tracking-wide font-medium uppercase border border-blue cursor-pointer hover:bg-white-600 hover:text-white text-gray-600 ease-linear transition-all duration-150">
  <font-awesome-icon icon="cloud-upload-alt"  size="1x" />
  <span class="text-base leading-normal px-2">Choose Video</span>
  <input type='file' class="hidden" name="video" @change="onFileUpload"/>
</label>
</div>
 </div>
 </form>
   <div class="flex flex-wrap -mx-4 -mb-8" v-if="galleries">
      <div class="md:w-1/4 px-4 mb-8" v-for="(image, key) in galleries" v-bind:key="key"><img class="rounded shadow-md" :src="image" alt=""></div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      formData: {
        title: '',
        files: Object
      },
      projects: []
    }
  },
  methods: {
    createLayer () {
      var layerCount = this.$store.state.Layers.length + 1
      this.$store.commit('addLayers', {
        layerName: 'Layer' + layerCount,
        textLayer: 'Text Layer' + layerCount,
        imgSrc: './ResumePart6.jpg',
        editable: false,
        focusable: false,
        className: ''
      })
    },
    async onFileUpload (ev) {
      var videoForm = this.$refs.videoForm
      var formData = new FormData(videoForm)
      var galArray = []
      this.$store.state.loading = true
      await this.axios.post(this.appURI + '/api/upload', formData)
        // get data
        .then(x => {
          x.data.files.forEach(gallery => {
            galArray.push(this.appURI + 'uploads/' + gallery)
          })
        })
      this.$store.commit('GET_GALLERIES', { galArray: galArray })
      await this.axios.get(this.appURI + 'api/getProjects')
        .then(x => {
          this.$store.state.projects = x.data
        })
    }
  },
  computed: {
    Layers () {
      return this.$store.state.Layers
    },
    galleries () {
      return this.$store.state.galleries
    },
    appURI () {
      return this.$store.state.appURI
    }
  }
}
</script>

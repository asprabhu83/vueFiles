<template>
  <section class="py-8 px-4">
 <form method="post" action="" enctype="multipart/form-data" ref="videoForm" class="w-full max-w-lg">
 <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full  px-3 mb-6 md:mb-0">
   <input type="text"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       name="title" v-model="formData.title"
                       placeholder="Enter video title">
                       </div>
                       <div class="w-full  px-3 mb-6 md:mb-0">
    <label
  class="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
  <font-awesome-icon icon="cloud-upload-alt"  size="3x" />
  <span class="mt-2 text-base leading-normal">Select a file</span>
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
      projects:[]
    }
  },
  created() {
    this.axios.get('/api/getProjects')
      .then(x => {
        this.projects = x.data
      })
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
      await this.axios.post('/api/upload', formData)
        // get data
        .then(x => {
          x.data.files.forEach(gallery => {
            galArray.push('./uploads/' + gallery)
          })
        })
      this.$store.commit('GET_GALLERIES', { galArray: galArray })
    }
  },
  computed: {
    Layers () {
      return this.$store.state.Layers
    },
    galleries () {
      return this.$store.state.galleries
    }
  }
}
</script>

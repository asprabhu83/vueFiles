<template>
 <form method="post" action="api/upload" enctype="multipart/form-data" ref="videoForm" class="w-full max-w-lg">
 <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full  px-3 mb-6 md:mb-0">
   <input type="text"
                       class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                       name="title"
                       placeholder="Enter video title">
                       </div>
    <label
  class="w-64 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-gray-600 hover:text-white text-purple-600 ease-linear transition-all duration-150">
  <font-awesome-icon icon="cloud-upload-alt"  size="3x" />
  <span class="mt-2 text-base leading-normal">Select a file</span>
  <input type='file' class="hidden" name="video" @change="onFileUpload"/>
</label>
 </div>
 </form>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      fileData: []
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
    onFileUpload (ev) {
      this.$refs.videoForm.submit()
    }
  },
  computed: {
    Layers () {
      return this.$store.state.Layers
    }
  }
}
</script>

<template>
<div class="bg-gray-100 w-full rounded py-8 px-4"  v-if="project">
  <div class="bg-white p-16 text-left mx-auto border">
    <div><h2 class="text-lg font-medium text-gray-900 truncate pb-8 px-1">{{project.project_name}}</h2>
   <div class="flex flex-wrap -mx-4 -mb-8">
      <div class="md:w-1/4 px-4 mb-8" v-for="(detail, key) in project.Details" v-bind:key="key">
        <img class="rounded shadow-md" :src="appURI + 'uploads/'+detail.image_Location" alt="" @click="editImage(detail, project)">
      </div>
    </div></div>
    </div>
</div>
</template>
<script>
export default {
  name: 'Grid',
  data () {
    return {
      activeTab: 0,
      tabs: [
        'Video Frames',
        'Attributes'
      ],
      tableHeader: []
    }
  },
  computed: {
    project () {
      return this.$store.state.selectedProject
    },
    appURI () {
      return this.$store.state.appURI
    }
  },
  methods: {
    editImage (detail, project) {
      detail.boundingBoxes = []
      this.$store.state.selectedImage = detail.image_Location
      this.$router.push('/editor')
    }
  }
}
</script>

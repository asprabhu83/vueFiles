<template>
<div class="bg-gray-100 w-full rounded py-8 px-4"  v-if="project">
  <ul class="flex justify-left items-center my-4">
    <template v-for="(tab, index) in tabs" v-bind:key="index">
      <li class="cursor-pointer py-2 px-4 text-gray-500 border-b-8" :class="activeTab===index ? 'text-gray-700 border-gray-700' : ''" @click="activeTab = index" v-text="tab"></li>
    </template>
  </ul>
  <div class="bg-white p-16 text-left mx-auto border">
    <div v-show="activeTab===0"><h2 class="text-lg font-medium text-gray-900 truncate pb-8 px-1">{{project.project_name}}</h2>
   <div class="flex flex-wrap -mx-4 -mb-8">
      <div class="md:w-1/4 px-4 mb-8" v-for="(number, key) in project.video_duration" v-bind:key="key">
        <img class="rounded shadow-md" :src="'./uploads/'+project.image_Location+'/thumb_'+number+'.jpg'" alt="" @click="editImage(number, project)">
      </div>
    </div></div>
    <div v-show="activeTab===1">Content 2</div>
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
    }
  },
  methods: {
    editImage (number, project) {
      console.log(number, project)
      this.$router.push('/editor')
    }
  }
}
</script>

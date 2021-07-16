<template>
<div class="bg-gray-100 w-1/4 rounded px-6" v-if="projects && projects.length > 0">
    <div class="sticky top-0 z-50 bg-gray-100 border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between py-4">
        <div class="font-semibold text-gray-800">Projects</div>
    </div>
    <hr class="-mx-6"/>
    <template  v-for="(project, index) in projects" v-bind:key="index">
    <div class="flex items-center justify-between my-4" @click='getAllFrames(project)'>
        <div class="w-16">
        <img class="w-12 h-12 rounded-full" :src="'https://videoprocess.kavisoftek.in/uploads/'+project.original_name+'/thumb_0.jpg'">
        </div>
        <div class="flex-1 pl-2">
            <div class="text-gray-700 font-semibold">
            {{project.title}}
            </div>
            <div class="text-gray-600 font-thin">
            </div>
        </div>
    </div>
    <hr class="boder-b-0 my-4"/>
    </template>
</div>
</template>
<script>
export default {
  name: 'Grid',
  data () {
    return {
      projects: [],
      tableHeader: []
    }
  }
}
</script>

<template>
  <aside
    id="right-panel"
    class="relative bg-gray-800 border-l border-gray-600 h-full w-64 flex flex-col overflow-hidden flex-shrink-0"
  >
    <!--  <header
        class="text-white text-xs font-medium flex justify-between items-center p-3 pb-0 ">
        <div class="flex items-center leading-5 py-px">Layers</div>
      </header> -->
     <!-- <div v-for="(layer, layerIndex) in Layers" v-bind:key="layerIndex" class="block items-center text-xs font-medium p-2 mt-2" :class="layer.focusable?'bg-white text-black':'text-white'">
          {{layer.layerName}}
        </div> -->
        <div class="rounded px-6" v-if="projects && projects.length > 0">
    <div class="sticky top-0 z-50 border-l-4 border-red-400 -ml-6 pl-6 flex items-center justify-between py-4">
        <div class="font-semibold text-white">Projects</div>
    </div>
    <hr class="-mx-6"/>
    <template  v-for="(project, projectIndex) in projects" v-bind:key="projectIndex">
    <div class="flex items-center justify-between my-4" @click='getAllFrames(project)'>
        <div class="w-16">
        <img class="w-12 h-12 rounded-full" :src="appURI + 'uploads/'+project.image_Location+'/thumb_0.jpg'">
        </div>
        <div class="flex-1 pl-2">
            <div class="text-white font-semibold">
            {{project.project_name}}
            </div>
            <div class="text-gray-600 font-thin">
            </div>
        </div>
    </div>
    <hr class="boder-b-0 my-4"/>
    </template>
</div>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      projects: [],
      tableHeader: []
    }
  },
  created () {
    this.axios.get(this.appURI + 'api/getProjects')
      .then(x => {
        this.projects = x.data
      })
  },
  methods: {
    getAllFrames (project) {
      this.$store.state.selectedProject = project
      this.$router.push('/project')
    }
  },
  computed: {
    appURI () {
      return this.$store.state.appURI
    }
  }
}
</script>

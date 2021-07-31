<template>
<div class="bg-gray-100 w-full rounded py-8 px-4" >
  <ul class="flex justify-left items-center my-4">
    <template v-for="(tab, index) in tabs" v-bind:key="index">
      <li class="cursor-pointer py-2 px-4 text-gray-500 border-b-8" :class="activeTab===index ? 'text-gray-700 border-gray-700' : ''" @click="activeTab = index" v-text="tab"></li>
    </template>
  </ul>
  <div class="bg-white p-16 text-left mx-auto border">
    <div v-show="activeTab===0"><section class="py-8 px-4">
  <h2 class="text-lg font-medium text-gray-900 truncate pb-8 px-1">Create Project</h2>
 <form method="post" ref="createForm" class="w-full max-w-lg">
  <div class="w-full flex flex-wrap -mx-3 mb-6">
    <div class="w-1/2  px-3 mb-6 ">
      <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" v-model="formData.title" placeholder="Enter Project Name">
    </div>
  <div class="w-1/3  px-3 mb-6 md:mb-0">
    <textarea class="resize border rounded-md" v-model="formData.Description"></textarea>
</div>
<a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createProject">
  Submit
</a>
 </div>
 </form>
   <div class="flex flex-wrap -mx-4 -mb-8" v-if="galleries">
      <div class="md:w-1/4 px-4 mb-8" v-for="(image, key) in galleries" v-bind:key="key"><img class="rounded shadow-md" :src="image" alt=""></div>
    </div>
  </section></div>
    <div v-show="activeTab===1"><classComponent/></div>
    </div>
</div>

</template>
<script>
import classComponent from '@/components/ClassComponent'
export default {
  name: 'App',
  components: {
    classComponent
  },
  data () {
    return {
      tabs: [
        'Projects',
        'Attributes'
      ],
      activeTab: 0,
      formData: {
        title: '',
        description: ''
      },
      projects: []
    }
  },
  methods: {
    async createProject () {
      var form = this.$refs.createForm
      var formData = new FormData(form)
      this.$store.state.loading = true
      await this.axios.post(this.appURI + 'api/createProject', formData)
        // get data
        .then(x => {
          this.$store.state.project_id = x.data.last_insert_id
          // this.$refs.createForm.reset()
        })
      await this.axios.get(this.appURI + 'api/getProjects')
        .then(x => {
          this.$store.state.mainProjects = x.data
        })
      this.$store.state.loading = false
      this.activeTab = 1
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

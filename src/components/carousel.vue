<template>
  <carousel items-to-show="7" v-if="project" class="my-2 m-auto w-11/12">
    <slide v-for="slide in project.video_duration" :key="slide">
      <img :src="appURI+'/uploads/' + this.project.image_Location + '/thumb_' + slide + '.jpg'" class="w-40">
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Navigation
  },
  computed: {
    project () {
      return this.$store.state.selectedProject
    },
    number () {
      return this.$store.state.selectedImage
    },
    appURI () {
      return this.$store.state.appURI
    }
  }
}
</script>

<template>
  <carousel :items-to-show="5" v-if="project" class="my-2">
    <slide v-for="slide in project.video_duration" :key="slide" >
      <img :src="'https://drill.siteguru.co.il/uploads/' + this.project.image_Location + '/thumb_' + slide + '.jpg'" class="pr-1 h-28">
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
    }
  }
}
</script>

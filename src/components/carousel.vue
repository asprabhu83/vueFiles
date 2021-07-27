<template>
  <carousel items-to-show=7 v-if="project" class="my-2 m-auto w-11/12">
    <slide v-for="slide in project.Details" :key="slide">
      <img :src="appURI+'/uploads/' + slide.image_Location" class="w-40" @click="changeImage(slide.image_Location)">
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
  methods: {
    changeImage (imageLocation) {
      this.$store.state.designComponent = this.$store.state.designComponent + 1
      this.$store.state.bboxComponent = this.$store.state.bboxComponent++
      this.$store.state.selectedImage = imageLocation
    }
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

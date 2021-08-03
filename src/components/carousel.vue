<template>
  <carousel v-bind:items-to-show=10 v-if="project" v-bind:items-to-scroll=10 class="my-2 m-auto w-11/12" v-bind:model-value="currentSlide">
    <slide v-for="(slide, slideKey) in project.Details" :key="slideKey" :class="slide.active ? 'carousel__slide--active' : ''">
    <div class="carousel__item mx-3 cursor-pointer">
      <img :src="appURI+'/uploads/' + slide.thumb_image_Location" @click="changeImage(slide.image_Location, slideKey)" class="w-40"  :class="slide.active ? 'relative border-4 border-solid border-pink-500' : ''">
    </div>
    </slide>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
export default {
  name: 'App',
  components: {
    Carousel,
    Slide
  },
  methods: {
    changeImage (key) {
      console.log(key)
      this.$store.state.designComponent = this.$store.state.designComponent + 1
      this.$store.state.bboxComponent = this.$store.state.bboxComponent++
      this.$store.state.currentSlide = key
    }
  },
  computed: {
    project () {
      return this.$store.state.selectedProject
    },
    currentSlide () {
      return this.$store.state.currentSlide
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

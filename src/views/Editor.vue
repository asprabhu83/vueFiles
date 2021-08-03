<template>
<section class="w-full">
  <bb-component :src="imgSrc" :project="project" :key="selectedImage"></bb-component>
</section>
  <div class="relative pt-1 w-full h-full bg-gray-800">
   <div class="flex mb-2 items-center justify-between">
    <div>
      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-grey-600 bg-gray-200">
        {{seekNumber}}/{{totalFrames}}
      </span>
    </div>
    <div class="text-right">
      <span class="text-xs font-semibold inline-block text-gray-600">
       <nav class="block">
    <ul class="flex pl-0 rounded list-none flex-wrap">
      <li>
        <a class="first:ml-0 text-xs font-semibold flex h-8 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-grey-500 bg-white text-grey-500" @click="goToSlide(-1)">
          <font-awesome-icon icon="chevron-left"  size="1x" class="mx-3"/>
        </a>
      </li>
      <li>
       <input class="w-8 h-8 border rounded py-2 px-3 text-xs font-semibold flex w-24 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative text-grey-darker" type="number"
                                name="seekNumber" id="seekNumber" v-model="enterNumber"  @keyup.enter="goToSlide(0)"/>
      </li>
      <li>
        <a class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-grey-500 bg-white text-grey-500"  @click="goToSlide(1)">
          <font-awesome-icon icon="chevron-right"  size="1x" class="mx-3"/>
        </a>
      </li>
    </ul>
  </nav>
      </span>
    </div>
  </div>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
    <div :style="'width: ' + width + '%'" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"></div>
  </div>
  <carousal />
</div>
</template>
<script>
import bbComponent from '@/components/bbox.vue'
import carousal from '@/components/carousel'
export default {
  components: {
    carousal, bbComponent
  },
  data () {
    return {
      componentKey: 0,
      seekNumber: 0,
      enterNumber: 0,
      width: 0
    }
  },
  created () {
    this.seekNumber = this.currentSlide
    this.enterNumber = this.currentSlide
    this.goToSlide(0)
  },
  methods: {
    forceRerender (child) {
      this.componentKey += 1
    },
    goToSlide (number) {
      this.project.Details[this.seekNumber].active = false
      this.seekNumber = number === 0 ? this.enterNumber : parseInt(this.seekNumber) + number
      this.$store.state.selectedImage = this.project.Details[this.seekNumber].image_Location
      this.project.Details[this.seekNumber].active = true
      this.$store.state.currentSlide = this.seekNumber
      this.enterNumber = parseInt(this.seekNumber)
      this.width = (this.seekNumber / this.totalFrames) * 100
    }
  },
  computed: {
    currentSlide () {
      return this.$store.state.currentSlide
    },
    project () {
      return this.$store.state.selectedProject
    },
    totalFrames () {
      return (this.$store.state.selectedProject.video_duration * this.$store.state.selectedProject.fps) - 1
    },
    selectedImage () {
      return this.$store.state.selectedImage
    },
    appURI () {
      return this.$store.state.appURI
    },
    imgSrc () {
      return this.appURI + 'uploads/' + this.selectedImage
    }
  }
}
</script>

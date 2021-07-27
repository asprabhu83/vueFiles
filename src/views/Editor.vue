<template>
<div class="w-full overflow-hidden">
  <bb-component :src="imgSrc" :project="project" :key="selectedImage"></bb-component>
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
      componentKey: 0
    }
  },
  methods: {
    forceRerender (child) {
      this.componentKey += 1
    }
  },
  computed: {
    project () {
      return this.$store.state.selectedProject
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

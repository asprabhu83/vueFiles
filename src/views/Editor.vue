<template>
<div class="w-full overflow-hidden">
  <bb-component :src="imgSrc"></bb-component>
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
  computed: {
    project () {
      return this.$store.state.selectedProject
    },
    number () {
      return this.$store.state.selectedImage
    },
    appURI () {
      return this.$store.state.appURI
    },
    imgSrc () {
      return this.appURI + 'uploads/' + this.project.image_Location + '/thumb_' + this.number + '.jpg'
    }
  }
}
</script>

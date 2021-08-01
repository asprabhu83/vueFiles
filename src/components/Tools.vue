<template>
  <aside
    id="right-panel"
    class="relative bg-gray-800 border-t h-full w-16 flex flex-col overflow-hidden flex-shrink-0"
  >
  <div class="w-full bg-gray-900 text-white text-center border-b border-gray-600">
   Tools
   </div>
   <button class="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" @click="drawBoundingBox">
    <Icon name="bbox-Tool" colorIcon="blue" size="20" class="cursor-pointer bg-blue-300 p-2"/>
    </button>
  </aside>
</template>

<script>
import Icon from '@/components/Icon.vue'
export default {
  components: {
    Icon
  },
  methods: {
    drawBoundingBox () {
      console.log('Works', this.$store.state.bboxTool)
      this.$store.state.bboxTool = true
      console.log('Works 1', this.$store.state.bboxTool)
    }
  }
}
</script>

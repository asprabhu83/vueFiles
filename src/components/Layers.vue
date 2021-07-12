<template>
  <aside
    id="right-panel"
    class="relative bg-gray-800 border-l border-gray-600 h-full w-64 flex flex-col overflow-hidden flex-shrink-0"
  >
      <header
        class="text-white text-xs font-medium flex justify-between items-center p-3 pb-0 ">
        <div class="flex items-center leading-5 py-px">Layers</div>
      </header>
      <div v-for="(layer, layerIndex) in Layers" v-bind:key="layerIndex" class="block items-center text-xs font-medium p-2 mt-2" :class="layer.focusable?'bg-white text-black':'text-white'">
          {{layer.layerName}}
        </div>
  </aside>
</template>

<script>
export default {
  computed: {
    Layers () {
      return this.$store.state.Layers
    }
  }
}
</script>

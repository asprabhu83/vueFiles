<template>
  <aside
    id="right-panel"
    class="relative bg-gray-800 border-l border-gray-600 h-full w-64 flex flex-col overflow-hidden flex-shrink-0"
  >
      <header
        class="text-white text-xs font-medium tracking-wide flex justify-between items-center p-3 pb-0 ">
        <div class="flex items-center leading-5 py-px">Design</div>
      </header>
      <section  class="w-full h-full relative z-10 scrollbar text-none overflow-auto">
      <div v-for="(design, designIndex) in designs" v-bind:key="designIndex" class="mt-2">
        <h5 class="items-center bg-white mb-2 text-center">{{design.designLabel}}</h5>
        <select v-model="design.designValue" class="ml-2" @change="setValueToLayer()" v-if="design.designType === 'select'">
          <option value="">--- Select ---</option>
          <option v-for="(item, itemIndex) in design.values" v-bind:key="itemIndex" :value="item.classValue">{{item.displayText}}</option>
        </select>
        <input type="color" id="favcolor" name="favcolor" class="ml-2" v-model="design.designValue" v-if="design.designType === 'color'" list="presetColors" @change="setValueToLayer()">
        <datalist id="presetColors" v-if="design.designType === 'color'">
          <option v-for="(item, itemIndex) in design.values" v-bind:key="itemIndex">{{item.displayText}}</option>
      </datalist>
      </div>
      </section>
  </aside>
</template>

<script>
export default {
  computed: {
    designs () {
      return this.$store.state.Designs
    },
    Layers () {
      return this.$store.state.Layers
    }
  },
  methods: {
    setValueToLayer () {
      this.Layers.forEach(l => {
        if (l.focusable) {
          l.className = ''
          this.designs.forEach(design => {
            if (design.designType === 'color') {
              design.values.forEach(color => {
                if (color.displayText === design.designValue) {
                  l.className = l.className + color.classValue + ' '
                }
              })
            } else {
              l.className = l.className + design.designValue + ' '
            }
          })
        }
      })
    }
  }
}
</script>

<template>
  <aside
    id="right-panel"
    class="relative bg-gray-800 border-l border-gray-600 h-full w-64 flex flex-col overflow-hidden flex-shrink-0"
  >
  <template v-if="selectedDetail && selectedDetail.boundingBoxes && selectedDetail.boundingBoxes.length > 0">
  <section  class="mx-5 w-full h-auto relative z-10 scrollbar text-none overflow-auto" v-for="(boundingBox, boundingKey) in selectedDetail.boundingBoxes" v-bind:key="boundingKey">
  {{boundingBox}}
     <header
        class="text-white text-sm font-medium tracking-wide flex justify-between items-center py-3 ">
        <div class="flex items-center leading-5 py-px">{{boundingBox.name}}</div>
      </header>
     <div >
     <select v-model="boundingBox.selectedClass" class="border rounded w-3/4 py-2 px-3 text-grey-darker border-0 relative self-center outline-none" @change="getAttributes(boundingBox)">
                                <option v-for="(type, typeKey) in selectedDetail.classDetails" v-bind:key="typeKey" :value="type.id">{{type.class_name}}</option>
                              </select>
       </div>
      <div v-if="boundingBox.attributeValues && boundingBox.attributeValues.attribute_type">
      {{boundingBox.attributeValues.attribute_type}}
      </div>
   </section>
  </template>
  </aside>
</template>
<script>
export default {
  computed: {
    details () {
      return this.$store.state.selectedProject && this.$store.state.selectedProject.Details ? this.$store.state.selectedProject.Details : ''
    },
    selectedImage () {
      return this.$store.state.selectedImage
    },
    selectedDetail () {
      return Object.values(this.details).filter(detail => detail.image_Location === this.selectedImage)[0]
    },
    designComponent () {
      return this.$store.state.designComponent
    },
    appURI () {
      return this.$store.state.appURI
    }
  },
  methods: {
    async getAttributes (boundingBox) {
      await this.axios.get(this.appURI + 'api/getAttributes', {
        params: {
          class_id: boundingBox.selectedClass
        }
      })
        .then(x => {
          this.$store.state.commit('PUSH_ATTRIBUTE_VALUES', x.data[0])
        })
    }
  }
}
</script>

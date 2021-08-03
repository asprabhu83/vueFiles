<template>
  <aside
    id="right-panel"
    class="relative bg-dark-100 border-l border-gray-600 h-full w-64 flex flex-col overflow-hidden flex-shrink-0"
  >
  <template v-if="selectedDetail && selectedDetail.boundingBoxes && selectedDetail.boundingBoxes.length > 0">
  <section  class="mx-5 w-full h-auto relative z-10 scrollbar text-none overflow-auto" v-for="(boundingBox, boundingKey) in selectedDetail.boundingBoxes" v-bind:key="boundingKey">
     <header
        class="text-white text-lg font-medium tracking-wide flex justify-between items-center py-3 ">
        <div class="flex items-center leading-5 py-px">{{boundingBox.name}}</div>
      </header>
     <div >
     <select v-model="boundingBox.selectedClass" class="border rounded w-3/4 py-2 px-3 text-grey-darker border-0 relative self-center outline-none" @change="getAttributes(boundingBox)">
                                <option v-for="(type, typeKey) in selectedDetail.classDetails" v-bind:key="typeKey" :value="type.id">{{type.class_name}}</option>
                              </select>
       </div>
      <div v-if="boundingBox && boundingBox.attributeValues">
        <template v-for="(attribute, attributeIndex) in boundingBox.attributeValues" v-bind:key="attributeIndex">
          <div class="my-4" v-if="attribute.attribute_type==='YesNo'">
          <div class="text-white text-sm font-medium tracking-wide flex justify-between items-center py-1">{{attribute.attribute_name}}</div>
            <select v-model="attribute.setValue" class="border rounded w-3/4 py-2 px-3 text-grey-darker border-0 relative self-center outline-none">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div class="my-4" v-if="attribute.attribute_type==='select'">
          <div class="text-white text-sm font-medium tracking-wide flex justify-between items-center py-1">{{attribute.attribute_name}}</div>
            <select v-model="attribute.setValue" class="border rounded w-3/4 py-2 px-3 text-grey-darker border-0 relative self-center outline-none">
              <option v-for="(type, typeKey) in attribute.attribute_Values" v-bind:key="typeKey" :value="type">{{type}}</option>
            </select>
          </div>
        </template>
      </div>
   </section>
  </template>
  </aside>
</template>
<script>

export default {
  watch: {
    selectedDetail: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.selectedDetail = newValue
      }
    }
  },
  computed: {
    details () {
      return this.$store.state.selectedProject && this.$store.state.selectedProject.Details ? this.$store.state.selectedProject.Details : ''
    },
    selectedImage () {
      return this.$store.state.selectedImage
    },
    selectedDetail: {
      get: function () {
        return Object.values(this.details).find(detail => detail.image_Location === this.selectedImage)
      },
      set: function (newValue) {
        return newValue
      }
    },
    selectedIndex () {
      return Object.values(this.details).findIndex(detail => detail.image_Location === this.selectedImage)
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
      var vm = this
      await this.axios.get(this.appURI + 'api/getAttributes', {
        params: {
          class_id: boundingBox.selectedClass
        }
      })
        .then(x => {
          vm.$store.commit('PUSH_ATTRIBUTE_VALUES', x.data)
        })
    }
  }
}
</script>

<template>
   <div class="w-full bg-grey-500">
  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="addClass">
  <font-awesome-icon icon="plus"  size="1x" />
    <span>New Class</span>
  </button>
        <div class="container mx-auto py-8" v-if="classes && classes.length > 0">
            <div class="w-full mx-auto bg-white rounded shadow" v-for="(classR, classKey) in classes" v-bind:key="classKey">
                <div class="mx-2 py-4 px-8 text-black text-xl font-bold border-b border-grey-500"  v-if="classR.className !== ''">{{classR.className}}
                </div>
                <form name="class_creation" id="class_creation">
                    <div class="py-10 px-8">
                        <div class="mb-4">
                            <input class=" border rounded w-full py-2 px-3 text-grey-darker" :type="classR.type"
                                :name="classR.idName" :id="classR.idName" v-model="classR.className" :placeholder="classR.placeHolder">
                        </div>
                         <a class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="addAttributes(classR)">
                          <font-awesome-icon icon="plus"  size="1x"/>
                            <span>Add Attributes</span>
                          </a>
                           <div class="w-full mx-auto bg-white rounded shadow" v-if="classR.attributes && classR.attributes.length > 0">
                           <div class="py-10 px-8" v-for="(attribute, attributeKey) in classR.attributes" v-bind:key="attributeKey + classKey">
                            <div class="mb-4">
                            <input class=" border rounded w-full py-2 px-3 text-grey-darker" :type="attribute.type"
                                :name="attribute.idName" :id="attribute.idName" v-model="attribute.attributeName" :placeholder="attribute.placeHolder">
                        </div>
                           </div>
                           </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--  Application Details End -->
</template>
<script>
export default {
  data () {
    return {
      class: {
        className: '',
        idName: '',
        placeHolder: 'Enter Your Class Name',
        type: 'text',
        attributes: []
      },
      attribute: {
        attributeName: '',
        type: 'text',
        idName: '',
        placeHolder: 'Enter Your Attribute Name'
      },
      classes: []
    }
  },
  methods: {
    addClass () {
      const box = Object.create(this.class)
      this.classes.length > 0 ? box.idName = 'className' + this.classes.length : box.idName = 'className'
      this.classes.push(box)
    },
    addAttributes (item) {
      console.log(item)
      const box = Object.create(this.attribute)
      item.attributes.length > 0 ? box.idName = 'attributeName' + item.attributes.length : box.idName = 'attributeName'
      item.attributes.push(box)
    }
  }
}
</script>

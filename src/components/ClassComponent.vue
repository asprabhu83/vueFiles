<template>
   <div class="w-full bg-grey-500">
  <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="addClass">
  <font-awesome-icon icon="plus"  size="1x" />
    <span class="px-2">New Class</span>
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
                            <span class="px-2">Add Attributes</span>
                          </a>
                           <div class="w-full mx-auto bg-white" v-if="classR.attributes && classR.attributes.length > 0">
                           <div class="flex flex-row py-10 px-8" v-for="(attribute, attributeKey) in classR.attributes" v-bind:key="attributeKey + classKey">
                            <div class="mb-4 w-1/4 ">

                              <input class=" border rounded  py-2 px-3 text-grey-darker border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none" :type="attribute.nametype"  :name="attribute.idName" :id="attribute.idName" v-model="attribute.attributeName" :placeholder="attribute.placeHolder">
                            </div>
                            <div class="mb-4 w-1/4">
                              <select v-model="attribute.attributeType" class="border rounded w-3/4 py-2 px-3 text-grey-darker border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none">
                                <option v-for="(type, typeKey) in attribute.typeValues" v-bind:key="typeKey">{{type}}</option>
                              </select>
                            </div>
                            <div class="mb-4 w-1/4" v-if="attribute.attributeType === 'select'">
                            <div class="border flex flex-wrap items-stretch w-full relative h-15 bg-white items-center rounded mb-4">
          <input class="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-0 h-10 px-3 relative self-center font-roboto text-xl outline-none" type="text"  name="selectValue" id="selectValue" v-model="attribute.selectValue" placeholder="Enter Select Value">
            <div class="flex -mr-px">
              <span
                class="flex items-center leading-normal bg-white rounded rounded-l-none border-0 px-3 whitespace-no-wrap text-gray-600"
                >
                 <font-awesome-icon icon="plus"  size="1x" @click="addAttributesValues(attribute)"/>
                </span>
            </div>
          </div>
                            </div>
                             <div class="mb-4 w-1/4" v-if="attribute.attributeType === 'select'">
                            <template v-if="attribute && attribute.attributeValues.length >0">
                              <div class="w-1/4 flex justify-center items-center m-1 px-5 py-1 rounded-full bg-green-700 text-base text-white font-medium" v-for="(attributeValue, valueKey) in attribute.attributeValues" v-bind:key="valueKey">
                                <div class="text-xs font-normal px-2">{{attributeValue}}</div>
                                <font-awesome-icon icon="plus"  size="0.5x" @click="addAttributesValues(attribute)"/>
                             </div>
                            </template>
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
        nameType: 'text',
        idName: '',
        placeHolder: 'Enter Your Attribute Name',
        attributeType: '',
        typeValues: ['text', 'select', 'radiobutton', 'multiselect'],
        selectValue: '',
        attributeValues: []
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
      const box = Object.create(this.attribute)
      item.attributes.length > 0 ? box.idName = 'attributeName' + item.attributes.length : box.idName = 'attributeName'
      item.attributes.push(box)
    },
    addAttributesValues (item) {
      item.attributeValues.push(item.selectValue)
      item.selectValue = ''
    }
  }
}
</script>

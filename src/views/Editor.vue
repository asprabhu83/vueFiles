<template>
 <div id="bbox_annotator"></div>
<input id="annotation_data" name="annotation_data" type="hidden" v-model="annotateData"/>
</template>
<script>
export default {
  name: 'bbox_annotator',
  data () {
    return {
      image: '',
      annotateData: []
    }
  },
  mounted () {
    this.init()
  },
  created () {
    this.image = 'http://drill.siteguru.co.il/uploads/' + this.project.image_Location + '/thumb_0.jpg'
    this.$bboxAnnotator({
      url: this.image,
      onchange: function (annotation) {
        this.annotateData = JSON.stringify(annotation)
      }
    })
  },
  methods: {
    change ({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
    init () {

    }
  },
  computed: {
    project () {
      return this.$store.state.selectedProject
    }
  }
}
</script>

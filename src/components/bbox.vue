<template>
   <svg v-if="imgsize" :viewBox="'0 0 ' + imgsize.width + ' ' + imgsize.height" id="viewport" version="1.1" baseProfile="full" :class="bboxTool? 'draw-box cursor-crosshair':''">
      <image :xlink:href="src" width="100%" height="100%"/>
      <g>
      <rect
        v-for="(bb, i) in bbs.boundingBoxes" :key="'bb' + i"
        :x="bb.x || '0'" :y="bb.y || '0'" :width="bb.w || '0'" :height="bb.h  || '0'"
        fill="#EF5350" fill-opacity='0.4' :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" class="draggable" :class="'bb-' + i + ' cursor-move' + ' resize'"/>
      <circle
        v-for="(bb, i) in bbs.boundingBoxes" :key="'bb' + i"
        :cx="bb.x + bb.w || '0'" :cy="bb.y || '0'" r=15
        fill="#EF5350" fill-opacity='0.4' :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" class="resize" :class="'bb-' + i"/>
      <circle
        v-for="(bb, i) in bbs.boundingBoxes" :key="'bb' + i"
        :cx="bb.x  || '0'" :cy="bb.y + bb.h || '0'" r=15
        fill="#EF5350" fill-opacity='0.4' :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" class="resize" :class="'bb-' + i"/>
      <circle
        v-for="(bb, i) in bbs.boundingBoxes" :key="'bb' + i"
        :cx="bb.x  || '0'" :cy="bb.y || '0'" r=15
        fill="#EF5350" fill-opacity='0.4' :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" class="resize" :class="'bb-' + i"/>
      <circle
        v-for="(bb, i) in bbs.boundingBoxes" :key="'bb' + i"
        :cx="bb.x + bb.w || '0'" :cy="bb.y + bb.h || '0'" r=15
        fill="#EF5350" fill-opacity='0.4' :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" class="resize" :class="'bb-' + i"/>
      </g>
    </svg>
</template>
<script>
export default {
  props: [
    'src',
    'bbcolor',
    'bbstroke'
  ],
  data () {
    return {
      imgsize: null,
      svgElement: Object,
      svgPoint: Object,
      boundingBoxes: [],
      oneRectangle: {},
      mousePosition: {},
      start: {},
      isDrawing: false,
      baseImage: Object,
      selectedElement: false,
      draggingElement: '',
      offset: null,
      transform: null,
      annotation: {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
    }
  },
  async mounted () {
    if (this.src) {
      await this.getImageSize(this.src).then(imgsize => {
        this.imgsize = imgsize
      })
      this.createPoints()
    }
  },
  computed: {
    bboxTool () {
      return this.$store.state.bboxTool
    },
    projectDetails () {
      return this.$store.state.selectedProject.Details
    },
    selectedImage () {
      return this.$store.state.selectedImage
    },
    bbs () {
      var temp
      Object.values(this.projectDetails).forEach(detail => {
        if (detail.image_Location === this.selectedImage) {
          temp = detail
        }
      })
      return temp
    }
  },
  methods: {
    async handleMouseDown (event) {
      var pt = this.svgElement.createSVGPoint()
      if (event.target.classList.contains('draggable')) {
        var objectPosition = event.target.classList[1].toString().substring(3)
        var cursorPoint = (e) => {
          pt.x = e.clientX
          pt.y = e.clientY
          return pt.matrixTransform(this.svgElement.getScreenCTM().inverse())
        }
        var x = event.target.tagName === 'circle' ? 'cx' : 'x'
        var y = event.target.tagName === 'circle' ? 'cy' : 'y'
        var mouseStart = cursorPoint(event)
        var elementStart = { x: event.target[x].animVal.value, y: event.target[y].animVal.value }
        this.selectedElement = event.target
        const drag = (evt) => {
          var current = cursorPoint(evt)
          if (this.selectedElement) {
            pt.x = current.x - mouseStart.x
            pt.y = current.y - mouseStart.y
            this.bbs.boundingBoxes[objectPosition].x = elementStart.x + pt.x
            this.bbs.boundingBoxes[objectPosition].y = elementStart.y + pt.y
          }
        }
        const endDrag = (evt) => {
          this.svgElement.removeEventListener('mousemove', drag)
          this.svgElement.removeEventListener('mouseup', endDrag)
          this.svgElement.removeEventListener('mouseleave', endDrag)
          this.selectedElement = null
        }
        this.svgElement.addEventListener('mousemove', drag)
        this.svgElement.addEventListener('mouseup', endDrag)
        this.svgElement.addEventListener('mouseleave', endDrag)
      } else if (event.target.classList.contains('resize')) {
        objectPosition = event.target.classList[1].toString().substring(3)
        this.draggingElement = event.target
        const start = this.svgPoint(this.svgElement, event.clientX, event.clientY)
        const resize = (evt) => {
          const p = this.svgPoint(this.svgElement, evt.clientX, evt.clientY)
          if (this.draggingElement) {
            var startWidth = this.bbs.boundingBoxes[objectPosition].w
            var startHeight = this.bbs.boundingBoxes[objectPosition].h
            if (start.x === this.bbs.boundingBoxes[objectPosition].x) {
              if (evt.clientX < event.clientX) {
                this.bbs.boundingBoxes[objectPosition].x = p.x
                this.bbs.boundingBoxes[objectPosition].y = p.y
                this.bbs.boundingBoxes[objectPosition].w = startWidth - 1
                this.bbs.boundingBoxes[objectPosition].h = startHeight - 1
              } else {
                this.bbs.boundingBoxes[objectPosition].x = p.x
                this.bbs.boundingBoxes[objectPosition].y = p.y
                this.bbs.boundingBoxes[objectPosition].w = startWidth + 1
                this.bbs.boundingBoxes[objectPosition].h = startHeight + 1
              }
            } else {
              if (evt.clientX < event.clientX) {
                this.bbs.boundingBoxes[objectPosition].w = startWidth - 1
                this.bbs.boundingBoxes[objectPosition].h = startHeight - 1
              } else {
                this.bbs.boundingBoxes[objectPosition].w = startWidth + 1
                this.bbs.boundingBoxes[objectPosition].h = startHeight + 1
              }
            }
          }
        }
        const endresize = (evt) => {
          this.svgElement.removeEventListener('mousemove', resize)
          this.svgElement.removeEventListener('mouseup', endresize)
          this.svgElement.removeEventListener('mouseleave', endresize)
          this.draggingElement = null
        }
        this.svgElement.addEventListener('mousemove', resize)
        this.svgElement.addEventListener('mouseup', endresize)
        this.svgElement.addEventListener('mouseleave', endresize)
      } else if (this.bboxTool) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        const start = this.svgPoint(this.svgElement, event.clientX, event.clientY)
        const drawRect = (e) => {
          const p = this.svgPoint(this.svgElement, e.clientX, e.clientY)
          const w = Math.abs(p.x - start.x)
          const h = Math.abs(p.y - start.y)
          if (p.x > start.x) {
            p.x = start.x
          }
          if (p.y > start.y) {
            p.y = start.y
          }
          rect.setAttributeNS(null, 'x', p.x)
          rect.setAttributeNS(null, 'y', p.y)
          rect.setAttributeNS(null, 'width', w)
          rect.setAttributeNS(null, 'height', h)
          rect.setAttributeNS(null, 'stroke', '#EF5350')
          rect.setAttributeNS(null, 'fill', '#EF5350')
          rect.setAttributeNS(null, 'fill-opacity', '0.4')
          rect.setAttributeNS(null, 'stroke-width', '2')
          rect.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')
          rect.setAttributeNS(null, 'shape-rendering', 'crispEdges')
          rect.setAttributeNS(null, 'class', 'draggable')
          this.svgElement.appendChild(rect)
          start.x = p.x
          start.y = p.y
        }
        const endDraw = async (e) => {
          const p = this.svgPoint(this.svgElement, e.clientX, e.clientY)
          const w = Math.abs(p.x - start.x)
          const h = Math.abs(p.y - start.y)
          const box = Object.create(this.annotation)
          box.x = start.x
          box.y = start.y
          box.w = w
          box.h = h
          box.selectedClass = ''
          box.selectedAttribute = ''
          box.attributeValues = []
          box.name = 'Bounding Box Name'
          if (w > 10 && h > 10) {
            this.$store.commit('PUSH_BOUNDING_BOX', box)
          }
          this.svgElement.removeChild(rect)
          this.svgElement.removeEventListener('mousemove', drawRect)
          this.svgElement.removeEventListener('mouseup', endDraw)
          this.$store.state.bboxTool = false
        }
        this.svgElement.addEventListener('mousemove', drawRect)
        this.svgElement.addEventListener('mouseup', endDraw)
      }
    },
    getMousePosition (evt) {
      // var CTM = this.svgElement.getScreenCTM()
      return {
        x: evt.clientX,
        y: evt.clientY
      }
    },
    createPoints () {
      this.svgElement = document.querySelector('#viewport')
      this.svgPoint = (elem, x, y) => {
        const p = this.svgElement.createSVGPoint()
        p.x = x
        p.y = y
        return p.matrixTransform(elem.getScreenCTM().inverse())
      }
      this.svgElement.addEventListener('mousedown', this.handleMouseDown)
    },
    getImageSize (imgsrc) {
      return new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
          resolve({ width: img.width, height: img.height })
        }
        img.src = imgsrc
      })
    }
  }
}
</script>

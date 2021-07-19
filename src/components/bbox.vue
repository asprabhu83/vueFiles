<template>
   <svg v-if="imgsize" :viewBox="'0 0 ' + imgsize.width + ' ' + imgsize.height" id="viewport">
      <image :xlink:href="src" width="100%" height="100%"/>
      <rect
        v-for="(bb, i) in bbs" :key="'bb' + i"
        :x="bb.left * imgsize.width || '0'" :y="bb.top * imgsize.height || '0'" :width="bb.width * imgsize.width || '0'" :height="bb.height * imgsize.height || '0'"
        fill="none" :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges"/>
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
      annotation: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        printCoordinates: function () {
          console.log(`X: ${this.x}px, Y: ${this.y}px, Width: ${this.w}px, Height: ${this.h}px`)
        }
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
  methods: {
    handleMouseDown (event) {
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
        rect.setAttributeNS(null, 'fill', 'none')
        rect.setAttributeNS(null, 'stroke-width', '2')
        rect.setAttributeNS(null, 'vector-effect', 'non-scaling-stroke')
        rect.setAttributeNS(null, 'shape-rendering', 'crispEdges')
        const selectRect = (e) => {
          this.svgElement.removeEventListener('mousemove', drawRect)
          this.svgElement.removeEventListener('mouseup', endDraw)
          const endLeave = (e) => {
            rect.removeEventListener('mousedown', selectRect)
            rect.removeEventListener('mouseup', endLeave)
          }
          rect.addEventListener('mouseup', endLeave)
          const moveRect = (e) => {
            const p = this.svgPoint(this.svgElement, e.clientX, e.clientY)
            rect.setAttributeNS(null, 'x', p.x)
            rect.setAttributeNS(null, 'y', p.y)
            this.svgElement.appendChild(rect)
          }
          rect.addEventListener('mousemove', moveRect)
        }
        rect.addEventListener('mousedown', selectRect)
        this.svgElement.appendChild(rect)
        start.x = p.x
        start.y = p.y
      }
      const endDraw = (e) => {
        const p = this.svgPoint(this.svgElement, e.clientX, e.clientY)
        const w = Math.abs(p.x - start.x)
        const h = Math.abs(p.y - start.y)
        const box = Object.create(this.annotation)
        box.x = start.x
        box.y = start.y
        box.w = w
        box.h = h
        this.boundingBoxes.push(box)
        console.log(this.boundingBoxes)
        box.printCoordinates()
        this.svgElement.removeEventListener('mousemove', drawRect)
        this.svgElement.removeEventListener('mouseup', endDraw)
      }
      this.svgElement.addEventListener('mousemove', drawRect)
      this.svgElement.addEventListener('mouseup', endDraw)
    },
    createPoints () {
      this.svgElement = document.querySelector('#viewport')
      console.log(this.svgElement)
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

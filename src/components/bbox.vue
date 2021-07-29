<template>
   <svg v-if="imgsize" :viewBox="'0 0 ' + imgsize.width + ' ' + imgsize.height" id="viewport" onload="makeDraggable">
      <image :xlink:href="src" width="100%" height="100%"/>
      <rect
        v-for="(bb, i) in bbs.boundingBoxes" :key="'bb' + i"
        :x="bb.x || '0'" :y="bb.y || '0'" :width="bb.w || '0'" :height="bb.h  || '0'"
        fill="#EF5350" fill-opacity='0.4' :stroke="bbcolor || '#EF5350'" :stroke-width="bbstroke || '2'" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" class="draggable" :class="i"/>
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
      offset: null,
      transform: null,
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
  computed: {
    projectDetails () {
      return this.$store.state.selectedProject.Details
    },
    selectedImage () {
      return this.$store.state.selectedImage
    },
    bbs () {
      return Object.values(this.projectDetails).filter(detail => detail.image_Location === this.selectedImage)[0]
    }
  },
  methods: {
    pointIn (el, x, y) {
      this.svgPoint = (elem, x, y) => {
        const p = this.svgElement.createSVGPoint()
        p.x = x
        p.y = y
        return p.matrixTransform(el.getTransformToElement(this.svgElement).inverse())
      }
    },
    cursorPoint (evt) {
      this.svgPoint = (elem, x, y) => {
        const p = this.svgElement.createSVGPoint()
        p.x = evt.clientX
        p.y = evt.clientY
        return p.matrixTransform(this.svgElement.getScreenCTM().inverse())
      }
    },
    async handleMouseDown (event) {
      var svgElement = this.svgElement
      if (event.target.classList.contains('draggable')) {
        for (var a = this.svgElement.querySelectorAll('rect.draggable'), i = 0, len = a.length; i < len; ++i) {
          const createOn = (root, name, prop) => {
            var el = document.createElementNS('http://www.w3.org/2000/svg', name)
            for (var a in prop) {
              if (prop && Object.prototype.hasOwnProperty.call(prop, 'a')) {
                el.setAttribute(a, prop[a])
              }
            }
            return root.appendChild(el)
          }
          const rectCorner = (rect) => {
            var p = this.svgElement.createSVGPoint()
            p.x = rect.x.animVal.value + rect.width.animVal.value
            p.y = rect.y.animVal.value + rect.height.animVal.value
            return p.matrixTransform(rect.getTransformToElement(svgElement))
          }
          (function (rect) {
            var dot = createOn(svgElement, 'circle', { class: 'drag sizer', cx: 0, cy: 0, r: 5 })
            var moveDotToRect = function () {
              var corner = rectCorner(rect)
              console.log(corner)
              dot.setAttribute('cx', corner.x)
              dot.setAttribute('cy', corner.y)
            }
            moveDotToRect()
            rect.addEventListener('dragged', moveDotToRect, false)
            dot.addEventListener('dragged', function () {
              var rectXY = this.pointIn(rect, dot.cx.animVal.value, dot.cy.animVal.value)
              var w = Math.max(rectXY.x - rect.x.animVal.value, 1)
              var h = Math.max(rectXY.y - rect.y.animVal.value, 1)
              rect.setAttribute('width', w)
              rect.setAttribute('height', h)
            }, false)
          })(a[i])
        }
        this.selectedElement = event.target
        this.offset = this.getMousePosition(event)
        var transforms = this.selectedElement.transform.baseVal
        if (transforms.length === 0 ||
          transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          var translate = this.svgElement.createSVGTransform()
          translate.setTranslate(0, 0)
          this.selectedElement.transform.baseVal.insertItemBefore(translate, 0)
        }
        this.transform = transforms.getItem(0)
        this.offset.x -= this.transform.matrix.e
        this.offset.y -= this.transform.matrix.f
        const drag = (evt) => {
          if (this.selectedElement) {
            evt.preventDefault()
            var coord = this.getMousePosition(evt)
            this.transform.setTranslate(coord.x - this.offset.x, coord.y - this.offset.y)
          }
        }
        const endDrag = (evt) => {
          this.selectedElement = null
        }
        this.svgElement.addEventListener('mousemove', drag)
        this.svgElement.addEventListener('mouseup', endDrag)
        this.svgElement.addEventListener('mouseleave', endDrag)
      } else {
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
            this.boundingBoxes.push(box)
            this.$store.commit('PUSH_BOUNDING_BOX', this.boundingBoxes)
          }
          this.svgElement.removeChild(rect)
          this.svgElement.removeEventListener('mousemove', drawRect)
          this.svgElement.removeEventListener('mouseup', endDraw)
        }
        this.svgElement.addEventListener('mousemove', drawRect)
        this.svgElement.addEventListener('mouseup', endDraw)
      }
    },
    getMousePosition (evt) {
      var CTM = this.svgElement.getScreenCTM()
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
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

<template>
<div class="w-full">
  <canvas id="viewport" />
  <carousal />
</div>
</template>
<script>
import carousal from '@/components/carousel'
export default {
  components: {
    carousal
  },
  data () {
    return {
      boundingBoxes: [],
      boxImageCoordinates: [],
      oneRectangle: {},
      mousePosition: {},
      start: {},
      isDrawing: false,
      canvas2: Object,
      context2: Object,
      imgSrc: '',
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
  mounted () {
    this.loadImage('https://drill.siteguru.co.il/uploads/' + this.project.image_Location + '/thumb_' + this.number + '.jpg')
  },
  methods: {
    async loadImage (imgSrc) {
      this.imgSrc = imgSrc
      this.canvas2 = document.getElementById('viewport')
      this.context2 = this.canvas2.getContext('2d')
      this.drawCanvasImage()
      this.canvas2.addEventListener('mousedown', this.handleMouseDown)
      this.canvas2.addEventListener('mousemove', this.handleMouseMove)
      this.canvas2.addEventListener('mouseup', this.handleMouseUp)
    },
    drawCanvasImage () {
      this.baseImage = new Image()
      this.baseImage.src = this.imgSrc
      var self = this
      this.baseImage.onload = async function () {
        self.canvas2.width = self.canvas2.parentElement.clientWidth
        self.canvas2.height = self.canvas2.width * (self.baseImage.height / self.baseImage.width)
        self.context2.drawImage(self.baseImage, 0, 0, self.canvas2.width, self.canvas2.height)
      }
    },
    handleMouseDown (e) {
      this.start = this.oMousePos(this.canvas2, e)
      this.isDrawing = true
      // console.log(start.x, start.y);
      this.canvas2.style.cursor = 'crosshair'
    },
    handleMouseMove (e) {
      if (this.isDrawing) {
        this.mousePosition = this.oMousePos(this.canvas2, e)
        this.draw()
      }
    },
    handleMouseUp (e) {
      this.canvas2.style.cursor = 'default'
      this.isDrawing = false
      const box = Object.create(this.annotation)
      const box2 = Object.create(this.annotation)
      var scale = this.baseImage.width / this.baseImage.height
      console.log(scale)
      box.x = Math.round(this.oneRectangle.x * this.baseImage.width / this.canvas2.width)
      box.y = Math.round(this.oneRectangle.y * this.baseImage.height / this.canvas2.height)
      box.w = Math.round(this.oneRectangle.w * scale)
      box.h = Math.round(this.oneRectangle.h * scale)
      box2.x = this.oneRectangle.x
      box2.y = this.oneRectangle.y
      box2.w = this.oneRectangle.w
      box2.h = this.oneRectangle.h
      this.boxImageCoordinates.push(box)
      this.boundingBoxes.push(box2)
      this.draw()
      box.printCoordinates()
      box2.printCoordinates()
    },
    oMousePos (canvas2, evt) {
      var ClientRect = canvas2.getBoundingClientRect()
      return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
      }
    },
    draw () {
      this.oneRectangle.x = this.start.x
      this.oneRectangle.y = this.start.y
      this.oneRectangle.w = this.mousePosition.x - this.start.x
      this.oneRectangle.h = this.mousePosition.y - this.start.y
      this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height)
      this.context2.drawImage(this.baseImage, 0, 0, this.canvas2.width, this.canvas2.height)
      this.boundingBoxes.map(r => { this.drawRect(r) })
      this.drawRect(this.oneRectangle)
    },
    drawRect (o) {
      this.context2.strokeStyle = 'limegreen'
      this.context2.lineWidth = 2
      this.context2.beginPath(o)
      this.context2.rect(o.x, o.y, o.w, o.h)
      this.context2.stroke()
    }
  },
  computed: {
    project () {
      return this.$store.state.selectedProject
    },
    number () {
      return this.$store.state.selectedImage
    }
  }
}
</script>

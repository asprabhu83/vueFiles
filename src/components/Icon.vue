<template>
  <span class="icons d-inline-flex" :style="{ width: `${size}` }">
    <svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
     x="0px" y="0px" :width="size"
      :height="size" viewBox="0 0 30 37.5" xml:space="preserve" v-if="name=== 'bbox-Tool'">
    <g transform="translate(-30 -440)"><g xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M53,446H37v-2h-5v5h2v12h-2v5h5v-2h16v2h5v-5h-2v-12h2v-5h-5V446z M33,448v-3h3v3H33z M36,465h-3v-3h3V465z M53,463H37v-2    h-2v-12h2v-2h16v2h2v12h-2V463z M57,462v3h-3v-3H57z M54,445h3v3h-3V445z"/></g>
    </g>
    </svg>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      default: 16
    },
    name: {},
    color: {},
    color2: {},
    colorIcon: {
      default: '#000'
    }
  },
  data () {
    return {}
  }
}
</script>

<template>
  <main class="h-screen w-screen bg-white flex flex-col">
    <NavBar  v-if="$route.name!=='Editor'"/>
    <Topbar  v-if="$route.name==='Editor'"/>
    <section class="relative flex flex-1 flex-row">
    <Tools v-if="$route.name==='Editor'"/>
    <Layers v-if="$route.name!=='Editor'"/>
     <Videos  v-if="$route.name==='Grid' || $route.name==='Home'"/>
      <section
        class="relative flex flex-1 flex-col overflow-hidden flex-shrink-0 ">
        <router-view/>
        </section>
      <Design :key="designComponent"/>
    </section>
    <Loading v-if="loading"/>
  </main>
</template>

<script>
import Design from '../components/Design.vue'
import Layers from '../components/Layers.vue'
import Videos from '../components/Videos.vue'
import NavBar from '../components/NavBar.vue'
import Loading from '../components/Loading.vue'
import Tools from '../components/Tools.vue'
import Topbar from '../components/Topbar.vue'
export default {
  name: 'Dashboard',
  components: {
    Design,
    NavBar,
    Layers,
    Loading,
    Videos,
    Tools,
    Topbar
  },
  computed: {
    designComponent () {
      return this.$store.state.designComponent
    },
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>

<template>
  <main class="h-screen w-screen bg-white flex flex-col">
    <NavBar />
    <section class="relative flex flex-1 flex-row">
    <Layers v-if="$route.name !=='Editor'"/>
    <Videos  v-if="$route.name==='Grid' || $route.name==='Editor'"/>
      <section
        class="w-full h-full relative z-10 scrollbar text-left text-none">
        <router-view/>
        </section>
      <Design :key="designComponent"/>
    </section>
    <Loading v-if="loading"/>
  </main>
</template>

<script>
import Design from './components/Design.vue'
import Layers from './components/Layers.vue'
import Videos from './components/Videos.vue'
import NavBar from './components/NavBar.vue'
import Loading from './components/Loading.vue'
export default {
  name: 'App',
  components: {
    Design,
    NavBar,
    Layers,
    Loading,
    Videos
  },
  computed: {
    Layers () {
      return this.$store.state.Layers
    },
    designComponent () {
      return this.$store.state.designComponent
    }
  }
}
</script>

<template>
  <main class="h-screen w-screen overflow-hidden bg-white flex flex-col">
    <NavBar />

    <section class="relative flex flex-1 flex-row overflow-hidden">
    <Layers />
      <section
        class="w-full h-full relative z-10 scrollbar text-left text-none overflow-hidden">
        <router-view/>
        </section>
      <Design />
    </section>
    <Loading v-if="loading"/>
  </main>
</template>

<script>
import Design from './components/Design.vue'
import Layers from './components/Layers.vue'
import NavBar from './components/NavBar.vue'
import Loading from './components/Loading.vue'
export default {
  name: 'App',
  components: {
    Design,
    NavBar,
    Layers,
    Loading
  },
  computed: {
    Layers () {
      return this.$store.state.Layers
    },
    loading () {
      return this.$store.state.loading
    }
  }
}
</script>

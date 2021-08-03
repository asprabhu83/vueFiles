<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav class="relative flex flex-wrap items-center justify-between bg-gray-900">
        <div class="container flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <a
        href="/"
        class="p-3 h-full flex items-center group border-r border-gray-600"
      >
        <img src="https://drill-d.co.il/wp-content/uploads/2020/06/Big-Logo.d110a0.webp" class="h-5"/>
      </a>
          </div>
        </div>
        <button class="bg-transparent px-6 text-white font-bold cursor-pointer" @click="Logout">Logout</button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drpdwn: false
    }
  },
  methods: {
    Logout () {
      this.axios.post(process.env.VUE_APP_API_URI_PREFIX + 'api/users/logout')
        .then(() => {
          localStorage.removeItem('user_token')
          localStorage.removeItem('id')
          localStorage.removeItem('name')
          localStorage.removeItem('user_role')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.drpdwn{
  color: white;
  padding-top: 6px;
  font-size:13px;
  text-transform: uppercase;
}

.dropdown_menu_item.active{
  color: red;
}

</style>

<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-dark-100">
        <div class="container flex flex-wrap items-center justify-between">
          <div class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              <a
        href="/"
        class="p-3 h-full flex items-center group border-r border-gray-600"
      >
        <img src="https://drill-d.co.il/wp-content/uploads/2020/06/Big-Logo.d110a0.webp" class="h-10"/>
      </a>
            <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
              <i class="fas fa-bars"></i>
            </button>
          </div>
          <div class="lg:flex lg:flex-grow items-center">
            <ul class="flex flex-col lg:flex-row list-none">
              <li class="nav-item">
                <router-link  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"  to="/" >Projects</router-link>
              </li>
              <li class="nav-item">
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  Profile
                </a>
              </li>
              <li class="nav-item" v-if="permission === 'manage users' || type === 'super_admin'">
                <div class="relative inline-block text-left">
                  <div>
                    <button type="button" @click="drpdwn = true"  class="drpdwn outline-none border-none inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-gray-700 " id="menu-button" aria-expanded="true" aria-haspopup="true">
                      Settings
                      <!-- Heroicon name: solid/chevron-down -->
                      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-if="drpdwn === true" @mouseleave="drpdwn = false" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="" role="none">
                      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                      <router-link to="/user-list" class="text-gray-700 block px-4 py-3 text-sm hover:bg-dark-200 hover:text-white dropdown_menu_item" role="menuitem" tabindex="-1" id="menu-item-1">Manage Users</router-link>
                      <router-link to="/user-role-list" class="text-gray-700 block px-4 py-3 text-sm hover:bg-dark-200 hover:text-white dropdown_menu_item" role="menuitem" tabindex="-1" id="menu-item-2">Manage UserRole</router-link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <button class="bg-transparent px-6 text-white font-bold cursor-pointer" @click="Logout">Logout<font-awesome-icon icon="sign-out-alt"  size="1x" class="text-white ml-2 cursor-pointer" @click="addUserDialog = false" /></button>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drpdwn: false,
      permission: '',
      type: ''
    }
  },
  mounted () {
    this.permission = localStorage.getItem('manage users')
    this.type = localStorage.getItem('user_role')
  },
  methods: {
    Logout () {
      var token = localStorage.getItem('user_token')
      this.axios.get(process.env.VUE_APP_API_URI_PREFIX + 'api/users/logout', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(() => {
          localStorage.clear()
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

</style>

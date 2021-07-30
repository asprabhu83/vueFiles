<template>
  <div class="login_page">
    <div
      class="w-full h-screen flex items-center justify-center login_full_scrn bg-gray-900"
    >
      <form
        class="
          bg-white
          w-6/12
          flex
          items-center
          justify-center
          rounded
          px-16
          pt-16
          pb-16
          mb-4
        "
      >
        <div class="w-1/2">
          <img src="../assets/hello.png" alt="" />
        </div>
        <div class="form_box w-1/2 px-10 pb-16 pt-8 border-l-2 border-gainsboro">
          <div class="err_box h-12">
            <div class="error py-3 text-red-500" v-if="error == true">Invalid Credentials</div>
         </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none
                focus:shadow-outline
              "
              id="username"
              type="text"
              placeholder="Username"
              v-model="email"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="
                shadow
                appearance-none
                border
                rounded
                w-full
                py-2
                px-3
                text-gray-700
                leading-tight
                focus:outline-none
                focus:shadow-outline
              "
              id="password"
              type="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              class="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none
                focus:shadow-outline
                login_btn
              "
              type="button"
              @click="Login"
            >
              Sign In
            </button>
            <a
              class="
                inline-block
                align-baseline
                font-bold
                text-sm text-blue-500
                hover:text-blue-800
              "
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    Login () {
      var btn = document.querySelector('.login_btn')
      btn.innerHTML = 'Loading'
      Axios.post(process.env.VUE_APP_API_URI_PREFIX + 'api/users/login', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          const token = response.data.token
          const id = response.data.user.id
          const name = response.data.user.name
          const userRole = response.data.user.user_role
          localStorage.setItem('user_token', token)
          localStorage.setItem('id', id)
          localStorage.setItem('name', name)
          localStorage.setItem('user_role', userRole)
          if (token !== '') {
            this.$router.push('/dashboard')
          }
          btn.innerHTML = 'Sign In'
        })
        .catch((error) => {
          console.log(error)
          this.error = true
          btn.innerHTML = 'Sign In'
        })
    }
  }
}
</script>

<style scoped>
form {
  box-shadow: 0 2px 10px 4px rgb(0 0 0/15%);
}
</style>

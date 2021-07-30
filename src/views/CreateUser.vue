<template>
  <div>
    <div class="w-2/5 mt-40 mx-auto login_full_scrn">
      <form class="bg-white rounded mb-4">
        <div class="form_box">
          <div class="err_box h-12">
            <div class="success py-3 text-green-500" v-if="success == true">
              Added Successfully
            </div>
            <div class="error py-3 text-red-500" v-if="empty_valid == true">
              Values should not be empty
            </div>
            <div class="error py-3 text-red-500" v-if="email_valid == true">
              Enter a valid Email
            </div>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Your Name
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
              id="name"
              type="text"
              placeholder="Your Name"
              v-model="name"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="userrole"
            >
              User Role
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
              id="userrole"
              type="text"
              placeholder="User Role"
              v-model="userRole"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Email
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
              type="email"
              placeholder="Email"
              v-model="email"
            />
          </div>
          <div class="mb-12">
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
                w-full
                py-2
                px-4
                rounded
                focus:outline-none
                focus:shadow-outline
                reg_btn
              "
              type="button"
              @click="AddUser"
            >
              Add User
            </button>
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
      userRole: '',
      name: '',
      success: false,
      empty_valid: false,
      email_valid: false
    }
  },
  methods: {
    AddUser () {
      var btn = document.querySelector('.reg_btn')
      btn.innerHTML = 'Loading'
      var err = 0
      var emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (
        this.email === '' ||
        this.password === '' ||
        this.userRole === '' ||
        this.name === ''
      ) {
        err++
        this.empty_valid = true
        this.email_valid = false
        btn.innerHTML = 'Add User'
      } else {
        this.empty_valid = false
        if (!emailRegex.test(this.email)) {
          err++
          this.email_valid = true
          btn.innerHTML = 'Add User'
        }
      }
      if (err === 0) {
        this.empty_valid = false
        this.email_valid = false
        Axios.post(process.env.VUE_APP_API_URI_PREFIX + '/api/users/register', {
          email: this.email,
          password: this.password,
          user_role: this.userRole,
          name: this.name,
          password_confirmation: this.password
        })
          .then((response) => {
            console.log(response)
            this.success = true
            btn.innerHTML = 'Add User'
          })
          .catch((error) => {
            console.log(error)
            btn.innerHTML = 'Add User'
          })
      }
    }
  }
}
</script>

<style>
</style>

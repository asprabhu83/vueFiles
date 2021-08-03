<template>
  <div>
    <div class=" pb-5 pt-0 px-7 mx-auto login_full_scrn">
      <form class="bg-white rounded mb-4" @submit.prevent="AddUser">
        <div class="form_box">
          <div class="err_box ">
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
              for="phone"
            >
              Phone
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
              id="phone"
              type="number"
              placeholder="Phone"
              v-model="phone"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="userrole"
            >
              User Role
            </label>
            <select
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
              v-model="userRole"
            >
             <option class="text-xl " value="">Choose User Role</option>
             <option class="text-xl" :value="userRoleName.user_role" v-for="userRoleName in userRoleNames"
              :key="userRoleName.id" >{{userRoleName.user_role}}</option>
            </select>
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
              type="text"
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
              type="submit"
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
export default {
  data () {
    return {
      email: '',
      password: '',
      userRole: '',
      name: '',
      phone: '',
      success: false,
      empty_valid: false,
      email_valid: false,
      userRoleNames: []
    }
  },
  mounted () {
    this.GetUserRoleName()
  },
  methods: {
    AddUser () {
      var btn = document.querySelector('.reg_btn')
      btn.innerHTML = 'Loading'
      this.success = false
      this.empty_valid = false
      this.email_valid = false
      var err = 0
      var emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (
        this.email === '' ||
        this.password === '' ||
        this.userRole === '' ||
        this.name === '' ||
        this.phone === ''
      ) {
        err++
        this.empty_valid = true
        btn.innerHTML = 'Add User'
      } else {
        if (!emailRegex.test(this.email)) {
          err++
          this.email_valid = true
          btn.innerHTML = 'Add User'
        }
      }
      if (err === 0) {
        this.axios.post(process.env.VUE_APP_API_URI_PREFIX + 'api/users/register', {
          email: this.email,
          password: this.password,
          user_role: this.userRole,
          phone: this.phone,
          name: this.name,
          password_confirmation: this.password
        })
          .then((response) => {
            this.success = true
            btn.innerHTML = 'Add User'
            this.$emit('created')
            this.$emit('childDialog')
          })
          .catch((error) => {
            console.log(error)
            btn.innerHTML = 'Add User'
          })
      }
    },
    GetUserRoleName () {
      this.axios.get(process.env.VUE_APP_API_URI_PREFIX + 'api/userrole/index')
        .then((response) => {
          this.userRoleNames = response.data
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>

<template>
  <div>
    <div class="pb-5 pt-0 px-7 mx-auto login_full_scrn">
      <form class="bg-white rounded mb-4" >
        <div class="form_box">
          <div class="err_box ">
            <div class="success py-3 text-green-500" v-if="success == true">
              Added Successfully
            </div>
            <div class="error py-3 text-red-500" v-if="empty_valid == true">
              Values should not be empty
            </div>
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
              for="description"
            >
              Description
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
              id="description"
              type="text"
              placeholder="Description"
              v-model="description"
            />
          </div>
          <div class="mb-12">
            <label
              class="block text-gray-700 text-sm font-bold mb-3"
              for=""
            >
              Select User Permissions
            </label>
            <div class="mt-2 ml-2 grid grid-cols-3 gap-4" >
            <div v-for="permName in permNames" :key="permName.id">
              <label class="inline-flex items-center cursor-pointer"  >
                <input type="checkbox" class="form-checkbox" :value="permName.permission_name" v-model="permissions" >
                <span class="ml-2 capitalize" >{{permName.permission_name}}</span>
              </label>
            </div>
          </div>

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
              @click="AddUserRole"
            >
              Add UserRole
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
      userRole: '',
      description: '',
      permissions: [],
      empty_valid: false,
      success: false,
      permNames: []
    }
  },
  mounted () {
    this.GetPermission()
  },
  methods: {
    AddUserRole () {
      this.empty_valid = false
      this.success = false
      var err = 0
      if (
        this.userRole === '' ||
        this.description === '' ||
        !this.permissions.length
      ) {
        this.empty_valid = true
        err++
      }

      if (err === 0) {
        this.permissions = JSON.stringify(this.permissions)
        this.axios.post(process.env.VUE_APP_API_URI_PREFIX + 'api/userrole/store', {
          user_role: this.userRole,
          description: this.description,
          permission_id: this.permissions
        }).then(() => {
          this.success = true
          this.$emit('created')
          this.$emit('childDialog')
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    GetPermission () {
      this.axios.get(process.env.VUE_APP_API_URI_PREFIX + 'api/permission/index')
        .then((response) => {
          this.permNames = response.data
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>

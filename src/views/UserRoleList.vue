<template>
  <div class="w-10/12 mx-auto mt-40">
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    User Role
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Permissions
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="userRole in userRoles" :key="userRole.id">
                  <td class="px-6 py-4 whitespace-nowrap" >
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{userRole.id}}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" >
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{userRole.user_role}}
                    </span>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap" >
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{userRole.description}}
                    </span>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap" >
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{userRole.permission_id}}
                    </span>
                  </td>
                  <td
                    class="
                      px-6
                      py-4
                      flex
                      items-center
                      justify-start
                      whitespace-nowrap
                      text-right text-sm
                      font-medium
                    "
                  >
                    <span class="text-green-600 cursor-pointer mr-4 " @click="Edit(userRole.id)"
                      >Edit</span
                    >
                    <span class="text-red-600 cursor-pointer" @click="DialogBox(userRole.id)"
                      >Delete</span
                    >
                  </td>
                </tr>

                <!-- More people... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
     <div class="dialog_box fixed inset-0 h-screen w-full flex justify-center items-center" v-if="deleteDialog === true">
      <div class="dialog_content bg-white rounded-md shadow-md">
        <h1 class="text-xl text-center my-8 font-bold">
          Are you sure you want to delete this user role?
        </h1>
        <div class="flex items-center justify-center my-6">
          <button
            class="bg-gray-400 mx-4 rounded-sm text-white py-1 px-6"
            @click="deleteDialog = false"
          >
            cancel
          </button>
          <button
            class="bg-red-700 mx-4 text-white rounded-sm py-1 px-6"
            data-role-id="" v-on:click="Delete"
          >
            ok
          </button>
        </div>
      </div>
     </div>
     <div class="dialog_box fixed inset-0 h-screen w-full flex justify-center items-center" v-if="editDialog === true">
      <div class="dialog_content bg-white rounded-md shadow-md">
         <form class="bg-white rounded px-10 pb-14" >
            <div class="form_box">
              <div class="err_box h-12">
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
                <div class="mt-2 ml-2 grid grid-cols-3 gap-4" v-for="permName in permNames" :key="permName.id">
                <div>
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
                  Update UserRole
                </button>
              </div>
            </div>
          </form>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userRoles: [],
      permNames: [],
      deleteDialog: false,
      editDialog: false,
      id: '',
      userRole: '',
      description: '',
      permissions: []
    }
  },
  mounted () {
    this.GetUserRoles()
    this.GetPermission()
  },
  methods: {
    GetUserRoles () {
      this.axios
        .get(process.env.VUE_APP_API_URI_PREFIX + 'api/userrole/index')
        .then((response) => {
          this.userRoles = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    DialogBox (id) {
      this.deleteDialog = true
      this.$el.setAttribute('data-role-id', id)
    },
    Delete () {
      var id = this.$el.getAttribute('data-role-id')
      this.axios
        .delete(process.env.VUE_APP_API_URI_PREFIX + 'api/userrole/delete/' + id)
        .then(() => {
          this.deleteDialog = false
          this.GetUserRoles()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    GetPermission () {
      this.axios.get(process.env.VUE_APP_API_URI_PREFIX + 'api/permission/index')
        .then((response) => {
          this.permNames = response.data
        }).catch((error) => {
          console.log(error)
        })
    },
    Edit (id) {
      this.editDialog = true
      this.axios
        .get(process.env.VUE_APP_API_URI_PREFIX + 'api/userrole/show/' + id)
        .then((response) => {
          this.id = response.data.id
          this.userRole = response.data.user_role
          this.description = response.data.description
          this.permissions = JSON.parse(response.data.permission_id)
          this.phone = response.data.phone
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.dialog_box {
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog_content {
  width: 500px;
  max-width: 100%;
}
</style>

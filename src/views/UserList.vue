<template>
<section>
<div v-if="permission === 'manage users' || type === 'super_admin'">
   <div class="dialog_box fixed inset-0 h-screen w-full flex justify-center items-center" v-if="addUserDialog === true">
      <div class="dialog_content bg-white rounded-md shadow-md">
         <div class="my-2   flex items-center justify-between py-3 px-6"><span class="font-bold text-lg" >Add User</span><font-awesome-icon icon="times"  size="1x" class="text-red-600 cursor-pointer" @click="addUserDialog = false" /></div>
         <AddUser @created="GetUser" @childDialog="childDialog"/>
      </div>
   </div>
   <div class="w-10/12 mx-auto text-right mt-10">
     <button @click="addUserDialog = true" class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-5 px-4 rounded focus:outline-none focus:shadow-outline">Add User <font-awesome-icon icon="user-plus"  size="1x" class="text-white ml-2 cursor-pointer"  /></button>
   </div>
   <div class="w-10/12 mx-auto mt-10">
     <input class="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" v-model="searchQuery" placeholder="Search" />
   </div>
  <div class="w-10/12 mx-auto mt-5">
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
                    Name
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
                    Email
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
                    Phone
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
                <tr v-for="item in resultQuery" :key="item.id" >
                  <td class="px-6 py-4 whitespace-nowrap" v-if="item.id !== 1">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ item.id }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" v-if="item.id !== 1">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ item.name }}
                    </span>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap" v-if="item.id !== 1">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ item.user_role }}
                    </span>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap" v-if="item.id !== 1">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ item.email }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap" v-if="item.id !== 1">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ item.phone }}
                    </span>
                  </td>
                  <td v-if="item.id !== 1"
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
                    <font-awesome-icon icon="edit"  size="1x" class="text-green-600 mr-4 cursor-pointer mt-1" @click="Edit(item.id)" />
                    <font-awesome-icon icon="trash"  size="1x" class="text-red-600 cursor-pointer mt-1" @click="DialogBox(item.id)" />
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
          Are you sure you want to delete this user?
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
            data-id="" v-on:click="Delete"
          >
            ok
          </button>
        </div>
      </div>
    </div>
    <div class="dialog_box fixed inset-0 h-screen w-full flex justify-center items-center" v-if="editDialog === true">
        <div class="dialog_content bg-white rounded-md shadow-md">
            <div class="my-2   flex items-center justify-between py-3 px-10"><span class="font-bold text-lg" >Edit User</span><font-awesome-icon icon="times"  size="1x" class="text-red-600 cursor-pointer" @click="editDialog = false" /></div>
            <form class="bg-white rounded px-10 pb-10" >
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
                    <option class="text-xl" v-for="userRoleName in userRoleNames" :key="userRoleName.id" :value="userRoleName.user_role">{{userRoleName.user_role}}</option>
                    </select>
                </div>
                <div class="mb-12">
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
                    @click="Update"
                    >
                    Update User
                    </button>
                </div>
                </div>
            </form>
        </div>
    </div>
  </div>
</div>
<div class="my-60" v-else>
  <h1 class="text-center text-2xl font-bold">You do not have authorization to this page, please contact admin</h1>
</div>
</section>
</template>

<script>
import AddUser from '../views/CreateUser.vue'
export default {
  components: {
    AddUser
  },
  data () {
    return {
      searchQuery: '',
      users: [],
      deleteDialog: false,
      editDialog: false,
      addUserDialog: false,
      id: '',
      email: '',
      name: '',
      userRole: '',
      phone: '',
      userRoleNames: [],
      success: false,
      empty_valid: false,
      email_valid: false,
      permission: '',
      type: ''
    }
  },
  mounted () {
    this.GetUser()
    this.GetUserRoleName()
    this.permission = localStorage.getItem('manage users')
    this.type = localStorage.getItem('user_role')
  },
  computed: {
    resultQuery () {
      if (this.searchQuery) {
        return this.users.filter((item) => {
          return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.users
      }
    }
  },
  methods: {
    GetUser () {
      this.axios
        .get(process.env.VUE_APP_API_URI_PREFIX + 'api/users/index')
        .then((response) => {
          this.users = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    DialogBox (id) {
      this.deleteDialog = true
      this.$el.setAttribute('data-id', id)
    },
    Delete () {
      var id = this.$el.getAttribute('data-id')
      this.axios
        .delete(process.env.VUE_APP_API_URI_PREFIX + 'api/users/delete/' + id)
        .then(() => {
          this.deleteDialog = false
          this.GetUser()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    Edit (id) {
      this.editDialog = true
      this.axios
        .get(process.env.VUE_APP_API_URI_PREFIX + 'api/users/show/' + id)
        .then((response) => {
          this.id = response.data.id
          this.name = response.data.name
          this.email = response.data.email
          this.userRole = response.data.user_role
          this.phone = response.data.phone
        })
        .catch((error) => {
          console.log(error)
        })
    },
    Update () {
      this.success = false
      this.empty_valid = false
      this.email_valid = false
      var err = 0
      var emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (
        this.email === '' ||
        this.userRole === '' ||
        this.name === '' ||
        this.phone === ''
      ) {
        err++
        this.empty_valid = true
      } else {
        if (!emailRegex.test(this.email)) {
          err++
          this.email_valid = true
        }
      }
      if (err === 0) {
        this.axios
          .put(process.env.VUE_APP_API_URI_PREFIX + 'api/users/update/' + this.id, {
            id: this.id,
            name: this.name,
            user_role: this.userRole,
            phone: this.phone,
            email: this.email
          })
          .then(() => {
            this.editDialog = false
            this.GetUser()
          })
          .catch((error) => {
            console.log(error)
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
    },
    childDialog () {
      this.addUserDialog = false
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

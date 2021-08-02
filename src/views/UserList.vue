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
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ user.id }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ user.name }}
                    </span>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ user.user_role }}
                    </span>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ user.email }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        text-green-800
                      "
                    >
                      {{ user.phone }}
                    </span>
                  </td>
                  <td v-if="user.user_role !== 'super admin'"
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
                    <span class="text-green-600 cursor-pointer mr-4" @click="Edit(user.id)">Edit</span>
                    <span
                      class="text-red-600 cursor-pointer"
                      @click="DialogBox(user.id)"
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
            <div class="my-2  text-red-600 text-right py-3 px-10"><font-awesome-icon icon="times"  size="1x" class="cursor-pointer" @click="editDialog = false" /></div>
            <form class="bg-white rounded px-10 pb-14" >
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
                    <option class="text-xl" value="admin">admin</option>
                    <option class="text-xl" value="anatator">anatator</option>
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
</template>

<script>
export default {
  data () {
    return {
      users: [],
      deleteDialog: false,
      editDialog: false,
      id: '',
      email: '',
      name: '',
      userRole: '',
      phone: ''
    }
  },
  mounted () {
    this.GetUser()
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

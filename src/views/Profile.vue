<template>
  <div class="h-5/6 flex items-center justify-center">
      <div class="w-1/2 px-10 py-16 shadow-lg">
          <div class="text-center mb-16">
              <font-awesome-icon icon="user-circle"  size="6x" class="text-black"  />
          </div>
          <div class="flex items-center mb-6">
              <h1  class="font-bold text-lg">Name:</h1>
              <h1 class="ml-2 text-md">{{name}}</h1>
          </div>
          <div class="flex items-center mb-6">
              <h1 class="font-bold text-lg">User Role:</h1>
              <h1 class="ml-2 text-md">{{userRole}}</h1>
          </div>
          <div class="flex items-center ">
              <h1 class="font-bold text-lg">Email:</h1>
              <h1 class="ml-2 text-md">{{email}}</h1>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      userRole: '',
      email: ''
    }
  },
  mounted () {
    this.name = localStorage.getItem('name')
    this.userRole = localStorage.getItem('user_role')
    this.email = localStorage.getItem('email')
  }
}
</script>

<style>

</style>

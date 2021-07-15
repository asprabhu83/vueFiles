<template>
<section class="py-8 px-4">
  <div class="flex flex-col text-left">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" v-for="(header, hkey) in tableHeader" v-bind:key="hkey">
                {{header}}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr  v-for="(project, index) in projects" v-bind:key="index">
              <td class="px-6 py-4 whitespace-nowrap"  v-for="(header, hkey) in tableHeader" v-bind:key="hkey">
                <div class="flex items-center">
                  {{project[header]}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</section>
</template>
<script>
export default {
  name: 'Grid',
  data () {
    return {
      projects: [],
      tableHeader: []
    }
  },
  created () {
    this.axios.get('https://videoprocess.kavisoftek.in/api/getProjects')
      .then(x => {
        this.projects = x.data
        console.log(this.projects[0])
        this.tableHeader = Object.keys(this.projects[0])
      })
  }
}
</script>

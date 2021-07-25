<template>
  <div class="flex flex-wrap">
    <div class="w-full">
      <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-900">
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
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/">
                  Projects
                </a>
              </li>
              <li class="nav-item">
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

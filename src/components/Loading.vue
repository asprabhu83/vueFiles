<template>
<div class="flex w-full h-full fixed block h-screen text-center bg-white opacity-75 z-50">
  <div class="flex justify-around m-auto">
    <span class="inline-flex rounded-md shadow-sm">
      <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base text-xl leading-6 font-medium rounded-md text-gray-700 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
        <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing
      </button>
    </span>
  </div>
</div>
</template>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-b from-gray-800 to-gray-600">
      <h2 class="text-white text-4xl sm:text-5xl font-bold mb-6 py-3">Smart Photo Storage</h2>
      <p class="text-white text-lg sm:text-xl max-w-3xl mb-8 py-5">
        Search your entire photo library with natural language to find any moment, instantly.
      </p>
      <router-link
        v-if="!isLoggedIn"
        to="/login"
        class="text-white py-2 bg-emerald-600 hover:bg-emerald-500 font-semibold px-6 rounded-md shadow-md transition duration-200"
      >
        Get started
      </router-link>

      <router-link
        v-else
        to="/gallery"
        class="text-white py-2 bg-blue-600 hover:bg-blue-500 font-semibold px-6 rounded-md shadow-md transition duration-200"
      >
        Go to Gallery
      </router-link>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  const user = localStorage.getItem('user')
  isLoggedIn.value = !!user
})
</script>

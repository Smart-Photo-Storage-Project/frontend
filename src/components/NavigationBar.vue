<template>
  <nav class="w-full bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <ul class="flex space-x-6 text-sm text-white font-medium">
        <li><a href="/" class="text-2xl font-bold text-white">SmartPhoto</a></li>
      </ul>
      <ul class="flex space-x-6 text-sm text-white font-medium items-center">

        <li v-if="userName">
          <p class="px-1 pr-4">Welcome, {{ userName }}</p>
        </li>
        <li v-if="userName">
          <button
            @click="logout"
            class="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 cursor-pointer rounded-md shadow transition duration-200"
          >
            Logout
          </button>
        </li>

        <li v-else>
          <router-link
            to="/login"
            class="bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer font-semibold px-4 py-2 rounded-md shadow transition duration-200"
          >
            Login
          </router-link>
        </li>
      </ul>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const user = JSON.parse(storedUser)
    userName.value = user.name || ''
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  userName.value = ''
  router.push('/') // redirect ke home
}
</script>

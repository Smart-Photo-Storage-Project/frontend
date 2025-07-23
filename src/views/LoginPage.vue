<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 px-4">

    


    <div class="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
        <router-link
            to="/"
            class="self-start mb-8 text-sm text-gray-300 hover:text-white transition"
            >
            < Back to Home
        </router-link>
      <h2 class="text-3xl font-bold text-white mb-10 text-center py-5">Login to Your Account</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-10">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2 pb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="pb-4">
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2 py-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        >
          Login
        </button>
      </form>

      <p class="text-sm text-gray-400 mt-8 text-center pt-4">
        Don't have an account?
        <router-link
            to="/register"
            class="text-blue-400 hover:underline"
        >
            Register
        </router-link>
        
      </p>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const email = ref('')
const password = ref('')
const router = useRouter()
const toast = useToast()

async function handleLogin() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Login failed')
    }

    const data = await res.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem("user", JSON.stringify({ name: data.name }))

    toast.success('Successful login')
    router.push('/gallery')
  } catch (error) {
    toast.error(`Error: ${error.message}`)
  }
}
</script>


<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 px-4">
    <div class="bg-gray-900 shadow-lg rounded-lg p-8 w-full max-w-md">
      
      <router-link
        to="/"
        class="self-start mb-8 text-sm text-gray-300 hover:text-white transition"
      >
        &lt; Back to Home
      </router-link>
      
      <h2 class="text-3xl font-bold text-white mb-10 text-center py-5">Create a New Account</h2>

      <form @submit.prevent="handleRegister" class="space-y-10">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2 py-2">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2 py-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="pb-5">
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
          Register
        </button>
      </form>

      <p class="text-sm text-gray-400 mt-8 text-center pt-4">
        Already have an account?
        <router-link to="/login" class="text-blue-400 hover:underline">Login</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const toast = useToast()


const name = ref('')
const email = ref('')
const password = ref('')

async function handleRegister() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Registration failed')
    }

    toast.success('Successfully registered! Please log in.')
    router.push('/login')
  } catch (error) {
    toast.error(`Error: ${error.message}`)
  }
}

</script>

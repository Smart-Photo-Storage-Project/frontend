<template>
  <nav class="w-full bg-gray-800 shadow-md">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <ul class="flex space-x-6 text-sm text-white font-medium">
        <li>
          <a href="/" class="text-2xl font-bold text-white">SmartPhoto</a>
        </li>
      </ul>

      <ul class="flex space-x-6 text-sm text-white font-medium items-center">
        <!-- Notification Icon -->
        <li v-if="userName" class="relative">
          <button @click="toggleDropdown" class="relative focus:outline-none cursor-pointer px-2">
            <!-- White Bell Icon -->
            <img
              src="@/assets/bell-icon.png"
              alt="Notifications"
              class="w-6 h-6"
            />

            <!-- Notification badge -->
            <span v-if="unreadCount > 0"
                  class="absolute -top-1 -right-2 bg-red-600 text-xs px-2 rounded-full">
              {{ unreadCount }}
            </span>

          </button>

          <!-- Dropdown -->
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-80 bg-gray-700 text-white rounded-md shadow-lg z-50 max-h-96 overflow-auto"
          >
            <ul>
              <li
                v-for="notif in notifications"
                :key="notif.id"
                class="p-4 rounded-md mb-2 bg-gray-800 relative"
              >
                <!-- 🔴 Red dot if unread -->
               <span
                  v-if="!notif.read"
                  class="absolute top-8 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow"
                >
                  New!
                </span>

                <p class="font-semibold">{{ formatStatus(notif.status) }}</p>
                <p class="text-xs text-gray-300">{{ formatTime(notif.created_at) }}</p>
                <p class="text-xs">{{ notif.message }}</p>
              </li>
              <li v-if="notifications.length === 0" class="px-4 py-2 text-sm text-gray-400">
                No notifications yet.
              </li>
            </ul>

          </div>
        </li>

        <li v-if="userName">
          <p class=" pr-4 px-4">Welcome, {{ userName }}</p>
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
const notifications = ref([])
const showDropdown = ref(false)
const unreadCount = ref(0)


const fetchNotifications = async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notification`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`
      }
    })

    if (!res.ok) {
      console.error('Failed to fetch notifications')
      return
    }

    const data = await res.json()
    notifications.value = data.reverse()
    unreadCount.value = notifications.value.filter(n => n.read !== true && n.read !== 'true').length
    console.log(notifications.value)
  } catch (err) {
    console.error('Error fetching notifications:', err)
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleString()
}

const formatStatus = (status) => {
  switch (status) {
    case 'completed':
      return '✅ Completed'
    case 'pending':
      return '🕒 Pending'
    case 'processing':
      return '🔄 Processing'
    case 'failed':
      return '❌ Failed'
    default:
      return status
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  userName.value = ''
  router.push('/')
}

const toggleDropdown = async () => {
  showDropdown.value = !showDropdown.value

  if (showDropdown.value && unreadCount.value > 0) {
    const unreadIds = notifications.value
      .filter(n => !n.read)
      .map(n => n.id)

    const token = localStorage.getItem('token')
    if (!token || unreadIds.length === 0) return

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notification`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: unreadIds })
      })

      if (!res.ok) {
        console.error('Failed to mark notifications as read')
        return
      }

      unreadCount.value = 0
    } catch (err) {
      console.error('Error marking notifications as read:', err)
    }
  }
}

let fetchCount = 0
const maxFetches = 10

const startLimitedFetching = () => {
  const interval = setInterval(() => {
    fetchNotifications()
    fetchCount++

    if (fetchCount >= maxFetches) {
      clearInterval(interval)
    }
  }, 3000) // every 3s
}

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const user = JSON.parse(storedUser)
    userName.value = user.name || ''
  }

  fetchNotifications()
  startLimitedFetching()
})
</script>

<template>
  <NavigationBar />
  <section class="min-h-screen text-white px-6 py-12 bg-gradient-to-b from-gray-900 to-gray-600">
    <h2 class="text-3xl font-bold mb-8 text-center">Your Photos</h2>

    <!-- Upload Page -->
    <div class="text-center py-5">
      <router-link
        to="/upload"
        class="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded mb-8"
      >
        Upload New Photo
      </router-link>
    </div>

    <!-- Search Form -->
    <div class="text-center py-3">
      <form @submit.prevent="handleSearch" class="inline-flex">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search photos..."
          class="px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none"
        />
        <button
          type="submit"
          class="bg-slate-600 hover:bg-slate-500 cursor-pointer px-4 py-2 rounded-r text-white font-semibold transition"
        >
          Search
        </button>
      </form>
    </div>


    <!-- Photo List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(photo, index) in photos"
        :key="index"
        class="bg-gray-800 p-4 rounded shadow flex flex-col items-center cursor-pointer 
            transition-transform transform hover:scale-105 hover:shadow-lg duration-200 ease-in-out"
        @click="openPreview(photo)"
        role="button"
      >
        <!-- Thumbnail box -->
        <div
          class="w-full h-48 bg-black flex items-center justify-center overflow-hidden mb-2 rounded"
        >
          <img
            :src="photo.url"
            :alt="photo.name"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <!-- Photo name and date -->
        <p class="font-semibold text-white py-1 text-center">{{ photo.name }}</p>
        <p class="text-sm text-gray-400 text-center">
          {{ new Date(photo.upload_at).toLocaleString() }}
        </p>
      </div>
    </div>


  <div class="pt-5">
    <div v-if="hasNext" class="text-center mt-4">
      <button @click="loadNextPage" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer">
        Load More
      </button>
    </div>
  </div>
    



    <!-- Fullscreen Modal -->
    <div
      v-if="selectedPhoto"
      class="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50"
      @click.self="closePreview"
    >
      <div class="max-w-full max-h-full">
        <img :src="selectedPhoto.url" :alt="selectedPhoto.name" class="object-contain max-h-screen max-w-screen" />
        <p class="text-white text-center mt-4">{{ selectedPhoto.name }}</p>
      </div>
    </div>


  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import { useToast } from 'vue-toast-notification'

const photos = ref([])
const router = useRouter()
const toast = useToast()
const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/`
const searchQuery = ref('')

const page = ref(1)
const hasNext = ref(true)
const totalPages = ref(1)

const fetchPhotos = async (query = '', pageNumber = 1) => {
  const token = localStorage.getItem('token')
  if (!token) {
    toast.error('Please login to view your gallery')
    router.push('/login')
    return
  }

  try {
    const url = query
      ? `${baseUrl}api/search?q=${encodeURIComponent(query)}&page=${pageNumber}`
      : `${baseUrl}api/photos?page=${pageNumber}`

    const res = await fetch(url, {
      headers: { Authorization: token }
    })
    if (!res.ok) throw new Error('Failed to fetch photos')

    const data = await res.json()
    if (!data.photos || data.photos.length === 0) {
      if (pageNumber === 1) {
        toast.info('No images found')
        photos.value = []
      }
      hasNext.value = false
      return
    }

    if (pageNumber === 1) {
      photos.value = []
    }
    photos.value.push(...data.photos.map(p => ({
      name: p.name,
      url: baseUrl + p.path.replace(/\\/g, '/'),
      upload_at: p.upload_at * 1000
    })))

    // Update pagination state
    page.value = data.page || 1
    totalPages.value = data.totalPages || 1
    hasNext.value = page.value < totalPages.value
  } catch (err) {
    toast.error(`Error: ${err.message}`)
  }
}

const handleSearch = () => {
  page.value = 1
  fetchPhotos(searchQuery.value.trim(), 1)
}

onMounted(() => fetchPhotos())

const selectedPhoto = ref(null)

function openPreview(photo) {
  selectedPhoto.value = photo
}

function closePreview() {
  selectedPhoto.value = null
}

function loadNextPage() {
  if (hasNext.value) {
    page.value += 1
    fetchPhotos(searchQuery.value.trim(), page.value)
  }
}
</script>


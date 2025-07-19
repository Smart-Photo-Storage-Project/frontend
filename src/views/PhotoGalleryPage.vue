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
const baseUrl = 'http://localhost:8080/'


const fetchPhotos = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    toast.error('Please login to view your gallery')
    router.push('/login')
    return
  }

  try {
    const res = await fetch(`${baseUrl}api/photos`, {
      headers: {
        'Authorization': `${token}`
      }
    })


    if (!res.ok) {
      throw new Error('Failed to fetch photos')
    }

    const data = await res.json()

    if (!data.photos || data.photos.length == 0){
      throw new Error('No images found')
    }

    
    photos.value = data.photos.map(photo => ({
      name: photo.name,
      url: baseUrl + photo.path.replace(/\\/g, '/'), // convert Windows path
      upload_at: photo.upload_at * 1000
    }))
  } catch (err) {
    toast.error(`Error: ${err.message}`)
  }
}

onMounted(fetchPhotos)

const selectedPhoto = ref(null)

function openPreview(photo) {
  selectedPhoto.value = photo
}

function closePreview() {
  selectedPhoto.value = null
}
</script>

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
        class="bg-gray-800 p-4 rounded shadow"
      >
        <img :src="photo.url" :alt="photo.name" class="rounded mb-2" />
        <p class="font-semibold text-white py-2">{{ photo.name }}</p>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue'
import NavigationBar from '@/components/NavigationBar.vue'

const photos = ref([
  {
    url: 'http://localhost:8080/uploads/1752552162962188400_IMG_0045_comp_2.jpg',
    name: 'Vacation in Bali'
  },
  {
    url: 'http://localhost:8080/uploads/1752552162962188400_IMG_0045_comp_2.jpg',
    name: 'Birthday Party'
  },
  {
    url: 'http://localhost:8080/uploads/1752552162962188400_IMG_0045_comp_2.jpg',
    name: 'Hiking Trip'
  },
  {
    url: 'http://localhost:8080/uploads/1752552162962188400_IMG_0045_comp_2.jpg',
    name: 'Old Family Photo'
  },
  {
    url: 'http://localhost:8080/uploads/1752552162962188400_IMG_0045_comp_2.jpg',
    name: 'Random Selfie'
  }
])
</script>

<!-- src/views/UploadPhoto.vue -->
<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 text-white px-4">
    <div class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
      <router-link
        to="/gallery"
        class="text-sm text-gray-300 hover:text-white mb-6 block"
      >
        < Back to Gallery
      </router-link>

      <h2 class="text-2xl font-bold mb-6 text-center py-5">Upload a Photo</h2>

      <form @submit.prevent="handleUpload" class="space-y-6">
        <div class="pb-4">
            <label class="block text-sm font-medium mb-2 pb-2">Choose a photo</label>
            
            <label
                for="photo"
                class="inline-block bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-200"
            >
                Choose File
                <input
                type="file"
                id="photo"
                @change="onFileChange"
                accept="image/*"
                class="hidden"
                />
            </label>

            <p v-if="selectedFile" class="text-sm text-gray-300 mt-2">
                Selected: {{ selectedFile.name }}
            </p>
        </div>




        <button
          type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded cursor-pointer font-semibold"
        >
          Upload
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)
const caption = ref('')

function onFileChange(event) {
  selectedFile.value = event.target.files[0]
}


function handleUpload() {
  if (!selectedFile.value) {
    alert('Please select a file.')
    return
  }

  // Placeholder logic, to be replaced with actual upload to backend
  console.log('Uploading:', selectedFile.value)
  console.log('Caption:', caption.value)
  alert('Photo uploaded (fake)!')
}
</script>

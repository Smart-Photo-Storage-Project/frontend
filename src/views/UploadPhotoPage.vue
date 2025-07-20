<template>
  <section class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600 text-white px-4">
    <div class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
      <router-link
        to="/gallery"
        class="text-sm text-gray-300 hover:text-white mb-6 block"
      >
        < Back to Gallery
      </router-link>

      <h2 class="text-2xl font-bold mb-6 text-center py-5">Upload Photos</h2>

      <form @submit.prevent="handleUpload" class="space-y-6">
        <div class="pb-4">
          <label class="block text-sm font-medium mb-2 pb-2">Choose photos</label>

          <label
            for="photos"
            class="inline-block bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded cursor-pointer transition duration-200"
          >
            Choose Files
            <input
              type="file"
              id="photos"
              multiple
              accept="image/*"
              @change="onFileChange"
              class="hidden"
            />
          </label>
          
          <!-- Selected Files Name -->
          <div class="pt-4">
            <div
              v-if="selectedFiles.length"
              class="mt-2 max-h-40 overflow-y-auto bg-gray-700 rounded p-2 text-sm text-gray-300"
            >
              <ul class="list-disc ml-5 space-y-1">
                <li v-for="file in selectedFiles" :key="file.name">{{ file.name }}</li>
              </ul>
            </div>

            </div>
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
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'

const selectedFiles = ref([])
const router = useRouter()
const toast = useToast()

function onFileChange(event) {
  selectedFiles.value = Array.from(event.target.files)
}

async function handleUpload() {
  if (!selectedFiles.value.length) {
    toast.error('Please select at least one photo.')
    return
  }

  const token = localStorage.getItem('token')
  if (!token) {
    toast.error('You must be logged in to upload.')
    return
  }

  const formData = new FormData()
  for (const file of selectedFiles.value) {
    formData.append('photos', file)
  }

  try {
    const res = await fetch('http://localhost:8080/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `${token}`
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data?.error || 'Upload failed.')
    }

    toast.success(`Uploaded ${data.uploaded_count} photo(s).`)
    if (data.failed_count > 0) {
      toast.warning(`${data.failed_count} file(s) failed: ${data.failed_files.join(', ')}`)
    }

    router.push('/gallery')
  } catch (err) {
    console.error(err)
    toast.error('Upload failed: ' + err.message)
  }
}
</script>

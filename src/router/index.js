import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import PhotoGalleryPage from '@/views/PhotoGalleryPage.vue'
import UploadPhotoPage from '@/views/UploadPhotoPage.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/gallery', name: 'Gallery', component: PhotoGalleryPage },
  { path: '/upload', name: 'Upload', component: UploadPhotoPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

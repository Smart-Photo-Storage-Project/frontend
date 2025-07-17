<template>
  <div class="min-h-screen bg-white text-gray-800">
    <Navbar />
    <HeroSection />
    <AppExplanation />
    <Motivation />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/NavigationBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AppExplanation from '@/components/AppExplanation.vue'
import Motivation from '@/components/Motivation.vue'
import Footer from '@/components/Footer.vue'
</script>

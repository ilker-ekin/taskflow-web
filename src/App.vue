<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <main class="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <RouterView />
    </main>
  </div>
</template>

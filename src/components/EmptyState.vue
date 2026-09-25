<script setup>
defineProps({
  title: { type: String, default: 'Henüz görev yok' },
  message: { type: String, default: 'İlk görevini ekleyerek başla.' },
  showAction: { type: Boolean, default: true },
})
</script>

<template>
  <div class="rounded-xl border-2 border-dashed border-slate-300 bg-white px-6 py-12 text-center">
    <p class="text-4xl" aria-hidden="true">📋</p>
    <h2 class="mt-3 text-lg font-semibold text-slate-900">{{ title }}</h2>
    <p class="mt-1 text-sm text-slate-500">{{ message }}</p>
    <RouterLink
      v-if="showAction"
      to="/tasks/new"
      class="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
    >
      + Yeni görev ekle
    </RouterLink>
  </div>
</template>

<script setup>
const logoUrl = `${import.meta.env.BASE_URL}favicon.svg`
</script>

<template>
  <header class="border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
      <RouterLink to="/" class="flex items-center gap-2 text-lg font-bold text-slate-900">
        <img :src="logoUrl" alt="" class="h-7 w-7" />
        TaskFlow
      </RouterLink>
      <RouterLink
        to="/tasks/new"
        class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        + Yeni görev
      </RouterLink>
    </div>
  </header>
</template>

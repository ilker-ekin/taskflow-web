<script setup>
import StatusBadge from './StatusBadge.vue'

defineProps({
  task: { type: Object, required: true },
})

defineEmits(['delete'])

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">
    <div class="flex flex-wrap items-center gap-2">
      <StatusBadge :value="task.status" />
      <StatusBadge type="priority" :value="task.priority" />
    </div>

    <h3
      class="mt-3 break-words text-base font-semibold"
      :class="task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'"
    >
      {{ task.title }}
    </h3>
    <p v-if="task.description" class="mt-1 break-words text-sm text-slate-600">{{ task.description }}</p>

    <div class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
      <p class="text-xs text-slate-500">
        <span class="font-medium text-slate-700">{{ task.assignee }}</span>
        · {{ formatDate(task.updatedAt) }}
      </p>
      <div class="flex gap-2">
        <RouterLink
          :to="`/tasks/${task.id}/edit`"
          class="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Düzenle
        </RouterLink>
        <button
          type="button"
          class="rounded-md border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
          @click="$emit('delete', task)"
        >
          Sil
        </button>
      </div>
    </div>
  </article>
</template>

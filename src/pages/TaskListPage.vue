<script setup>
import { computed, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import TaskCard from '../components/TaskCard.vue'
import { useTasks } from '../composables/useTasks'
import { STATUS_LABELS, TASK_STATUSES } from '../interfaces/task'

const { tasks, removeTask } = useTasks()

const filter = ref('all')
const filters = [{ value: 'all', label: 'Tümü' }, ...TASK_STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))]

const countFor = (value) => (value === 'all' ? tasks.value.length : tasks.value.filter((t) => t.status === value).length)

const visibleTasks = computed(() =>
  filter.value === 'all' ? tasks.value : tasks.value.filter((task) => task.status === filter.value),
)

function onDelete(task) {
  if (window.confirm(`"${task.title}" görevini silmek istediğine emin misin?`)) {
    removeTask(task.id)
  }
}
</script>

<template>
  <section>
    <div class="mb-5">
      <h1 class="text-2xl font-bold text-slate-900">Görevler</h1>
      <p class="mt-1 text-sm text-slate-500">Toplam {{ tasks.length }} görev</p>
    </div>

    <div v-if="tasks.length" class="mb-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Duruma göre filtrele">
      <button
        v-for="item in filters"
        :key="item.value"
        type="button"
        role="tab"
        :aria-selected="filter === item.value"
        class="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition"
        :class="
          filter === item.value
            ? 'bg-slate-900 text-white'
            : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-100'
        "
        @click="filter = item.value"
      >
        {{ item.label }}
        <span class="ml-1 opacity-60">{{ countFor(item.value) }}</span>
      </button>
    </div>

    <EmptyState v-if="!tasks.length" />
    <EmptyState
      v-else-if="!visibleTasks.length"
      title="Bu filtrede görev yok"
      message="Başka bir durum seçmeyi dene."
      :show-action="false"
    />
    <ul v-else class="space-y-3">
      <li v-for="task in visibleTasks" :key="task.id">
        <TaskCard :task="task" @delete="onDelete" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import EmptyState from '../components/EmptyState.vue'
import TaskForm from '../components/TaskForm.vue'
import { useTasks } from '../composables/useTasks'

const props = defineProps({
  id: { type: String, required: true },
})

const router = useRouter()
const { getTask, updateTask } = useTasks()

const task = computed(() => getTask(props.id))

function onSubmit(data) {
  updateTask(props.id, data)
  router.push('/')
}
</script>

<template>
  <section>
    <h1 class="mb-5 text-2xl font-bold text-slate-900">Görevi düzenle</h1>
    <TaskForm v-if="task" :key="task.id" :initial="task" submit-label="Değişiklikleri kaydet" @submit="onSubmit" @cancel="router.push('/')" />
    <EmptyState v-else title="Görev bulunamadı" message="Bu görev silinmiş ya da hiç var olmamış olabilir." :show-action="false" />
    <RouterLink v-if="!task" to="/" class="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline">
      ← Görev listesine dön
    </RouterLink>
  </section>
</template>

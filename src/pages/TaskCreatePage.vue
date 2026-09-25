<script setup>
import { useRouter } from 'vue-router'
import TaskForm from '../components/TaskForm.vue'
import { useTasks } from '../composables/useTasks'

const router = useRouter()
const { addTask } = useTasks()

function onSubmit(data) {
  addTask(data)
  router.push('/')
}
</script>

<template>
  <section>
    <h1 class="mb-5 text-2xl font-bold text-slate-900">Yeni görev</h1>
    <TaskForm submit-label="Görevi ekle" @submit="onSubmit" @cancel="router.push('/')" />
  </section>
</template>

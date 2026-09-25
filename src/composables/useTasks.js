import { ref, watch } from 'vue'

const STORAGE_KEY = 'taskflow-tasks'

function createId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// Module-level state: every component shares the same task list.
const tasks = ref(loadTasks())

watch(
  tasks,
  (value) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // Storage full or blocked — keep working in memory.
    }
  },
  { deep: true, immediate: true },
)

export function useTasks() {
  function getTask(id) {
    return tasks.value.find((task) => task.id === id)
  }

  function addTask(data) {
    const now = new Date().toISOString()
    const task = { ...data, id: createId(), createdAt: now, updatedAt: now }
    tasks.value.unshift(task)
    return task
  }

  function updateTask(id, data) {
    const task = getTask(id)
    if (!task) return null
    Object.assign(task, data, { id, createdAt: task.createdAt, updatedAt: new Date().toISOString() })
    return task
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return { tasks, getTask, addTask, updateTask, removeTask }
}

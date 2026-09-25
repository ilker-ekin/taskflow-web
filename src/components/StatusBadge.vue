<script setup>
import { computed } from 'vue'
import { PRIORITY_LABELS, STATUS_LABELS } from '../interfaces/task'

const props = defineProps({
  type: { type: String, default: 'status' }, // 'status' | 'priority'
  value: { type: String, required: true },
})

const STYLES = {
  status: {
    pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    'in-progress': 'bg-sky-50 text-sky-700 ring-sky-600/20',
    completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  },
  priority: {
    low: 'bg-slate-50 text-slate-600 ring-slate-500/20',
    medium: 'bg-violet-50 text-violet-700 ring-violet-600/20',
    high: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  },
}

const label = computed(() => {
  const labels = props.type === 'priority' ? PRIORITY_LABELS : STATUS_LABELS
  const text = labels[props.value] ?? props.value
  return props.type === 'priority' ? `${text} öncelik` : text
})

const classes = computed(() => STYLES[props.type]?.[props.value] ?? STYLES.priority.low)
</script>

<template>
  <span :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', classes]">
    {{ label }}
  </span>
</template>

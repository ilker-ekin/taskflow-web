<script setup>
import { reactive, ref } from 'vue'
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_STATUSES,
  TITLE_MAX_LENGTH,
  TITLE_MIN_LENGTH,
  emptyTask,
} from '../interfaces/task'

const props = defineProps({
  initial: { type: Object, default: null },
  submitLabel: { type: String, default: 'Kaydet' },
})

const emit = defineEmits(['submit', 'cancel'])

const base = emptyTask()
const form = reactive(
  Object.fromEntries(Object.keys(base).map((key) => [key, props.initial?.[key] ?? base[key]])),
)
const errors = ref({})

function validate() {
  const result = {}
  const title = form.title.trim()
  if (!title) result.title = 'Başlık zorunludur.'
  else if (title.length < TITLE_MIN_LENGTH) result.title = `Başlık en az ${TITLE_MIN_LENGTH} karakter olmalıdır.`
  else if (title.length > TITLE_MAX_LENGTH) result.title = `Başlık en fazla ${TITLE_MAX_LENGTH} karakter olabilir.`
  if (!form.assignee.trim()) result.assignee = 'Atanan kişi zorunludur.'
  if (!TASK_STATUSES.includes(form.status)) result.status = 'Geçerli bir durum seçin.'
  if (!TASK_PRIORITIES.includes(form.priority)) result.priority = 'Geçerli bir öncelik seçin.'
  errors.value = result
  return Object.keys(result).length === 0
}

function onSubmit() {
  if (!validate()) return
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
    priority: form.priority,
    assignee: form.assignee.trim(),
  })
}

const inputClass =
  'mt-1 block w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
const fieldClass = (name) => [inputClass, errors.value[name] ? 'border-rose-400' : 'border-slate-300']
</script>

<template>
  <form class="space-y-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6" novalidate @submit.prevent="onSubmit">
    <div>
      <label for="title" class="block text-sm font-medium text-slate-700">Başlık <span class="text-rose-500">*</span></label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        :maxlength="TITLE_MAX_LENGTH"
        placeholder="Örn. Sunumu hazırla"
        :class="fieldClass('title')"
      />
      <div class="mt-1 flex justify-between text-xs">
        <p class="text-rose-600">{{ errors.title }}</p>
        <p class="text-slate-400">{{ form.title.length }}/{{ TITLE_MAX_LENGTH }}</p>
      </div>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-slate-700">Açıklama</label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        placeholder="İsteğe bağlı detaylar"
        :class="fieldClass('description')"
      />
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <div>
        <label for="status" class="block text-sm font-medium text-slate-700">Durum</label>
        <select id="status" v-model="form.status" :class="fieldClass('status')">
          <option v-for="status in TASK_STATUSES" :key="status" :value="status">{{ STATUS_LABELS[status] }}</option>
        </select>
        <p v-if="errors.status" class="mt-1 text-xs text-rose-600">{{ errors.status }}</p>
      </div>
      <div>
        <label for="priority" class="block text-sm font-medium text-slate-700">Öncelik</label>
        <select id="priority" v-model="form.priority" :class="fieldClass('priority')">
          <option v-for="priority in TASK_PRIORITIES" :key="priority" :value="priority">
            {{ PRIORITY_LABELS[priority] }}
          </option>
        </select>
        <p v-if="errors.priority" class="mt-1 text-xs text-rose-600">{{ errors.priority }}</p>
      </div>
    </div>

    <div>
      <label for="assignee" class="block text-sm font-medium text-slate-700">Atanan kişi <span class="text-rose-500">*</span></label>
      <input id="assignee" v-model="form.assignee" type="text" placeholder="Örn. Ekin" :class="fieldClass('assignee')" />
      <p v-if="errors.assignee" class="mt-1 text-xs text-rose-600">{{ errors.assignee }}</p>
    </div>

    <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
      <button
        type="button"
        class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        @click="emit('cancel')"
      >
        Vazgeç
      </button>
      <button type="submit" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        {{ submitLabel }}
      </button>
    </div>
  </form>
</template>

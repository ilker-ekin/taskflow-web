/**
 * @typedef {'pending' | 'in-progress' | 'completed'} TaskStatus
 * @typedef {'low' | 'medium' | 'high'} TaskPriority
 *
 * @typedef {Object} Task
 * @property {string} id           UUID
 * @property {string} title        Required, 3–120 characters
 * @property {string} description  Optional
 * @property {TaskStatus} status
 * @property {TaskPriority} priority
 * @property {string} assignee     Required
 * @property {string} createdAt    ISO date string
 * @property {string} updatedAt    ISO date string
 */

export const TASK_STATUSES = ['pending', 'in-progress', 'completed']
export const TASK_PRIORITIES = ['low', 'medium', 'high']

export const STATUS_LABELS = {
  pending: 'Bekliyor',
  'in-progress': 'Devam ediyor',
  completed: 'Tamamlandı',
}

export const PRIORITY_LABELS = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
}

export const TITLE_MIN_LENGTH = 3
export const TITLE_MAX_LENGTH = 120

/** @returns {Omit<Task, 'id' | 'createdAt' | 'updatedAt'>} */
export function emptyTask() {
  return {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    assignee: '',
  }
}

import { createRouter, createWebHistory } from 'vue-router'
import TaskListPage from '../pages/TaskListPage.vue'
import TaskCreatePage from '../pages/TaskCreatePage.vue'
import TaskEditPage from '../pages/TaskEditPage.vue'

const routes = [
  { path: '/', name: 'task-list', component: TaskListPage },
  { path: '/tasks/new', name: 'task-create', component: TaskCreatePage },
  { path: '/tasks/:id/edit', name: 'task-edit', component: TaskEditPage, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

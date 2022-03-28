import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ListingPage from '@/pages/ListingPage.vue'
import DetailPage from '@/pages/DetailPage.vue'
import Layout from '@/layout/Layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: {
      name: 'ListingPage',
    },
    children: [
      {
        path: '/listing-page',
        name: 'ListingPage',
        component: ListingPage,
      },
      {
        path: '/detail-page/:id',
        name: 'DetailPage',
        component: DetailPage,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import { I18n } from '@/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang?',
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'portfolio',
          name: 'portfolio',
          component: () => import('@/views/PortfolioView.vue'),
        },
        {
          path: 'portfolio/:id_project',
          name: 'portfolio-element',
          component: () => import('@/views/PortfolioElementView.vue'),
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/BlogView.vue'),
        },
        {
          path: 'blog/:id_blog',
          name: 'blog-element',
          component: () => import('@/views/BlogElementView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  // scoll top smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })

  const defaultLang = 'fr'
  const lang = to.params.lang

  if (['fr', 'en'].includes(lang)) {
    I18n.global.locale.value = lang
    document.querySelector('html').setAttribute('lang', lang)
    next()
  }
  else {
    I18n.global.locale.value = defaultLang
    document.querySelector('html').setAttribute('lang', defaultLang)
    next()
  }
})

export default router

import { createRouter, createWebHistory } from "vue-router"
import { I18n } from "@/main"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:lang?",
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
          meta: {
            fr: {
              title: "Catif - Accueil",
              description: "Page d'accueil de mon portfolio",
              keywords:
                "portfolio, accueil, catif, bradley, barbier, bradley barbier",
            },
            en: {
              title: "Catif - Home",
              description: "Home page of my portfolio",
              keywords:
                "portfolio, home, catif, bradley, barbier, bradley barbier",
            },
          },
        },
        {
          path: "portfolio",
          name: "portfolio",
          component: () => import("@/views/PortfolioView.vue"),
          meta: {
            fr: {
              title: "Catif - Portfolio",
              description: "Page de mon portfolio",
              keywords: "portfolio, catif, bradley, barbier, bradley barbier",
            },
            en: {
              title: "Catif - Portfolio",
              description: "Portfolio page of my portfolio",
              keywords: "portfolio, catif, bradley, barbier, bradley barbier",
            },
          },
        },
        {
          path: "portfolio/:id_project",
          name: "portfolio-element",
          component: () => import("@/views/PortfolioElementView.vue"),
          meta: {
            fr: {
              title: "Catif - Portfolio",
              description: "Page de mon portfolio",
              keywords: "portfolio, catif, bradley, barbier, bradley barbier",
            },
            en: {
              title: "Catif - Portfolio",
              description: "Portfolio page of my portfolio",
              keywords: "portfolio, catif, bradley, barbier, bradley barbier",
            },
          },
        },
        {
          path: "blog",
          name: "blog",
          component: () => import("@/views/BlogView.vue"),
          meta: {
            fr: {
              title: "Catif - Blog",
              description: "Page de mon blog",
              keywords: "blog, catif, bradley, barbier, bradley barbier",
            },
            en: {
              title: "Catif - Blog",
              description: "Blog page of my portfolio",
              keywords: "blog, catif, bradley, barbier, bradley barbier",
            },
          },
        },
        {
          path: "blog/:id_blog",
          name: "blog-element",
          component: () => import("@/views/BlogElementView.vue"),
          meta: {
            fr: {
              title: "Catif - Blog",
              description: "Page de mon blog",
              keywords:
                "blog, article, catif, bradley, barbier, bradley barbier",
            },
            en: {
              title: "Catif - Blog",
              description: "Blog page of my portfolio",
              keywords:
                "blog, article, catif, bradley, barbier, bradley barbier",
            },
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  // scoll top smoothly
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })

  const defaultLang = "fr"
  const lang = to.params.lang

  if (["fr", "en"].includes(lang)) {
    I18n.global.locale.value = lang
    document.querySelector("html").setAttribute("lang", lang)
    document.title = to.meta[lang].title
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", to.meta[lang].description)
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", to.meta[lang].keywords)
    next()
  } else {
    I18n.global.locale.value = defaultLang
    document.querySelector("html").setAttribute("lang", defaultLang)
    document.title = to.meta[defaultLang].title
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", to.meta[defaultLang].description)
    document
      .querySelector('meta[name="keywords"]')
      .setAttribute("content", to.meta[defaultLang].keywords)
    next()
  }
})

export default router

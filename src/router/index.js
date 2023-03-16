import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/portfolio",
			name: "portfolio",
			component: () => import("@/views/PortfolioView.vue"),
		},
		{
			path: "/blog",
			name: "blog",
			component: () => import("@/views/BlogView.vue"),
		},
		{
			path: "/contact",
			name: "contact",
			component: () => import("@/views/ContactView.vue"),
		},
	],
});

router.afterEach((to, from) => {
	// scoll top smoothly
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
			meta: {
				transition: "page-transition-slide-left",
			},
		},
		{
			path: "/portfolio",
			name: "portfolio",
			component: () => import("@/views/PortfolioView.vue"),
			meta: {
				transition: "page-transition-slide-left",
			},
		},
		{
			path: "/blog",
			name: "blog",
			component: () => import("@/views/BlogView.vue"),
			meta: {
				transition: "page-transition-slide-left",
			},
		},
		{
			path: "/contact",
			name: "contact",
			component: () => import("@/views/ContactView.vue"),
			meta: {
				transition: "page-transition-slide-left",
			},
		},
	],
});

router.afterEach((to, from) => {
	const toIndex = router.options.routes.findIndex((r) => r.path === to.path);
	const fromIndex = router.options.routes.findIndex((r) => r.path === from.path);
	to.meta.transition = toIndex < fromIndex ? "page-transition-slide-right" : "page-transition-slide-left";

	console.log(to.meta.transition);

	// scoll top smoothly
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});

export default router;

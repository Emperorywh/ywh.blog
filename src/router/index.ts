import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: '文章',
			meta: {
				isLayout: true
			},
			component: () => import('@/views/home/index.vue')
		},
		{
			path: '/about',
			name: '关于',
			meta: {
				isLayout: true
			},
			component: () => import('@/views/about/index.vue')
		},
		{
			path: '/blog/:blogId',
			name: '博客',
			meta: {
				isLayout: false
			},
			component: () => import('@/views/blog/index.vue')
		}
	]
});

router.beforeEach((to, from, next) => {
	NProgress.inc();
	next();
});

router.afterEach(() => {
	NProgress.done()
});

export default router

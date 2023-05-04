import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

/**
 * 全局输入框
 */
export const useBlogSearchStore = defineStore('blogSearch', () => {
	const blogSearchText: Ref<string> = ref('');
	return { blogSearchText }
});

<template>
	<div class="app-container">
		<BlogHeader></BlogHeader>
		<div class="app-router-view">
			<RouterView />
		</div>
		<BlogFooter></BlogFooter>
	</div>
</template>

<script setup lang="ts">
import BlogHeader from "@/components/BlogHeader/index.vue";
import BlogFooter from "@/components/BlogFooter/index.vue";
import { RouterView } from 'vue-router';
</script>

<style lang="less" scoped>
	.app-container {

		.app-router-view {
			min-height: calc(100vh - 375px);
			margin: 0 auto;
			width: 952px;
		}
	}
</style>

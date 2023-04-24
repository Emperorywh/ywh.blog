<template>
    <div class="blog-container">
        <div class="blog-title">
            <a>{{ blogInfo?.title }}</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBlog } from "@/api/blog";
import { BlogFindById } from "@/api/blog";
import { ElNotification } from "element-plus";
import { onMounted, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
    onFetchBlogInfo();
});

const router = useRouter();

/**
 * 博客正文
 */
const blogInfo: Ref<IBlog | null> = ref(null);

/**
 * 初始化博客信息
 */
const onFetchBlogInfo = async () => {
    const blogId = router.currentRoute.value.params.blogId;
    if (blogId) {
        const response = await BlogFindById(blogId as string);
        if (response.code === 200) {
            blogInfo.value = response.data;
        } else {
            ElNotification({
                title: 'Error',
                message: response.message || "查询博客信息失败",
                type: 'error',
            });
        }
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    }
}
</script>

<style lang="less" scoped>
    .blog-container {

    }
</style>
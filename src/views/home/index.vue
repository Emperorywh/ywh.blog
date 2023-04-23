<template>
    <h1>首页</h1>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { BlogPageQuery } from "@/api/blog";
onMounted(async () => {
    const response = await BlogPageQuery({
        pageIndex: 1,
        pageSize: 10
    });
    console.log('response', response);
});
</script>
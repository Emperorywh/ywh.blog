<template>
    <div class="about-container">
        <div id="vditor" ref="vditorRef"></div>
        <div class="comment-box">
            <div class="comment-header">
                已经看到这里了，不留下点什么？
            </div>
            <CommentForm :comment-type="2" @on-success="createCommentSuccess"></CommentForm>
        </div>
        <CommentList :comment-type="2" ref="commentListRef"></CommentList>
    </div>
</template>

<script setup lang="ts">
import { AboutFindOne } from '@/api/about';
import { onMounted, ref, type Ref } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import CommentForm from "@/components/CommentForm/index.vue";
import CommentList from "@/components/CommentList/index.vue";

onMounted(() => {
    onFetchAbout();
});

// 富文本编辑器 dom实例
const vditorRef = ref();

/**
 * 评论列表ref
 */
 const commentListRef: Ref<any> = ref(null);

/**
 * 查询关于我
 */
const onFetchAbout = async () => {
    const response = await AboutFindOne();
    if (response.code === 200 && response.data) {
        Vditor.preview(vditorRef.value, response.data.content, {
            mode: "dark",
            anchor: 1
        });
    }
}

/**
 * 成功创建评论
 */
const createCommentSuccess = () => {
    commentListRef.value.onFetchCommentList();
}
</script>

<style lang="less" scoped>
    .comment-box {
        padding-top: 20px;
        border-top: 1px solid #eee;
        margin-top: 40px;

        .comment-header {
            font-size: 24px;
        }
    }
</style>


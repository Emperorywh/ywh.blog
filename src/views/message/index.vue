<template>
    <div class="message-container">
        <div class="comment-box">
            <div class="comment-header">
                已经看到这里了，不留下点什么？
            </div>
            <CommentForm :comment-type="1" @on-success="createCommentSuccess"></CommentForm>
        </div>
        <CommentList :comment-type="1" ref="commentListRef"></CommentList>
    </div>
</template>

<script setup lang="ts">
import CommentForm from "@/components/CommentForm/index.vue";
import CommentList from "@/components/CommentList/index.vue";
import { type Ref, ref } from "vue";

/**
 * 评论列表ref
 */
 const commentListRef: Ref<any> = ref(null);

/**
 * 成功创建评论
 */
const createCommentSuccess = () => {
    commentListRef.value.onFetchCommentList();
}
</script>

<style scoped lang="less">
.comment-box {
    font-size: 24px;

    .comment-header {
        margin-top: 20px;
    }
}
</style>
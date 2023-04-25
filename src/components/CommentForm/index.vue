<template>
    <div class="comment-container">
        <div class="comment-info">
            <input v-model="comment.from" type="text" placeholder="昵称">
            <input v-model="comment.email" type="text" placeholder="邮箱">
        </div>
        <textarea v-model="comment.content" placeholder="键入内容"></textarea>
        <div class="comment-bottom">
            <el-button type="danger" @click="onCreateComment">发送评论</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CommentCreate } from '@/api/comment';
import { ElNotification } from 'element-plus';
import { reactive } from 'vue';

interface IProps {
    blogId: string;
    onSuccess: () => void;
}

const props = defineProps<IProps>();

interface IComment {
    from: string;
    email: string;
    content: string;
}

/**
 * 评论内容
 */
const comment: IComment = reactive({
    from: '',
    email: '',
    content: ''
});

/**
 * 发送评论
 */
const onCreateComment = async () => {
    if (comment.from.trim().length === 0) {
        ElNotification({
            title: '错误',
            message: "昵称不能为空",
            type: 'error',
        });
        return;
    } else if (comment.email.trim().length === 0) {
        ElNotification({
            title: '错误',
            message: "邮箱不能为空",
            type: 'error',
        });
        return;
    } else if (comment.content.trim().length === 0) {
        ElNotification({
            title: '错误',
            message: "内容不能为空",
            type: 'error',
        });
        return;
    }
    const response = await CommentCreate({
        blogId: props.blogId,
        from: comment.from,
        email: comment.email,
        content: comment.content
    });
    if (response.code === 200) {
        ElNotification({
            title: '成功',
            message: "评论成功！",
            type: 'success',
        });
        comment.content = '';
        props.onSuccess();
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "评论失败",
            type: 'error',
        });
    }
}

</script>

<style lang="less" scoped>
.comment-container {
    margin: 20px 0;
    border: 1px solid #EEE;
    border-radius: 10px;
    padding: 20px;
    background-color: #FFF;

    .comment-info {
        display: flex;
        border-bottom: 1px #eee dashed;
        margin: 10px 0;
        padding-bottom: 10px;

        input {
            padding: 0 10px;
            font-size: 16px;
            flex: 1 1 auto;
            outline: none;
            border: none;
            color: #2a2e2e;
        }
    }

    textarea {
        width: 100%;
        min-height: 120px;
        font-size: 16px;
        outline: none;
        border: none;
        resize: none;
        color: #2a2e2e;
    }

    .comment-bottom {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
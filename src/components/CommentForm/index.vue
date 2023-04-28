<template>
    <div class="comment-container">
        <div class="comment-info">
            <input v-model="comment.from" type="text" placeholder="昵称" autocomplete="off">
            <input v-model="comment.email" type="text" placeholder="邮箱" autocomplete="off">
        </div>
        <textarea v-model="comment.content" placeholder="键入内容" autocomplete="off"></textarea>
        <div class="comment-bottom">
            <div v-if="props.to" class="comment-replay-box">
                <span class="comment-replay">回复</span>
                <span class="comment-replay-name">@{{ props.to.from }}</span>
                <span class="iconfont icon-times comment-replay-close" @click="onCloseReplay"></span>
            </div>
            <el-button type="danger" @click="onCreateComment">发送评论</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CommentCreate, type IComment } from '@/api/comment';
import { ElNotification } from 'element-plus';
import { reactive, onMounted } from 'vue';
const emit = defineEmits<{
    (e: 'on-success'): void;
    (e: 'on-cancel', comment: IComment): void;
}>();

onMounted(() => {
    initCommonForm();
});

interface IProps {
    parentId?: string;
    to?: IComment;
    blogId: string;
}


const props = defineProps<IProps>();
console.log("parentId", props.parentId);
console.log("to", props.to);

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
    const jsonData: IComment = {
        blogId: props.blogId,
        from: comment.from,
        email: comment.email,
        content: comment.content,
    }
    if (props.to) {
        jsonData.to = props.to._id;
    }
    if (props.parentId) {
        jsonData.parent = props.parentId;
    }
    const response = await CommentCreate(jsonData);
    const commentFormStorage = {
        from: comment.from,
        email: comment.email
    }
    localStorage.setItem('CommentFormStorage', JSON.stringify(commentFormStorage));
    if (response.code === 200) {
        ElNotification({
            title: '成功',
            message: "评论成功！",
            type: 'success',
        });
        comment.content = '';
        console.log('1子组件评论成功');
        emit('on-success');
        console.log('2子组件评论成功');
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "评论失败",
            type: 'error',
        });
    }
}

/**
 * 关闭评论窗口
 */
const onCloseReplay = () => {
    if (props.to) {
        emit('on-cancel', props.to);
    }
}

/**
 * 初始化评论form表单
 */
const initCommonForm = () => {
    const tempForm: IComment = JSON.parse(localStorage.getItem("CommentFormStorage") || "null");
    if (tempForm) {
        comment.from = tempForm.from;
        comment.email = tempForm.email;
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
        align-items: center;

        .comment-replay-box {
            margin-right: 10px;

            .comment-replay {
                margin-right: 5px;
            }

            .comment-replay-name {
                color: #999;
                margin-right: 10px;
            }

            .comment-replay-close {
                color: #999;
                font-size: 12px;
                cursor: pointer;

                &:hover {
                    color: #2a2e2e;
                }
            }
        }
    }
}
</style>
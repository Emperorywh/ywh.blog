<template>
    <div class="comment-list-container">
        <div class="comment-list-box">
            <div class="comment-list-item" v-for="commentItem in commentList" :key="commentItem._id">
                <el-avatar class="comment-cover" :size="50" :src="commentItem.avatarUrl" />
                <div class="comment-item-info">
                    <div class="comment-item-top">
                        <div class="comment-from">
                            {{ commentItem.from }}
                        </div>
                        <div class="comment-date">
                            {{ new Date(commentItem.createAt!).toLocaleString() }}
                        </div>
                    </div>
                    <div class="comment-content">
                        {{ commentItem.content }}
                    </div>
                    <div class="comment-btns">
                        <div class="comment-replay" @click="onReplay(commentItem)">
                            回复
                        </div>
                    </div>
                    <CommentForm v-if="commentItem.showCommentForm" :to="commentItem" :blogId="props.blogId"
                        :onSuccess="onFetchCommentByBlog" :onClose="() => onCloseReplay(commentItem)"></CommentForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import { CommentListByBlogId, type IComment } from "@/api/comment";
import { ElNotification } from 'element-plus';
import CommentForm from "@/components/CommentForm/index.vue";

onMounted(() => {
    onFetchCommentByBlog();
});

watch(() => props.blogId, () => {
    onFetchCommentByBlog();
})

interface IProps {
    blogId: string;
}

const props = defineProps<IProps>();

/**
 * 评论列表
 */
const commentList: Ref<IComment[]> = ref([]);

/**
 * 根据博客ID查询博客评论
 */
const onFetchCommentByBlog = async () => {
    const response = await CommentListByBlogId(props.blogId);
    if (response.code === 200) {
        response.data.forEach((item: IComment) => {
            item.showCommentForm = false;
        });
        commentList.value = response.data;
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "查询评论失败",
            type: 'error',
        });
    }
}

/**
 * 回复评论
 * @param commentItem 
 */
const onReplay = (commentItem: IComment) => {
    commentItem.showCommentForm = !commentItem.showCommentForm;
    commentList.value.forEach(item => {
        if (item._id !== commentItem._id) {
            item.showCommentForm = false;
        }
    });
}

/**
 * 关闭当前回复
 */
const onCloseReplay = (commentItem: IComment) => {
    commentItem.showCommentForm = !commentItem.showCommentForm;
}
</script>

<style lang="less" scoped>
.comment-list-box {
    .comment-list-item {
        display: flex;
        margin-bottom: 20px;

        .comment-cover {
            flex: 0 1 auto;
            margin-right: 20px;
        }

        .comment-item-info {
            flex: 1 1 auto;

            .comment-item-top {
                display: flex;
                align-items: center;

                .comment-from {
                    font-size: 14px;
                    color: #BB2649;
                    cursor: pointer;
                    transition: all 0.5s;
                    margin-right: 20px;
                    font-weight: 700;

                    &:hover {
                        transform: scale(1.1);
                    }
                }

                .comment-date {
                    font-size: 12px;
                }
            }

            .comment-content {
                margin: 10px 0;
            }

            .comment-btns {
                .comment-replay {
                    transition: all 0.5s;
                    color: #999;
                    cursor: pointer;

                    &:hover {
                        color: #333;
                    }
                }
            }
        }
    }
}</style>
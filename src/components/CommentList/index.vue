<template>
    <div class="comment-list-container">
        <div class="comment-list-box">
            <div class="comment-list-item" v-for="commentItem in commentList" :key="commentItem._id">
                <div class="comment-card">
                    <el-avatar class="comment-cover" :size="50" :src="commentItem.avatarUrl">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                    </el-avatar>
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
                        <CommentForm :comment-type="props.commentType" :parentId="commentItem._id" v-if="commentItem.showCommentForm"
                            :to="commentItem" :blogId="props.blogId" @on-success="onFetchCommentList"
                            @on-cancel="onCloseReplay">
                        </CommentForm>
                    </div>
                </div>
                <div class="comment-list-item comment-list-children" v-for="commentChildren in commentItem.children"
                    :key="commentChildren._id">
                    <div class="comment-card">
                        <el-avatar class="comment-cover" :size="30" :src="commentChildren.avatarUrl">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                        <div class="comment-item-info">
                            <div class="comment-item-top">
                                <div class="comment-from child-form-box">
                                    <div class="child-from">
                                        {{ commentChildren.from }}
                                    </div>
                                    <div class="child-form-icon">@</div>
                                    <div class="child-to">
                                        {{ typeof commentChildren.to !== 'string' && commentChildren.to?.from }}
                                    </div>
                                </div>
                                <div class="comment-date">
                                    {{ new Date(commentChildren.createAt!).toLocaleString() }}
                                </div>
                            </div>
                            <div class="comment-content">
                                {{ commentChildren.content }}
                            </div>
                            <div class="comment-btns">
                                <div class="comment-replay" @click="onChildrenReplay(commentItem, commentChildren)">
                                    回复
                                </div>
                            </div>
                            <CommentForm :comment-type="props.commentType" :parentId="commentItem._id"
                                v-if="commentChildren.showCommentForm" :to="commentChildren" :blogId="props.blogId"
                                @on-success="onFetchCommentList" @on-cancel="onCloseReplay">
                            </CommentForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import { CommentListByAboutMessage, CommentListByBlogId, CommentListByMessage, type IComment } from "@/api/comment";
import { ElNotification } from 'element-plus';
import CommentForm from "@/components/CommentForm/index.vue";
import ArrayToTree from "@/utils/ArrayToTree";

onMounted(() => {
    onFetchCommentList();
});

watch(() => props.blogId, () => {
    onFetchCommentList();
})

interface IProps {
    blogId?: string;
    commentType: number
}


const props = defineProps<IProps>();

/**
 * 评论列表
 */
const commentList: Ref<IComment[]> = ref([]);

/**
 * 获取评论列表
 */
const onFetchCommentList = async () => {
    let response;
    if (props.blogId && props.commentType === 0) {
        response = await CommentListByBlogId(props.blogId);
    } else if (props.commentType === 1) {
        response = await CommentListByMessage();
    } else if (props.commentType === 2) {
        response = await CommentListByAboutMessage();
    }
    if (response && response.code === 200) {
        response.data.forEach((item: IComment) => {
            item.showCommentForm = false;
            if (item.children && item.children.length > 0) {
                item.children.forEach(cItem => {
                    cItem.showCommentForm = false;
                });
            }
        });
        commentList.value = ArrayToTree(response.data);
    } else if (response) {
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
 * 子级回复子级
 * @param commentItem 
 * @param commentChildren 
 */
const onChildrenReplay = (commentItem: IComment, commentChildren: IComment) => {
    commentChildren.showCommentForm = !commentChildren.showCommentForm;
    commentList.value.forEach(item => {
        item.showCommentForm = false;
        if (item.children && item.children.length > 0) {
            item.children.forEach(cItem => {
                if (cItem._id !== commentChildren._id) {
                    cItem.showCommentForm = false;
                }
            });
        }
    });
}

/**
 * 关闭当前回复
 */
const onCloseReplay = (commentItem: IComment) => {
    commentItem.showCommentForm = !commentItem.showCommentForm;
}

defineExpose({
    onFetchCommentList
})

</script>

<style lang="less" scoped>
.comment-list-box {
    .comment-list-item {
        margin-bottom: 20px;

        .comment-card {
            display: flex;
        }

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

                .child-form-box {
                    display: flex;
                    align-items: center;

                    &:hover {
                        transform: scale(1);
                    }

                    .child-from {
                        margin-right: 10px;
                    }

                    .child-form-icon {
                        color: #999;
                    }

                    .child-to {
                        color: #999;
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

    .comment-list-children {
        margin: 10px 0 10px 70px;
    }
}
</style>
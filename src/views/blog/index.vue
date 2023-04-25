<template>
    <div class="blog-container">
        <div class="blog-title">
            {{ blogInfo?.title }}
        </div>
        <div class="blog-info">
            <div class="blog-time">
                时间：{{ new Date(blogInfo?.updateAt || '').toLocaleString() }}
            </div>
            <div class="blog-classifycation">
                分类：<span>{{ blogInfo?.classification.name }}</span>
            </div>
            <div class="blog-label-box">
                标签：
                <div class="blog-label-list">
                    <div class="blog-label-item" v-for="labelItem in blogInfo?.label" :key="labelItem._id">
                        {{ labelItem.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="blog-abstract">
            摘要：{{ blogInfo?.abstract }}
        </div>
        <div id="vditor" ref="vditorRef"></div>
        <div class="prev-next-blog">
            <div class="prev-next-row">
                <div class="preffix">
                    上一篇：
                </div>
                <div class="suffix" @click="onBlogDetail(blogPrevNext.prevBlog?._id)">
                    {{ blogPrevNext.prevBlog?.title || '暂无' }}
                </div>
            </div>
            <div class="prev-next-row">
                <div class="preffix">
                    下一篇：
                </div>
                <div class="suffix" @click="onBlogDetail(blogPrevNext.nextBlog?._id)">
                    {{ blogPrevNext.nextBlog?.title || '暂无' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBlog } from "@/api/blog";
import { BlogFindById } from "@/api/blog";
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref, watch, type Ref } from "vue";
import { useRouter } from "vue-router";
import Vditor from 'vditor';
import 'vditor/dist/index.css';

onMounted(() => {
    onFetchBlogInfo();
});

const router = useRouter();

watch(() => router.currentRoute.value.path, () => {
    onFetchBlogInfo();
});

interface BlogPrevNext {
    prevBlog: IBlog | null,
    nextBlog: IBlog | null
}

/**
 * 上一条/下一条博客
 */
const blogPrevNext: BlogPrevNext = reactive({
    prevBlog: null,
    nextBlog: null
});

// 富文本编辑器 dom实例
const vditorRef = ref();

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
        const { blog, prevBlog, nextBlog } = response.data;
        blogPrevNext.nextBlog = nextBlog;
        blogPrevNext.prevBlog = prevBlog;
        if (response.code === 200) {
            blogInfo.value = blog;
            Vditor.preview(vditorRef.value, blog.content, {
                mode: "dark",
                anchor: 1
            });

        } else {
            ElNotification({
                title: 'Error',
                message: response.message || "查询博客信息失败",
                type: 'error',
            });
        }
    }
}

/**
 * 跳转博客详情页
 */
const onBlogDetail = (blogId?: string) => {
    if (blogId) {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
        router.push(`/blog/${blogId}`);
    }
}

</script>

<style lang="less" scoped>
.blog-container {
    .blog-title {
        margin: 10px 0;
        color: #3354AA;
        text-decoration: none;
        font-size: 24px;
        font-weight: 700;
        transition: all 0.5s;
        cursor: pointer;

        &:hover {
            color: #444;
        }
    }

    .blog-info {
        display: flex;
        align-items: center;
        margin: 10px 0;
        color: #999;

        .blog-time {
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid #EEE;
        }

        .blog-classifycation {
            padding-right: 10px;
            margin-right: 10px;
            border-right: 1px solid #EEE;

            span {
                color: #3354AA;
                cursor: pointer;
                transition: all 0.5s;
                border-bottom: 1px solid #EEE;

                &:hover {
                    color: #444;
                }
            }
        }

        .blog-label-box {
            display: flex;
            align-items: center;

            .blog-label-list {
                display: flex;
                align-items: center;

                .blog-label-item {
                    margin-right: 10px;
                    color: #3354AA;
                    cursor: pointer;
                    transition: all 0.5s;
                    border-bottom: 1px solid #EEE;

                    &:hover {
                        color: #444;
                    }
                }
            }
        }
    }

    .prev-next-blog {
        .prev-next-row {
            display: flex;
            margin: 10px 0;

            .suffix {
                color: #3354AA;
                cursor: pointer;

                &:hover {
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
<template>
    <div class="blog-item-container">
        <div class="blog-title" @click="onBlogDetail">
            <a>{{ props.blog.title }}</a>
        </div>
        <el-image v-if="props.blog.cover" class="blog-cover" :preview-src-list="[props.blog.cover]" :src="props.blog.cover" />
        <div class="blog-info">
            <div class="blog-time">
                时间：{{ new Date(props.blog.updateAt).toLocaleString() }}
            </div>
            <div class="blog-classifycation">
                分类：<span>{{ props.blog.classification.name }}</span>
            </div>
            <div class="blog-label-box">
                标签：
                <div class="blog-label-list">
                    <div class="blog-label-item" v-for="labelItem in props.blog.label" :key="labelItem._id">
                        {{ labelItem.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="blog-abstract">
            {{ props.blog.abstract }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IBlog } from '@/api/blog';
import { useRouter } from 'vue-router';

const router = useRouter();

interface IProps {
    blog: IBlog
}

const props = defineProps<IProps>();

/**
 * 跳转博客详情页
 */
const onBlogDetail = () => {
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
    });
    router.push(`/blog/${props.blog._id}`);
}

</script>

<style lang="less" scoped>
.blog-item-container {
    padding: 50px 0;
    border-bottom: 1px solid #EEE;

    &:last-child {
        border-bottom: none;
    }

    .blog-title {
        margin-bottom: 10px;

        a {
            color: #3354AA;
            text-decoration: none;
            font-size: 28px;
            font-weight: 700;
            transition: all 0.5s;
            cursor: pointer;

            &:hover {
                color: #444;
            }
        }
    }

    .blog-cover {
        border-radius: 10px;
        max-height: 300px;
        margin: 10px 0;
        object-fit: contain;
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

    .blog-abstract {
        line-height: 30px;
    }
}
</style>
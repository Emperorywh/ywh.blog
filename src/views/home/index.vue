<template>
    <div class="home-container">
        <div class="blog-classify">
            <span>分类：</span>
            <el-radio-group v-model="blogClassify">
                <el-radio-button>全部</el-radio-button>
                <el-radio-button v-for="classifyItem in blogClassifyList" :label="classifyItem._id" :key="classifyItem._id"
                    :disabled="classifyItem.status === 0">{{ classifyItem.name }}</el-radio-button>
            </el-radio-group>
        </div>
        <div class="blog-label">
            <span class="blog-label-prev">标签：</span>
            <el-checkbox class="blog-label-prev" v-model="blogLabelCheckAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="blogLabelSelected" @change="handleCheckedLabelChange">
                <el-checkbox v-for="labelItem in blogLabelList" :disabled="labelItem.status === 0" :key="labelItem._id"
                    :label="labelItem._id">{{
                        labelItem.name
                    }}</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-alert v-if="blogSearch.blogSearchText.length > 0" :title="'搜索关键字：' + blogSearch.blogSearchText" type="success"
            center show-icon />
        <div class="blog-list">
            <div class="blog-list-item-box" v-if="blogResult.blogList.length > 0">
                <BlogItem v-for="blogItem in blogResult.blogList" :blog="blogItem" :key="blogItem._id"></BlogItem>
            </div>
            <div v-else>
                <el-skeleton v-if="loading" animated style="margin-top: 50px;">
                    <template #template>
                        <el-skeleton-item variant="h1" style="height: 40px" />
                        <el-skeleton-item variant="image" style="width: 100%; height: 300px" />
                        <el-skeleton-item variant="h3" style="margin: 10px 0;" />
                        <el-skeleton-item variant="h2" style="height: 25px" />
                    </template>
                </el-skeleton>
                <el-empty v-if="blogResult.blogList.length === 0 && !loading" description="暂无文章" />
            </div>
        </div>
        <div class="blog-page-box">
            <el-pagination layout="prev, pager, next" :total="blogResult.total" :page-size="pageData.pageSize"
                :current-page="pageData.pageIndex" @current-change="onPageChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch, type Ref } from "vue";
import { BlogPageQuery, type IBlog, type IBlogPage } from "@/api/blog";
import { ElNotification } from "element-plus";
import BlogItem from "@/components/BlogItem/index.vue";
import { BlogClassifyPageQuery, type IClassifycation } from "@/api/classification";
import { BlogLabelPageQuery, type ILabel } from "@/api/label";
import { useBlogSearchStore } from "@/stores/blogSearch";

const blogSearch = useBlogSearchStore();

onMounted(() => {
    onFetchBlogList();
    onFetchBlogClassify();
    onFetchBlogLabel();
});

interface BlogResult {
    blogList: Array<IBlog>;
    total: number;
}

/**
 * 是否加载中
 */
const loading: Ref<boolean> = ref(true);

/**
 * 当前选中的博客分类
 */
const blogClassify: Ref<string> = ref('');

/**
 * 博客分类列表
 */
const blogClassifyList: Ref<Array<IClassifycation>> = ref([]);

/**
 * 获取博客分类
 */
const onFetchBlogClassify = async () => {
    const response = await BlogClassifyPageQuery({
        pageIndex: 1,
        pageSize: 999
    });
    if (response.code === 200) {
        blogClassifyList.value = response.data.items;
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "获取博客分类失败",
            type: 'error',
        });
    }
}

/**
 * 博客标签列表
 */
const blogLabelList: Ref<Array<ILabel>> = ref([]);
/**
 * 博客标签：是否全选
 */
const blogLabelCheckAll: Ref<boolean> = ref(false);
/**
 * 博客标签：是否半选
 */
const isIndeterminate: Ref<boolean> = ref(false);
/**
 * 博客标签：选中的id
 */
const blogLabelSelected: Ref<Array<string>> = ref([]);

/**
 * 获取博客标签
 */
const onFetchBlogLabel = async () => {
    const response = await BlogLabelPageQuery({
        pageIndex: 1,
        pageSize: 999,
    });
    if (response.code === 200) {
        blogLabelList.value = response.data.items
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "获取博客标签失败",
            type: 'error',
        });
    }
}

/**
 * 博客标签选中状态变更
 */
const handleCheckedLabelChange = (value: string[]) => {
    isIndeterminate.value = value.length > 0 && blogLabelSelected.value.length === value.length;
}

/**
 * 是否设置博客标签 全选状态
 * @param val 
 */
const handleCheckAllChange = (val: boolean) => {
    if (val) {
        const labelId: string[] = [];
        blogLabelList.value.forEach(item => {
            if (item.status !== 0) {
                labelId.push(item._id);
            }
        });
        blogLabelSelected.value = labelId;
    } else {
        blogLabelSelected.value = [];
    }
}

/**
 * 博客查询结果
 */
const blogResult: BlogResult = reactive({
    blogList: [],
    total: 0
});

/**
 * 博客分页查询请求参数
 */
const pageData: IBlogPage = reactive({
    pageIndex: 1,
    pageSize: 5
});

/**
 * 监听页码变化
 */
watch([pageData, blogClassify, blogLabelSelected, blogSearch], () => {
    onFetchBlogList();
});

/**
 * 分页查询博客列表
 */
const onFetchBlogList = async () => {
    loading.value = true;
    const response = await BlogPageQuery({
        pageIndex: pageData.pageIndex,
        pageSize: pageData.pageSize,
        classification: blogClassify.value,
        label: blogLabelSelected.value,
        title: blogSearch.blogSearchText
    });
    if (response.code === 200) {
        blogResult.blogList = response.data.items;
        blogResult.total = response.data.total;
        loading.value = false;
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "获取博客列表出错",
            type: 'error',
        });
    }
}

/**
 * 页码变化
 */
const onPageChange = (value: number) => {
    pageData.pageIndex = value;
}
</script>

<style lang="less" scoped>
.home-container {
    .blog-classify {
        display: flex;
        align-items: center;
        height: 80px;
        margin-top: 10px;

        span {
            margin-right: 10px;
        }
    }

    .blog-label {
        display: flex;
        align-items: center;
        height: 60px;

        .blog-label-prev {
            margin-right: 20px;
        }
    }

    .blog-list {
        min-height: 80vh;
    }
}

.blog-page-box {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
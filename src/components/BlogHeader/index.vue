<template>
    <div class="header-conatiner">
        <div class="header-box">
            <div class="header-title-search">
                <div class="header-title">
                    <RouterLink to="/">Emperor</RouterLink>
                </div>
                <div class="header-search">
                    <input ref="inputSearchRef" type="text" placeholder="搜索关键字" @keydown.enter="onSearch" />
                    <span class="iconfont icon-sousuo" @click="onSearch"></span>
                </div>
            </div>
            <div class="personal-signature" v-if="personSignList.length > 0">
                {{ personSignList[personSignIndex].content }}
            </div>
            <div class="personal-signature" v-else>
                世界上只有一种真正的英雄主义，就是认清了生活的真相后还依然热爱它。——罗曼·罗兰
            </div>
            <div class="navbar-container">
                <div :class="{ 'navbar-item': true, 'navbar-activity': router.currentRoute.value.path === routerItem.path }"
                    v-for="routerItem in routerList">
                    <RouterLink :to="routerItem.path">{{ routerItem.name }}</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useBlogSearchStore } from "@/stores/blogSearch";
import { PersonalSignaturePageQuery } from "@/api/persionSignal";

const blogSearch = useBlogSearchStore();
const inputSearchRef = ref();
const router = useRouter();

interface RouterItem {
    path: string;
    name: string;
    isLayout: boolean;
}

interface IPersonSign {
    content: string;
    createAt: number;
    status: number;
    updateAt: number;
    _id: string;
}

/**
 * 路由列表
 */
const routerList: Ref<RouterItem[]> = ref([]);

onMounted(() => {
    router.options.routes.forEach(item => {
        if (item.meta?.isLayout) {
            routerList.value.push({
                path: item.path,
                name: item.name as string,
                isLayout: item.meta.isLayout as boolean
            })
        }
    });
    onFetchBlogPersonSign();
});

/**
 * 点击搜索图标
 */
const onSearch = () => {
    if (inputSearchRef.value) {
        blogSearch.blogSearchText = inputSearchRef.value.value;
    }
}

/**
 * 个性签名列表
 */
const personSignList: Ref<IPersonSign[]> = ref([]);
/**
 * 个性签名下标
 */
const personSignIndex: Ref<number> = ref(0);

/**
 * 获取个性签名列表
 */
const onFetchBlogPersonSign = async () => {
    const response = await PersonalSignaturePageQuery({
        pageIndex: 1,
        pageSize: 999
    });
    if (response.code === 200) {
        personSignList.value = response.data.items;
    }
}

watch([router.currentRoute], () => {
    inputSearchRef.value.value = "";
    blogSearch.blogSearchText = "";
    if (personSignIndex.value < personSignList.value.length -1) {
        personSignIndex.value++;
    } else {
        personSignIndex.value = 0;
    }
});

</script>

<style lang="less" scoped>
.header-conatiner {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    height: 175px;
    padding-top: 35px;
    border-bottom: 1px solid #EEE;

    a {
        text-decoration: none;
        color: #444;
    }

    .header-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 952px;

        .header-title-search {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .header-title {
                font-size: 36px;
                color: #333;
                cursor: pointer;
            }

            .header-search {
                padding: 5px;
                border: 1px solid #E9E9E9;
                border-radius: 2px;

                input {
                    border: none;
                    outline: none;
                    background: none;
                    padding: 0 10px;
                    font-size: 100%;
                }

                .iconfont {
                    font-size: 24px;
                    color: #999;
                }
            }
        }

        .personal-signature {
            color: #999;
        }

        .navbar-container {
            display: flex;
            align-items: center;

            .navbar-item {
                padding: 0 20px;
                border: 1px solid #EEE;
                border-bottom: none;
                height: 32px;
                line-height: 32px;
                color: #444;

                &:not(:last-child) {
                    border-right: none;
                }

                &:hover {
                    font-weight: 700;
                }
            }

            .navbar-activity {
                background: #F6F6F6;
            }
        }
    }
}
</style>
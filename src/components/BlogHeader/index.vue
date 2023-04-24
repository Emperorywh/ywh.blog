<template>
    <div class="header-conatiner">
        <div class="header-box">
            <div class="header-title-search">
                <div class="header-title">
                    <RouterLink to="/">Emperor</RouterLink>
                </div>
                <div class="header-search">
                    <input type="text" placeholder="搜索关键字" />
                    <span class="iconfont icon-sousuo"></span>
                </div>
            </div>
            <div class="personal-signature">
                世界上只有一种真正的英雄主义，就是认清了生活的真相后还依然热爱它。——罗曼·罗兰
            </div>
            <div class="navbar-container">
                <div :class="{ 'navbar-item': true, 'navbar-activity': router.currentRoute.value.path === routerItem.path }"
                    v-for="routerItem in router.options.routes">
                    <RouterLink :to="routerItem.path">{{ routerItem.name }}</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

/**
 * 路由下标
 */
const navbarIndex: Ref<number> = ref(0);
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
            }
            
            .navbar-activity {
                background: #F6F6F6;
            }
        }
    }
}
</style>
<template>
    <div class="friendly-container">
        <div class="friendly-list" v-if="friendlyLinkList.length > 0">
            <el-row :gutter="12">
                <el-col v-for="friendlyItem in friendlyLinkList" :key="friendlyItem._id" :xs="24" :sm="24" :md="12" :lg="12"
                    :xl="12" style="margin-bottom: 10px;" @click="handleFriendlyLink(friendlyItem)">
                    <el-card shadow="hover">
                        <div class="friendly-link-item">
                            <div class="friendly-link-info">
                                <el-avatar class="friendly-link-url" :size="80" :src="friendlyItem.cover"
                                    style="background-color: #FFF;">
                                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                                </el-avatar>
                                <div class="friendly-name">
                                    {{ friendlyItem.name }}
                                </div>
                            </div>
                            <div class="friendly-desc">
                                {{ friendlyItem.desc }}
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-empty v-else description="暂无友情链接" />
        <!-- 友情链接 头部提示 -->
        <div class="friendly-form-header">
            <el-divider />
            <div>
                欢迎在下方留言互换友情链接
            </div>
            <el-divider />
        </div>
        <!-- 友情链接 Form表单 -->
        <div class="friendly-link-form">
            <el-form :model="friendlyApply" :rules="rules" ref="ruleFormRef">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input clearable placeholder="请输入网站名称" v-model="friendlyApply.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址" prop="url">
                            <el-input clearable placeholder="请输入网站地址" v-model="friendlyApply.url" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="头像" prop="cover">
                            <el-input type="textarea" :rows="3" resize="none" placeholder="请输入网站头像" clearable
                                v-model="friendlyApply.cover" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="简介" prop="desc">
                            <el-input type="textarea" :rows="3" resize="none" clearable placeholder="请输入网站简介"
                                v-model="friendlyApply.desc" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" style="display: flex; justify-content: flex-end;">
                        <el-form-item>
                            <el-button @click="ruleFormRef?.resetFields()">重置</el-button>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

    </div>
</template>

<script setup lang="ts">
import { FriendlyLinkCreate, FriendlyLinkPageQuery, type IFriendlyLink } from '@/api/friendlyLink';
import { ElNotification } from 'element-plus';
import { onMounted, reactive, ref, type Ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'

onMounted(() => {
    onFetchFriendlyLinkList();
});

/**
 * 友情链接列表
 */
const friendlyLinkList: Ref<IFriendlyLink[]> = ref([]);
const friendlyApply: IFriendlyLink = reactive({
    name: '',
    url: '',
    cover: '',
    desc: '',
    status: 3,
    sort: 99
});

/**
 * 查询友情链接列表
 */
const onFetchFriendlyLinkList = async () => {
    const response = await FriendlyLinkPageQuery({
        pageIndex: 1,
        pageSize: 999,
    });
    if (response.code === 200) {
        response.data.items.forEach((item: IFriendlyLink) => {
            if (item.status === 1) {
                friendlyLinkList.value.push(item);
            }
        });
    } else {
        ElNotification({
            title: 'Error',
            message: response.message || "查询友情链接列表失败",
            type: 'error',
        });
    }
}

/**
 * 跳转友情链接
 * @param friendlyItem 
 */
const handleFriendlyLink = (friendlyItem: IFriendlyLink) => {
    window.open(friendlyItem.url);
}

/**
 * 友情链接 表单实例
 */
const ruleFormRef = ref<FormInstance>();

/**
 * 申请友情链接 form表单 校验规则
 */
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '网站名称必填！', trigger: 'blur' },
    ],
    url: [
        { required: true, message: '网站地址必填！', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '网站头像必填！', trigger: 'blur' },
    ],
    desc: [
        { required: true, message: '网站描述必填！', trigger: 'blur' },
    ]
});

/**
 * 提交 申请友情链接
 * @param formEl 
 */
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const response = await FriendlyLinkCreate(friendlyApply);
            if (response.code === 200) {
                formEl.resetFields();
                ElNotification({
                    title: '成功',
                    message: '申请成功，待审核通过后即可展示！',
                    type: 'success',
                    duration: 0
                });
            } else {
                ElNotification({
                    title: 'Error',
                    message: response.message || '申请失败',
                    type: 'error',
                });
            }
        } else {
            ElNotification({
                title: 'Error',
                message: '请完善相关信息后再提交',
                type: 'error',
            });
        }
    })
}
</script>

<style lang="less" scoped>
.friendly-container {
    margin: 20px 0;

    .friendly-list {
        min-height: 80vh;

        .friendly-link-item {
            transition: all 0.5s;
            cursor: pointer;

            .friendly-link-info {
                display: flex;
                align-items: center;
                margin-bottom: 10px;

                .friendly-link-url {
                    transition: all 0.5s;
                    flex-shrink: 0;
                }

                .friendly-name {
                    flex-grow: 1;
                    font-size: 28px;
                    margin-left: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: break-all;
                }
            }

            &:hover {

                .friendly-link-url {
                    transform: scale(1.1);
                }

                .friendly-name {
                    color: #F84352;
                }
            }

            .friendly-desc {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }

    .friendly-link-form {
        padding: 40px 30px 0 30px;
        border: 1px solid #EEE;
        border-radius: 10px;
        background-color: #FFF;
    }
}
</style>
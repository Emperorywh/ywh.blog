<template>
    <div class="footer-container">
        <div class="copy">
            <span class="date">&copy; {{ new Date().getFullYear() }}</span>
            <span class="author">Emperor.</span> 版权所有
        </div>
        <a class="icp" href="https://beian.miit.gov.cn" target="_blank">蜀ICP备2021008579号</a>
    </div>
</template>

<style lang="less" scoped>
.footer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;

    .copy {
        .date {
            margin-right: 10px;
        }

        .author {
            color: #3354AA;
            cursor: pointer;

            &:hover {
                color: #444;
            }
        }
    }

    .icp {
        color: #3354AA;
        text-decoration: none;
        margin: 10px 0;

        &:hover {
            color: #444;
        }
    }
}
</style>
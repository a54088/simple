<script setup>
const list = [
    {
        label: '新的朋友',
        key: 'xdpy'
    },
    {
        label: '我的群组',
        key: 'wdqz'
    },
    {
        label: '黑名单',
        key: 'hmd'
    },
]
</script>

<template>
    <view class="new-friends">
        <view class="new-friends__item" v-for="(item, index) in list" :key="index">
            <text>{{ item.label }}</text>
            <text class="iconfont icon-paizhao-jinru"></text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.new-friends {
    border-radius: 20rpx;
    display: flex;
    flex-direction: column;
    padding: 32rpx 26px;
    background: #F4F4F4;
    .new-friends__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 58rpx;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
    .iconfont {
        font-size: 24rpx;
    }
}
</style>
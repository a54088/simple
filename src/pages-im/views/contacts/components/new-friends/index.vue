<script setup>
const list = [
    {
        label: '新的朋友',
        key: 'xdpy',
        url: '/pages-im/views/new-friend/index'
    },
    {
        label: '我的群组',
        key: 'wdqz',
        url: '/pages-im/views/my-group/index'
    },
    {
        label: '黑名单',
        key: 'hmd',
    },
]
const guUrl = (url) => {
    uni.navigateTo({
        url: url,
    });
}
</script>

<template>
    <view class="new-friends">
        <view class="new-friends__item" v-for="(item, index) in list" :key="index" @tap="guUrl(item.url)">
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
    background: #fff;
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
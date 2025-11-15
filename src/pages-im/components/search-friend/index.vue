<script setup>
import { ref } from 'vue'
const onToSearch = () => {
    uni.navigateTo({
        url: '/pages-im/views/search-list/index'
    })
}
</script>

<template>
    <view class="search-friend" @tap="onToSearch">
        <!-- <text :class="['iconfont', 'icon-a-zu16', 'search-friend__icon']"></text> -->
        <u-icon name="search" style="color: #666;margin-right:18rpx" size="24"></u-icon>
        <text class="search-friend__text">搜索名称/账号</text>
    </view>
</template>

<style lang="scss" scoped>
.search-friend {
    padding: 24rpx 32rpx;
    display: flex;
    align-items: center;
    background: #F4F4F4;
    border-radius: 20rpx;
    .search-friend__icon {
        font-size: 34rpx;
         color: #666666;
    }
    .search-friend__text {
        // margin-left: 20rpx;
        font-size: 28rpx;
        color: #666666;
    }
}
</style>
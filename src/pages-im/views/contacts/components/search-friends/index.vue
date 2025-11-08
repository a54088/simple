<script setup></script>
<template>
    <view class="search-friends">
        <text :class="['iconfont', 'icon-a-zu16']"></text>
        <text>搜索名称/账号</text>
    </view>
</template>

<style lang="scss" scoped>
.iconfont {
    margin-right: 20rpx
}
.search-friends {
    width: 100%;
    background: #F4F4F4;
    border: 1rpx solid transparent;
    border-image: linear-gradient(97deg, #FF194A 4%, #16C5FF 95%) 1;
    backdrop-filter: blur(10rpx);
    border-radius: 20rpx;
    padding: 26rpx;
    display: flex;
    align-items: center;
    color: #666;
}
</style>
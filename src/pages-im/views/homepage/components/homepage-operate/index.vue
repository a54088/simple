<script setup>
import SafeBottom from '@/components/safe-bottom/index.vue'
import AddFriendPopup from './components/add-friend-popup/index.vue'
import { inject } from 'vue'

const vm = inject('homepageVM')

const onTapChat = () => {
    uni.navigateTo({
        url: '/pages-im/views/chat/index'
    })
}

const openAddFriendPopup = () => {
    vm.showAddFriendPopup = true
}
</script>

<template>
    <view class="homepage-operate__layout">
        <view class="homepage-operate__content">
            <view class="homepage-operate__add" @tap="openAddFriendPopup">
                <text class="iconfont icon-tianjiahaoyou-"></text>
            </view>
            <view class="homepage-operate__button" @tap="onTapChat">
                <text>聊天</text>
            </view>


        </view>
        <SafeBottom />
    </view>
    <AddFriendPopup />
</template>

<style lang="scss" scoped>
.homepage-operate__content {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 70rpx;
    .homepage-operate__button {
        margin-left: 30rpx;
        flex-grow: 1;
        border-radius: 169rpx;
        background: #181818;
        height: 112rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .homepage-operate__add {
        background: #181818;
        border-radius: 50%;
        width: 96rpx;
        height: 96rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-tianjiahaoyou- {
            color: #fff;
            font-size: 32rpx;
        }
    }
}

.homepage-operate__layout {
    width: 100vw;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 32rpx;
}
</style>
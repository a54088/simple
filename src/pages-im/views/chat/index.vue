<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'
import ChatOperate from '../../components/chat-operate/index.vue'
import ChatFooter from './components/chat-footer/index.vue'
import { ChatVM } from './vm/index.js'
import { onMounted, onUnmounted, provide } from 'vue'
let vm = new ChatVM()

provide('chatVM', vm)

onUnmounted(() => {
    vm = null
})

</script>
<template>
    <view class="chat__layout">
        <CustomNavbar bgColor="transparent" @rightClick="vm.showChatOperate = !vm.showChatOperate">
            <template v-slot:left>
                <view class="chat__navbar-left">
                    <text class="iconfont icon-paizhao-jinru"></text>
                    <text class="chat__navbar-left-text">94</text>
                </view>
            </template>
            <template v-slot:center>
                <view class="chat__navbar-center">
                    <text class="chat__navbar-center-text">不会捏蛋</text>
                </view>
            </template>
            <template v-slot:right>
                <view class="chat__navbar-right">
                    <u-avatar :src="src"></u-avatar>
                </view>

                <ChatOperate :show="vm.showChatOperate" :operateList="vm.chatOperateList"
                    @close="vm.showChatOperate = false">
                    <text class="iconfont icon-gengduo"></text>
                </ChatOperate>
            </template>
        </CustomNavbar>

        <view class="chat__content">
            <scroll-view :scroll-top="scrollTop" scroll-y="true" class="chat-list__scroll" @scrolltoupper="upper"
                @scrolltolower="lower" @scroll="scroll">
                <view class="chat-ai__layout">
                    <ChatItem />
                </view>
                <view class="chat-item__block__layout" v-for="(item, index) in chatList" :key="index">
                    <ChatItem />
                </view>
                <view class="chat-list__safe__layout"></view>
            </scroll-view>
        </view>
        <view>
            <ChatFooter />
        </view>
    </view>

</template>
<style lang="scss" scoped>
.chat__layout {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
}
.chat__content {
    flex-grow: 1;
    height: 100rpx;
    padding: 40rpx 32rpx;
}
.chat__navbar-center-text {
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 0em;
    color: #000000;
}

.chat__navbar-right {
    margin-right: 16rpx;
}

.chat__navbar-left {
    width: 149rpx;
    height: 74rpx;
    border-radius: 174rpx;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding-left: 24rpx;

    .chat__navbar-left-text {
        margin-left: 12rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #FFFFFF;
    }

    .icon-paizhao-jinru {
        font-size: 32rpx;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
        transform: rotate(180deg);
    }
}
</style>
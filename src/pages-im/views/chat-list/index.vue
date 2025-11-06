<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'
import ChatItem from './components/chat-item/index.vue'
import { inject } from 'vue'
import ChatOperate from '../../components/chat-operate/index.vue'

const imVM = inject('imVM')

const chatList = [
    1, 2, 3, 4, 5, 6, 1, 1, 11, , 1, 1, 1, 1, 1, 1, 1,
]

const chatOperateList = computed(() => imVM.chatOperateList)

const upper = (e) => {
    console.log('upper', e)
}

const scroll = (e) => {
    console.log('scroll', e)
}

const lower = (e) => {
    console.log('lower', e)
}

const onRightClick = () => {
    imVM.showChatOperate = !imVM.showChatOperate
}

const close = () => {
    imVM.showChatOperate = false
}

const open = () => {
    imVM.showChatOperate = true
}
</script>
<template>
    <view class="chat-list__layout">
        <CustomNavbar :autoBack="false" @rightClick="onRightClick">
            <template v-slot:left>
                <text class="custom-navbar__title">聊天</text>
            </template>
            <template v-slot:right>
                   <ChatOperate :operateList="chatOperateList" :show="imVM.showChatOperate" @close="close" @open="open">
                     <text class="iconfont icon-gengduo"></text>
                   </ChatOperate>
            </template>
        </CustomNavbar>

        <view class="chat-list__scroll__layout">
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

    </view>

</template>
<style lang="scss" scoped>
.chat-item__block__layout {
    margin-bottom: 34rpx;
}

.chat-list__layout {
    background-color: #fff;
    padding: 40rpx 0;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .chat-ai__layout {
        margin-bottom: 40rpx;
    }
}

.chat-list__scroll__layout {
    flex-grow: 1;
    height: 100rpx;
    padding-top: 40rpx;
}

.chat-list__safe__layout {
    height: calc(32rpx + 108rpx);
    ;
}

.chat-list__scroll {
    height: 100%;
}

.custom-navbar__layout {}

.custom-navbar__title {
    font-size: 40rpx;
    font-weight: 500;
    color: #000000;
}
</style>
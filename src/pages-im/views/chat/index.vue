<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'
import ChatOperate from '../../components/chat-operate/index.vue'
import ChatFooter from './components/chat-footer/index.vue'
import { ChatVM } from './vm/index.js'
import { inject, onUnmounted, provide } from 'vue'
import IMMsgList from './components/im-msg-list/index.vue'
import { onLoad } from '@dcloudio/uni-app'

const imVM = inject('imVM')
let vm = new ChatVM()

provide('chatVM', vm)

const conversation = computed(() => imVM.currentConversation)

onUnmounted(() => {
    vm = null
})
onLoad((options) => {
    const { conversation_id } = options
    if (conversation_id) {
        imVM.setCurrentConversation(+conversation_id)
    }
})

</script>
<template>
    <view class="chat__layout">
        <CustomNavbar bgColor="transparent" @rightClick="vm.showChatOperate = !vm.showChatOperate">
            <template v-slot:left>
                <view class="chat__navbar-left">
                    <text class="iconfont icon-fanhui-2"></text>
                    <text class="chat__navbar-left-text">94</text>
                </view>
            </template>
            <template v-slot:center>
                <view class="chat__navbar-center">
                    <text class="chat__navbar-center-text">{{ conversation.conversationName }}</text>
                </view>
            </template>
            <template v-slot:right>
                <view class="chat__navbar-right">
                    <u-avatar :src="''"></u-avatar>
                </view>

                <ChatOperate :show="vm.showChatOperate" :operateList="vm.chatOperateList"
                    @close="vm.showChatOperate = false">
                    <text class="iconfont icon-gengduo-2"></text>
                </ChatOperate>
            </template>
        </CustomNavbar>
        <view class="chat__content">
           <IMMsgList />
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

    .icon-fanhui-2{
        font-size: 32rpx;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.6);
    }
}
</style>
<script setup>
import { useCustomTabbarStore } from '@/store/index'
import { ref, inject } from 'vue'

const props = defineProps({
    isAi: {
        type: Boolean,
        default: false
    },
    chatInfo: {
        type: Object,
        default: () => ({})
    }
})

const imVM = inject('imVM')

const onToChatDetail = () => {
    uni.navigateTo({
        url: '/pages-im/views/chat/index?conversation_id=' + props.chatInfo.id
    })
}
</script>

<template>
    <view :class="['chat-item__layout', { 'chat-item__layout--ai': isAi }]" @tap="onToChatDetail">
        <u-avatar :src="''" size="96rpx"></u-avatar>
        <view class="chat-item__content">
            <view class="chat-item__content__title__layout">
                <text
                    class="chat-item__content__title text_ellipsis">
                {{ isAi ? '啊圈AI' : '用户' }}
                </text>
                <view class="chat-item__content__time">1分钟前</view>
            </view>
            <view class="chat-item__content__des text_ellipsis">
                {{ isAi ? '有什么问题尽管问' : chatInfo.lastMessageContent }}
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.chat-item__layout--ai {
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 12rpx;
        height: 50rpx;
        border-radius: 0 4rpx 4rpx 0;
        background: #16C5FF;
        z-index: 99;
    }
}

.chat-item__layout {
    width: 100%;
    display: flex;

    padding: 0 32rpx;


    .chat-item__content {
        width: 300rpx;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8rpx 0 8rpx 20rpx;

        .chat-item__content__time {
            font-size: 24rpx;
            color: #666666;
            flex-shrink: 0;
        }

        .chat-item__content__title__layout {
            display: flex;
            justify-content: space-between;
        }

        .chat-item__content__des {
            font-size: 28rpx;
            line-height: 28rpx;
            color: #999999;
        }

        .text_ellipsis {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
        }

        .chat-item__content__title {
            font-size: 32rpx;
            line-height: 32rpx;
            font-weight: 500;
            color: #000000;

        }
    }
}
</style>
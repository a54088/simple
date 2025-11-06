<script setup>
import { useCustomTabbarStore } from '@/store/index'
import { ref } from 'vue'

const props = defineProps({
    is: {
        type: String,
        default: ''
    }
})

const onToChatDetail = () => {
    uni.navigateTo({
        url: '/pages-im/views/chat/index'
    })
}
</script>

<template>
    <view class="chat-item__layout" @tap="onToChatDetail">
        <u-avatar :src="src" size="96rpx"></u-avatar>
        <view class="chat-item__content">
            <view class="chat-item__content__title__layout">
                <text
                    class="chat-item__content__title text_ellipsis">这是一段很长的文本内容，用来演示省略号组件的基本功能。当文本超出指定行数时，会自动显示省略号。</text>
                <view class="chat-item__content__time">1分钟前</view>
            </view>
            <view class="chat-item__content__des text_ellipsis">这是一段很长的文本内容，用来演示省略号组件的基本功能。当文本超出指定行数时，会自动显示省略号。</view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.chat-item__layout {
    width: 100%;
    display: flex;
    position: relative;
    padding: 0 32rpx;
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

    .chat-item__content {
        width: 300rpx;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8rpx 20rpx;

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
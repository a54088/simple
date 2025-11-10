<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'

const groupList = [
    {
        label: '创建群组',
        key: 'cjqz'
    },
    {
        label: '邀请进圈',
        key: 'yqjq'
    }
]

const settingList = [
    {
        label: '设置备注名',
        key: 'szbzm'
    },
    {
        label: '设置聊天背景',
        key: 'szltbj'
    },
    {
        label: '聊天前置',
        key: 'ltqz'
    },
    {
        label: '查找聊天记录',
        key: 'czltjl'
    }
]

const feedbackList = [
    {
        label: '拉黑',
        key: 'lh'
    },
    {
        label: '举报',
        key: 'jb'
    }
]
</script>

<template>
    <view class="chat-setting">
        <CustomNavbar title="聊天设置" />
        <view class="chat-setting__layout">
            <view class="chat-setting__block">
                <view class="chat-setting__item">
                    <u-avatar :src="''" size="78rpx"></u-avatar>
                    <text class="chat-setting__name">不会捏蛋</text>
                </view>
                <view class="chat-setting__item" v-for="item in groupList" :key="item.key">
                    <view class="chat-setting__item-icon">
                        <text class="iconfont icon-denglu_guaduanyuyin"></text>
                    </view>
                    <text class="chat-setting__item-label">{{ item.label }}</text>
                </view>
            </view>

             <view class="chat-setting__block">
                <view class="chat-setting__item chat-setting__item--with-icon" v-for="item in settingList" :key="item.key">
                    
                    <text class="chat-setting__item-label">{{ item.label }}</text>
                    <text class="iconfont icon-paizhao-jinru" />
                </view>
             </view>

             <view class="chat-setting__block">
                <view class="chat-setting__item chat-setting__item--with-icon" v-for="item in feedbackList" :key="item.key">
                    
                    <text class="chat-setting__item-label">{{ item.label }}</text>
                    <text class="iconfont icon-paizhao-jinru" />
                </view>
             </view>
        </view>
    </view>


</template>
<style lang="scss" scoped>
.icon-paizhao-jinru {
    font-size: 24rpx;
}
.chat-setting {
    min-height: 100vh;
    background-color: #F8F8F8;
}
.chat-setting__item--with-icon {
    display: flex;
    justify-content: space-between;
}
.chat-setting__item {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;

    .chat-setting__name {
        margin-left: 20rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #000000;
    }

    &:last-of-type {
        margin-bottom: 0;
    }

    .chat-setting__item-icon {
        width: 78rpx;
        height: 78rpx;
        border: 1px solid #999999;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;

        .icon-denglu_guaduanyuyin {
            color: #D8D8D8;
            font-size: 28rpx;
            transform: rotate(45deg);
        }
    }
}

.chat-setting__layout {
    padding: 32rpx;

}

.chat-setting__block {
    padding: 32rpx;
    border-radius: 20rpx;
    background-color: #fff;
    margin-bottom: 20rpx;
    &:last-of-type {
        margin-bottom: 0;
    }
}
</style>
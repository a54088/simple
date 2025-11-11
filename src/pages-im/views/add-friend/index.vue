<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'
import SearchFriend from '@/pages-im/components/search-friend/index.vue'


const newFriendList = [
    {
        title: '你可能认识',
        list: [
            {
                name: '张三',
                des: '最近三天有新消息'
            },
            {
                name: '李四',
                des: '最近三天有新消息'
            }
        ]
    },
]

const operateList = [
    {
        name: '邀请好友',
        icon: 'icon-quanzi'
    },
    {
        name: '附近推荐',
        icon: 'icon-quanzi'
    }
]
</script>

<template>
    <view class="new-friend__layout">
        <CustomNavbar title="添加好友" bgColor="transparent" />
        <view class="new-friend__content">
            <SearchFriend />
            <view class="operate__layout">
                <view class="operate__item" v-for="operate in operateList" :key="operate.name">
                    <view class="operate__item__left">
                        <text :class="['iconfont', operate.icon, 'operate__item__icon']"></text>
                        <text class="operate__item__name">{{ operate.name }}</text>
                    </view>
                    <text class="iconfont icon-paizhao-jinru"></text>
                </view>
            </view>
            <view class="new-friend__list">
                <view class="new-friend__item" v-for="item in newFriendList" :key="item.title">
                    <view class="new-friend__item__title">{{ item.title }}</view>

                    <view class="new-friend__item__content" v-for="item in item.list" :key="item.name">
                        <view class="new-friend__item__left">
                            <u-avatar src="" size="88rpx" />
                            <view class="new-friend__item__info">
                                <view class="new-friend__item__name">{{ item.name }}</view>
                                <view class="new-friend__item__des">{{ item.des }}</view>
                            </view>
                        </view>

                        <view class="new-friend__item__operate">
                            查看
                        </view>
                    </view>
                </view>

            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.icon-paizhao-jinru {
    font-size: 14rpx;
}

.new-friend__item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 42rpx;

    &:last-of-type {
        margin-bottom: 0;
    }

    .new-friend__item__operate {
        font-size: 24rpx;
        color: #F6F6F6;
        padding: 12rpx 34rpx;
        border-radius: 29rpx;
        background: #FF194A;
    }

    .new-friend__item__left {
        display: flex;
        align-items: center;

        .new-friend__item__info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 20rpx;

            .new-friend__item__des {
                margin-top: 4rpx;
                font-size: 28rpx;
                line-height: 28rpx;
                color: #999999;
            }

            .new-friend__item__name {
                font-size: 32rpx;
                line-height: 32rpx;
                font-weight: 500;
                color: #000000;
            }
        }
    }
}

.new-friend__item__title {
    font-size: 24rpx;
    color: #6E6E70;
    margin-bottom: 38rpx;
}

.new-friend__content {
    padding: 48rpx 32rpx;

    .operate__layout {
        margin-top: 40rpx;
        border-radius: 20rpx;
        padding: 24rpx;
        background: #F4F4F4;

        .operate__item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 58rpx;
            &:last-of-type {
                margin-bottom: 0;
            }
            .operate__item__left {
                display: flex;
                font-size: 32rpx;
                color: #000000;
                .operate__item__icon {
                    font-size: 44rpx;
                }
                .operate__item__name {
                    margin-left: 30rpx;
                }
            }
        }
    }

    .new-friend__list {
        margin-top: 40rpx;

        .new-friend__item {
            margin-bottom: 44rpx;

            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }
}
</style>

<script setup>

const dailyUpdatesList = [
    {
        title: '28',
        des: '9月'
    },
     {
        title: '28',
        des: '9月'
    },
     {
        title: '28',
        des: '9月'
    },
     {
        title: '28',
        des: '9月'
    }
]
</script>

<template>
    <view class="daily-updates__layout">
        <view class="daily-updates__header">
            <text class="daily-updates__header__title">日常动态</text>
            <text class="iconfont iconfont--init icon-paizhao-jinru"> </text>
        </view>

        <view class="daily-updates__content">
            <view class="daily-updates__list">
                <view :class="['daily-updates__item']" :style="{right: index * 16 + 'rpx', zIndex: dailyUpdatesList.length }" v-for="(item, index) in dailyUpdatesList" :key="item.title">
                    <text class="daily-updates__item__title">
                        {{ item.title }}
                    </text>
                    <text class="daily-updates__item__des">
                        {{ item.des }}
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.daily-updates__layout {
    border-radius: 20rpx;
    background-color: #fff;
    padding: 32rpx;

    .iconfont--init {
        font-size: 24rpx;
    }

    .daily-updates__list {
        position: relative;
        display: flex;
        .daily-updates__item--active {
            right: 16rpx;
        }
        .daily-updates__item {
            flex-shrink: 0;
            position: relative;
            
            width: 172rpx;
            height: 172rpx;
            border-radius: 20rpx;
            background: rgba(0, 0, 0, 1);
            border: 2rpx solid #FFFFFF;
            display: flex;
            flex-direction: column;
            padding: 20rpx;

            .daily-updates__item__des {
                font-size: 24rpx;
                font-weight: 500;
                color: #FFFFFF;
            }

            .daily-updates__item__title {
                font-size: 32rpx;
                font-weight: 500;
                color: #FFFFFF;
            }
        }
    }

    .daily-updates__content {
        margin-top: 20rpx;
    }

    .daily-updates__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .daily-updates__header__title {
            font-size: 32rpx;
            line-height: 32rpx;
            font-weight: 500;
            color: #000000;
        }
    }
}
</style>
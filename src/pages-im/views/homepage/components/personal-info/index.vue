<script setup>

const tabs = [
    {
        label: 'IP:杭州',
        key: 'ip'
    },
    {
        label: '上班族',
        key: 'sbz'
    },
    {
        label: '闸弄口圈',
        key: 'zlkq'
    },
    {
        label: 'IP:杭州',
        key: 'ip'
    },
    {
        label: '上班族',
        key: 'sbz'
    },
    {
        label: '闸弄口圈',
        key: 'zlkq'
    }
]
</script>

<template>
    <view class="personal-info__layout">
        <view class="personal-info__header">
            <view class="personal-info__header__left">
                <u-avatar size="96rpx" :src="''" class="avatar" />
                <view class="personal-info__header__left__info">
                    <text class="personal-info__header__left__info__name">张三</text>
                    <text class="personal-info__header__left__info__id">13800000000</text>
                </view>
            </view>

            <view class="personal-info__header__right"><text>关注</text></view>
        </view>

        <view class="personal-info__remark">
            <text>欢迎来到我的睡觉圈</text>
        </view>

        <view class="personal-info__tabs__layout">
            <view v-for="(item, index) in tabs" :key="index" class="personal-info__tabs__item">
                <text>{{ item.label }}</text>
            </view>
        </view>

        <view class="personal-info__line"></view>


        <u-row customStyle="margin-top: 32rpx">
            <u-col span="4">
                <view class="personal-info__item">
                    <view class="personal-info__item__number">34</view>
                    <view class="personal-info__item__label">TA关注的</view>
                </view>
            </u-col>
            <u-col span="4">
                <view class="personal-info__item">
                    <view class="personal-info__item__number">0</view>
                    <view class="personal-info__item__label">关注TA的</view>
                </view>
            </u-col>
            <u-col span="4">
                <view class="personal-info__item">
                    <view class="personal-info__item__number">34</view>
                    <view class="personal-info__item__label">TA的喜欢</view>
                </view>
            </u-col>
        </u-row>

    </view>
</template>

<style lang="scss" scoped>
.personal-info__item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .personal-info__item__label {
        margin-top: 18rpx;
        font-size: 24rpx;
        line-height: 24rpx;
        color: #999999;
    }

    .personal-info__item__number {
        font-size: 32rpx;
        font-weight: 600;
        line-height: 32rpx;
        color: #000000;
    }
}

.personal-info__layout {
    border-radius: 20rpx;
    background: #FFFFFF;
    backdrop-filter: blur(10rpx);
    padding: 32rpx;

    .personal-info__line {
        margin-top: 32rpx;
        border-bottom: 2rpx dashed #DADADA;
    }

    .personal-info__tabs__layout {
        margin-top: 20rpx;
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;

        .personal-info__tabs__item {
            font-size: 24rpx;
            color: #F6F6F6;
            padding: 12rpx 22rpx;
            border-radius: 30rpx;
            background: #FF194A;
        }
    }

    .personal-info__remark {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #999999;
    }

    .personal-info__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .personal-info__header__right {
            padding: 17rpx 24rpx;
            border-radius: 12rpx;
            background: #FF194A;
            font-size: 24rpx;
            font-weight: 500;
            line-height: 24rpx;
            color: #FFFFFF;
        }

        .personal-info__header__left {
            display: flex;
            align-items: center;

            .personal-info__header__left__info {
                margin-left: 20rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .personal-info__header__left__info__name {
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #000000;
                }

                .personal-info__header__left__info__id {
                    font-size: 24rpx;
                    color: #999999;
                }
            }
        }
    }
}
</style>
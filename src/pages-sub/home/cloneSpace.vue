<template>
    <view class="clone-space-box">
        <CustomNavbar class="clone-space-navbar" bgColor="#F7F7F7">
            <template #right>
                <image class="icon-avatar" src="/static/map/avatar5.webp" />
            </template>
        </CustomNavbar>
        <view class="clone-space-content">
            <view class="content-module1 flex-between">
                <view class="flex-center">
                    <i class="iconfont icon-rili"></i>
                    <view>2025-11-01</view>
                </view>
                <view>查找</view>
            </view>
            <view class="content-module2">
                <view class="content-module2-title">会话处理</view>
                <view class="content-module2-content flex-start">
                    <view class="left flex-center">
                        <i class="iconfont icon-AIdianhua"></i>
                    </view>
                    <view class="content-box">
                        <view>总计处理会话消息22次</view>
                        <view>9人正在热聊中</view>
                        <view class="flex-between">
                            <AvatarStacking 
                                :avatarList="avatarList" 
                                :translate="30" 
                                :avatarSize="24"
                                :maxCount="3"
                                direction="right"
                            />
                            <view class="content-to flex-center">
                                <i class="iconfont icon-jinru"></i>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="content-module3">
                <view class="title">发现</view>
                <view>
                    <u-swiper
                        :list="list3"
                        previousMargin="0"
                        nextMargin="100"
                        circular
                        :autoplay="true"
                        radius="10"
                        height="500rpx"
                    ></u-swiper>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
// components
import CustomNavbar from '@/components/custom-navbar/index.vue';
import AvatarStacking from '@/components/avatar-stacking/index.vue';

const avatarList = ref([
    '/static/map/avatar1.webp',
    '/static/map/avatar2.webp',
    '/static/map/avatar3.webp',
    '/static/map/avatar3.webp',
    '/static/map/avatar3.webp',
]);

const list3 = ref([
    "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
    "https://images.pexels.com/photos/2451038/pexels-photo-2451038.jpeg",
    "https://images.pexels.com/photos/2451038/pexels-photo-2451038.jpeg",
    "https://images.pexels.com/photos/2451038/pexels-photo-2451038.jpeg",
]);
</script>

<style lang="scss" scoped>
.clone-space-box {
    background: #F7F7F7;
    min-height: 100vh;
}

.clone-space-navbar {
    padding: 10rpx 0;

    .icon-avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
    }
}

.clone-space-content {
    padding: 32rpx;

    .content-module1 {
        background: #000000;
        border-radius: 150px;
        color: #fff;
        padding: 24rpx 34rpx;
        margin-bottom: 50rpx;

        >view {
            gap: 14rpx;
            font-size: 24rpx;
            font-weight: 500;

            .iconfont {
                font-size: 32rpx;
            }
        }
    }

    .content-module2 {
        margin-bottom: 50rpx;
        .content-module2-title {
            font-size: 36rpx;
            font-weight: 500;
            color: #3D3D3D;
            margin-bottom: 20rpx;
        }

        .content-module2-content {
            background: #fff;
            border-radius: 20rpx;
            padding: 30rpx;
            gap: 20rpx;

            .left {
                height: 180rpx;
                padding: 20rpx;
                background: #F7F7F7;
                border-radius: 129px;
                .iconfont {
                    font-size: 40rpx;
                }
            }
            .content-box {
                flex: 1;
                >view:nth-child(1) {
                    color: #000000;
                    font-size: 28rpx;
                    font-weight: 500;
                    margin-bottom: 10rpx;
                }
                >view:nth-child(2) {
                    border: 1px solid #000000;
                    border-radius: 200rpx;
                    padding: 5rpx 20rpx;
                    padding-left: 40rpx;
                    margin-bottom: 20rpx;
                    color: #3D3D3D;
                    font-size: 24rpx;
                    width: auto;
                    display: inline-block;
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        left: 20rpx;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 8rpx;
                        height: 8rpx;
                        background-color: #73FF86;
                        border-radius: 50%;
                    }
                } 
                >view:nth-child(3) {
                    color: #000000;
                    font-size: 28rpx;
                    font-weight: 500;
                    margin-bottom: 10rpx;
                    .content-to {
                        width: 64rpx;
                        height: 64rpx;
                        border-radius: 50%;
                        background: #F0EFF2;
                        .iconfont {
                            font-size: 36rpx;
                        }
                    }
                }
            }
        }
    }

    .content-module3 {
        .title {
            margin-bottom: 20rpx;
        }

    }
}
</style>
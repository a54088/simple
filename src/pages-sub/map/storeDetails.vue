<template>
    <view class="store-details">
        <!-- 头部导航栏 -->
        <view class="header-navbar" :style="{ paddingTop: statusBarHeightRpx + 20 + 'rpx', top: '0' }">
            <view class="back-btn" @tap="handleBack">
                <image class="back-icon" src="/static/images/common/back.png" mode="aspectFit"></image>
            </view>
        </view>

        <u-swiper 
            :list="list1" 
            height="500rpx"
            :radius="0"
            :indicator="true"
            indicatorMode="line"
            @change="change" 
            @click="click"
        >
            <template #indicator>
                <view class="indicator">
                    <view
                        class="indicator__dot"
                        v-for="(item, index) in list1"
                        :key="index"
                        :class="[index === current && 'indicator__dot--active']"
                    >
                    </view>
                </view>
            </template>
        </u-swiper>
        
        <view class="details-content">
            <view class="details-content-top">
                <view class="flex-between">
                    <text>花蜜里·音乐餐吧</text>
                    <text class="score">4.8分</text>
                </view>
                <view class="flex-start">
                    <text>半年售1000+</text>
                    <text>年轻人聚会热点</text>
                </view>
                <view class="flex-start">
                    <view class="status">营业中</view>
                    <view class="flex time">
                        <text>10:30-13:30</text>
                        <text>16:30-21:00</text>
                    </view>
                </view>
            </view>
            <view class="details-content-nav flex-between">
                <view class="details-content-nav-left">
                    <view>上城区天成路80号</view>
                    <view>距您2.3km｜步行30分钟</view>
                </view>
                <view class="details-content-nav-right">
                    <i class="iconfont icon-daohang"></i>
                </view>
            </view>
            <view class="details-content-desc flex-between">
                <view class="details-content-desc-left flex-column">
                    <view>180人去过</view>
                    <view>20位附近人重复去过</view>
                    <view>
                        <AvatarStack :avatarList="avatarList" :maxCount="4" :translate="30" direction="right" />
                    </view>
                </view>
                <view class="details-content-desc-right">
                    <image src="https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg" mode="aspectFill"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue';
// components
import AvatarStack from '@/components/avatar-stacking/index.vue'

// 获取系统信息，计算状态栏高度（rpx）
const systemInfo = uni.getSystemInfoSync();
const statusBarHeightPx = systemInfo.statusBarHeight || 0;
const statusBarHeightRpx = (statusBarHeightPx / systemInfo.windowWidth) * 750;

const list1 = ref([
    "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
    "https://images.pexels.com/photos/2451038/pexels-photo-2451038.jpeg",
]);

const avatarList = ref([
    "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
    "https://images.pexels.com/photos/2451038/pexels-photo-2451038.jpeg",
    "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg",
    "https://images.pexels.com/photos/2451038/pexels-photo-2451038.jpeg",
]);

const current = ref(0);

const change = (e) => {
    current.value = e.current || 0;
    console.log('swiper changed to index:', current.value);
}

const click = (e) => {
    console.log('swiper clicked:', e);
}

const handleBack = () => {
    uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.store-details {
    position: relative;

    .header-navbar {
        width: 750rpx;
        padding: 0 32rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 100;

        .back-btn {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            height: 60rpx;
            width: 60rpx;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 50%;

            .back-icon {
                width: 32rpx;
                height: 32rpx;
                margin-left: 6rpx;
            }
        }
    }

    .indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12rpx;
        padding: 20rpx 0;
        
        .indicator__dot {
            width: 8rpx;
            height: 8rpx;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
            
            &--active {
                width: 20rpx;
                height: 8rpx;
                border-radius: 4rpx;
                background-color: #fff;
            }
        }
    }

    .details-content {
        position: relative;
        border-radius: 20rpx 20rpx 0 0;
        margin-top: -20rpx;
        background-color: #fff;
        padding: 40rpx 32rpx;
        .details-content-top {
            border-bottom: 1rpx solid #EDEDED;
            padding-bottom: 20rpx;
            >view:nth-child(1) {
                font-size: 40rpx;
                color: #000;
                font-weight: 500;
                margin-bottom: 20rpx;

                .score {
                    color: #FCB40B;
                    font-size: 28rpx;
                    font-weight: 400;
                }
            }
            >view:nth-child(2) {
                font-size: 24rpx;
                color: #999;
                margin-bottom: 20rpx;

                >text {
                    padding: 2rpx 6rpx;
                    border-radius: 6px;
                    background: rgba(0, 0, 0, 0.04);
                    margin-right: 26rpx;
                }
            }
            >view:nth-child(3) {
                font-size: 28rpx;
                color: #000;
                .status {
                    font-weight: 500;
                    color: #52C41A;
                    margin-right: 10rpx;
                }
                .time {
                    gap: 10rpx;
                    >text {
                        margin-right: 10rpx;
                    }
                }
            }
        }

        .details-content-nav {
            padding-top: 20rpx;
            margin-bottom: 50rpx;

            .details-content-nav-left {
                font-size: 28rpx;
                color: #000000;
                >view:nth-child(2) {
                    padding-top: 10rpx;
                    color: #999999;
                }
            }
            .details-content-nav-right {
                padding-right: 20rpx;
                .iconfont {
                    font-size: 38rpx;
                }
            }
        }

        .details-content-desc {
            box-shadow: 0px 4px 10px 0px rgba(206, 206, 206, 0.3);
            border-radius: 20px;
            .details-content-desc-left {
                padding: 20rpx;
                font-size: 32rpx;
                font-weight: 500;
                height: 100%;
                >view:nth-child(2) {
                    padding: 10rpx 0 17rpx;
                }
            }
            .details-content-desc-right {
                width: 222rpx;
                height: 222rpx;
                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 20px;
                }
            }
        }
    }
}
</style>
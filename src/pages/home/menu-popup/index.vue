<template>
    <u-popup 
        :show="vm.showMenuPopup" 
        mode="left" 
        duration="200" 
        :overlayStyle="{
            'background': 'rgba(0, 0, 0, 0.5)',
            'backdrop-filter': 'blur(5px)'
        }"
        overlayOpacity="0.6"
        bgColor="#F7F7F7"
        :customStyle="{padding: '40rpx 32rpx 16rpx'}"
        width="550rpx"
        @close="close"
    >
        <view class="menu-popup__layout">
            <!-- 个人信息 -->
            <view class="layout-header">
                <view class="layout-header-left">
                    <u-avatar :size="34" src="/src/static/map/avatar3.webp"></u-avatar>
                    <text class="text-ellipsis">人生无常大肠包小肠1234</text>
                </view>
                <view class="layout-header-right">
                    <view></view>
                    <i class="iconfont icon-paizhao-jinru"></i>
                </view>
            </view>
            <!-- 分身对话 -->
            <view class="layout-module1 flex">
                <view class="layout-module1-left">
                    <image src="/src/static/map/addFriendsImg.png" mode="widthFix"></image>
                </view>
                <view class="layout-module1-right">
                    <view class="layout-module1-right-top">
                        近一周有50人与你分身对话
                    </view>
                    <view class="layout-module1-right-bottom flex-between">
                        <AvatarStacking :avatarList="avatarList" :avatarSize="20" :translate="20" />
                        <view class="layout-module1-right-bottom-right flex-center">
                            <text>立即查看</text>
                            <i class="iconfont icon-paizhao-jinru"></i>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 消息通知 -->
            <view></view>

            <!-- 邀请码 -->
            <view></view>
        </view>
    </u-popup>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
// components
import AvatarStacking from '@/components/avatar-stacking/index.vue';
// img
import icon1 from '@/static/map/avatar5.webp';
import icon2 from '@/static/map/avatar1.webp';
import icon3 from '@/static/map/avatar4.webp';

const vm = inject("homeVM");

const avatarList = ref([icon1, icon2, icon3]);

const close = () => {
    vm.toggleMenuPopup()
}
</script>

<style lang="scss" scoped>
.menu-popup__layout {
    color: #000;
    .layout-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14rpx 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .layout-header-left {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 20rpx;
            font-size: 28rpx;
            font-weight: 500;
            text {
                width: 280rpx;
            }
        }
        .layout-header-right {
            .icon-paizhao-jinru {
                font-size: 32rpx;
            }
        }
    }

    .layout-module1 {
        margin-top: 30rpx;
        padding: 30rpx 20rpx 24rpx;
        border: 2px solid;
        border-image: linear-gradient(90deg, #E6F069 0%, #C688D5 50%, #7DF48C 100%) 2;
        background: #000000;
        border-radius: 20px;
        color: #fff;

        .layout-module1-left {
            image {
                width: 80rpx;
            }
        }
        .layout-module1-right {
            .layout-module1-right-top {
                font-size: 28rpx;
                font-weight: 500;
                border-bottom: 1px solid #353535;
                padding-bottom: 20rpx;
            }
            .layout-module1-right-bottom {
                padding-top: 20rpx;
                .layout-module1-right-bottom-right {
                    font-size: 24rpx;
                    color: #EDEDED;
                    gap: 10rpx;
                    .icon-paizhao-jinru {
                        font-size: 24rpx;
                    }
                }
            }
        }
    }
}
</style>
<script setup>
import { useCustomTabbarStore } from "@/store/index.js";
import { CustomTabbarVM } from "./vm/index";

let vm = new CustomTabbarVM();
provide("loginVM", vm);

onUnmounted(() => {
    vm = null;
});
const tabList = computed(() => vm.tabList);
const currentIndex = computed(() => vm.currentTabIndex);
const blockLeft = computed(() => {
    if (!currentIndex.value) {
        return '10rpx';
    }
    return `calc(${currentIndex.value * 157}rpx + 10rpx)`;
});

const setCurrentTabIndex = (index) => {
    vm.setCurrentTabIndex(index);
}
</script>

<template>
    <view class="custom-tabbar__layout">
        <view class="custom-tabbar__content">
            <view class="custom-tabbar__logo">
                <image src="@/static/images/common/logo.png" class="custom-tabbar__logo-image" />
            </view>
            <view class="custom-tabbar__list">
                <view class="custom-tabbar__item" v-for="(item, index) in tabList" :key="index"
                    @tap="setCurrentTabIndex(index)">
                    <view>
                        <text :class="['iconfont', item.icon]"></text>
                    </view>
                    <view class="custom-tabbar__item-label">{{ item.label }}</view>
                </view>

                <view class="custom-tabber__block" :style="{ left: blockLeft }"></view>
            </view>
        </view>
        <u-safe-bottom></u-safe-bottom>
    </view>
</template>
<style lang="scss" scoped>
.custom-tabbar__layout {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    .custom-tabbar__content {
        padding: 32rpx;
        display: flex;
    }

    .custom-tabbar__list {
        padding: 0 28rpx;
        display: flex;
        margin-left: 30rpx;
        width: 100%;
        border-radius: 174rpx;
        background: rgba(0, 0, 0, 0.7);
        justify-content: space-around;
        align-items: center;
        position: relative;

        .custom-tabber__block {
            width: 188rpx;
            height: 108rpx;
            position: absolute;
            border-radius: 168rpx;
            background: #3A3A3A;
            transition: all 0.3s ease-in-out;
        }

        .custom-tabbar__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 1;

            .custom-tabbar__item-label {
                margin-top: 10rpx;
                font-size: 24rpx;
                color: #FFFFFF;
            }
        }
    }

    .custom-tabbar__logo {
        flex-shrink: 0;
        width: 128rpx;
        height: 128rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.69);
        box-sizing: border-box;
       
        border-image: linear-gradient(134deg, #FFFFFF 3%, rgba(255, 255, 255, 0) 52%, #FFFFFF 92%) 1;
    }

    .custom-tabbar__logo-image {
        width: 79rpx;
        height: 47rpx;
    }
}
</style>
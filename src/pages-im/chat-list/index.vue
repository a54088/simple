<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'

const upper = (e) => {
    console.log('upper', e)
}

const scroll = (e) => {
    console.log('scroll', e)
}

const lower = (e) => {
    console.log('lower', e)
}
</script>
<template>
    <view class="chat-list__layout">
        <CustomNavbar :autoBack="false">
            <template v-slot:left>
                <text class="custom-navbar__title">聊天</text>
            </template>
            <template v-slot:right>
                <text class="iconfont icon-gengduo"></text>
            </template>
        </CustomNavbar>


        <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
					@scrolltolower="lower" @scroll="scroll">
					<view id="demo1" class="scroll-view-item uni-bg-red">A</view>
					<view id="demo2" class="scroll-view-item uni-bg-green">B</view>
					<view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
		</scroll-view>
    </view>

</template>
<style lang="scss" scoped>
.chat-list__layout {
    background-color: #fff;
    padding: 40rpx 32rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.custom-navbar__layout {}

.custom-navbar__title {
    font-size: 40rpx;
    font-weight: 500;
    color: #000000;
}
</style>
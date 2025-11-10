<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'
import PersonalInfo from './components/personal-info/index.vue'
import DailyUpdates from './components/daily-updates/index.vue'
import HomepageOperate from './components/homepage-operate/index.vue'
import {onUnmounted} from 'vue'
import { HomepageVM } from './vm/index.js'

let vm = new HomepageVM()
provide('homepageVM', vm)
onUnmounted(() => {
    vm = ''
})
</script>

<template>
    <view class="homepage__layout">
        <CustomNavbar bgColor="transparent" />

        <view class="homepage__content">
            <view  class="homepage__block">
                 <PersonalInfo />
            </view>
            <view  class="homepage__block">
                 <DailyUpdates />
            </view>
        </view>

        <HomepageOperate />
    </view>
</template>

<style lang="scss" scoped>
.homepage__content {
    
    padding: 32rpx;
    .homepage__block {
        margin-bottom: 20rpx;
        &:last-of-type {
            margin-bottom: 0;
        }
    }
}
.homepage__layout {
    min-height: 100vh;
    background-color: #f8f8f8;
}
</style>
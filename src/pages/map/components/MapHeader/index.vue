<template>
   <view class="header">
      <view class="title">{{ title }}</view>
      <view class="stats">
         <text class="stats_item">活动 {{ activityCount }}</text>
         <text class="stats_item">圈友 {{ memberCount }}</text>
      </view>
   </view>
</template>

<script setup>
defineProps({
   title: {
      type: String,
      default: '闸弄口街道'
   },
   activityCount: {
      type: Number,
      default: 10
   },
   memberCount: {
      type: Number,
      default: 29919
   }
})
</script>

<style lang="scss" scoped>
.header {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   padding: 40rpx 24rpx 24rpx;
   background: linear-gradient(180deg, #181818 0%, rgba(24, 24, 24, 0) 100%);
   width: 100%;
   height: 329rpx;
   z-index: 10;
   box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

   .title {
      font-size: 50rpx;
      font-weight: 600;
      color: #fff;
      margin-bottom: 16rpx;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
   }

   .stats {
      display: flex;
      gap: 20rpx;

      &_item {
         font-size: 32rpx;
         color: #fff;
      }
   }
}
</style>
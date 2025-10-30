<template>
   <view class="map-logo-menu">
      <!-- 固定展开的菜单容器 -->
      <view class="logo-menu-container">
         <view class="logo-item" v-for="(item, index) in logoItems" :key="index" @click="handleLogoClick(item)">
            <image :src="item.logo" class="logo-img" mode="widthFix" :alt="item.name"></image>
         </view>
      </view>
   </view>
</template>

<script setup>
// 接收logo配置项
const props = defineProps({
   logoItems: {
      type: Array,
      default: () => [
         {
            name: '招商信息',
            logo: '/static/map/side-icon1.webp', // 招商信息logo
            action: 'business'
         },
         {
            name: '小时自助',
            logo: '/static/map/side-icon2.webp', // 小时自助logo
            action: 'selfService'
         },
         {
            name: '小时自助',
            logo: '/static/map/side-icon3.webp', // 小时自助logo
            action: 'selfService'
         }
      ]
   }
});

// 触发点击事件
const emit = defineEmits(['logo-click']);
const handleLogoClick = (item) => {
   emit('logo-click', item);
};
</script>

<style scoped>
.map-logo-menu {
   position: absolute;
   top: 40rpx;
   right: 24rpx;
   z-index: 20;
   /* 确保在其他元素之上 */
}

/* 菜单容器 - 默认展开 */
.logo-menu-container {
   padding: 15rpx;
   display: flex;
   flex-direction: column;
}

/* Logo项样式 */
.logo-item {
   width: 96rpx;
   height: 96rpx;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 8rpx;
   padding: 5rpx;
   border-radius: 25rpx;
   background: rgba(0, 0, 0, 0.5);
   margin-bottom: 30rpx;
}

/* 点击反馈 */
.logo-item:active {
   background-color: #f0f0f0;
}

/* Logo图片样式 */
.logo-img {
   width: 48rpx;
   height: 48rpx;
   object-fit: contain;
}
</style>
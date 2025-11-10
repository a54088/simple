<template>
   <cover-view class="map-logo-menu">
      <!-- 固定展开的菜单容器 -->
      <cover-view class="logo-menu-container">
         <cover-image src="@/static/map/global.webp" class="logo-global" mode="widthFix"></cover-image>
         <cover-view class="logo-item" v-for="(item, index) in logoItems" :key="index" @click="handleLogoClick(item)">
            <cover-image :src="item.logo" class="logo-img" mode="widthFix" :alt="item.name"></cover-image>
         </cover-view>
      </cover-view>
   </cover-view>
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
   top: 60rpx;
   right: 24rpx;
   z-index: 1000;
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
   box-sizing: border-box;
   border-radius: 25rpx;
   background: rgba(0, 0, 0, 0.5);
   margin-bottom: 30rpx;
}

/* 点击反馈 */
.logo-item:active {
   background-color: #f0f0f0;
}

.logo-global {
   width: 96rpx;
   height: 96rpx;
   margin-bottom: 30rpx;
}

/* Logo图片样式 */
.logo-img {
   width: 48rpx;
   height: 48rpx;
   object-fit: contain;
}
</style>
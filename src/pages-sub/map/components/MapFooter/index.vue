<template>
   <cover-view class="bottom_nav">
      <cover-view class="nav_container">
         <cover-view class="nav_container_logo">
            <cover-image src="/static/map/logo.webp" class="logo" mode="widthFix"></cover-image>
         </cover-view>
         <!-- 绑定点击事件和动态active类 -->
         <cover-view class="nav_container_item" :class="{ active: currentActive === index }"
            v-for="(item, index) in navItems" :key="index" @click="handleItemClick(index)">
            <cover-view class="icon_wrapper">
               <cover-image :src="item.icon" class="nav_icon" mode="widthFix"></cover-image>
            </cover-view>
            <cover-view class="nav_label" v-if="item.label">{{ item.label }}</cover-view>
         </cover-view>
      </cover-view>
   </cover-view>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义接收的props
const props = defineProps({
   navItems: {
      type: Array,
      default: () => [
         { icon: '/static/map/toolbar-chat.webp', label: '聊天' },
         { icon: '/static/map/toolbar-eye.webp', label: '圈子' },
         { icon: '/static/map/toolbar-contacts.webp', label: '通讯录' }
      ]
   },
   // 默认选中项索引，支持通过prop传入
   defaultActive: {
      type: Number,
      default: 0 // 默认选中第一个
   }
})

// 选中状态管理
const currentActive = ref(props.defaultActive)

// 监听默认值变化
watch(() => props.defaultActive, (newVal) => {
   currentActive.value = newVal
})

// 点击切换选中项
const handleItemClick = (index) => {
   currentActive.value = index
}
</script>

<style lang="scss" scoped>
.bottom_nav {
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 1000;
   padding-bottom: 33rpx;
   box-sizing: border-box;

   .nav_container {
      height: 128rpx;
      background: rgba(0, 0, 0, 0.69);
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0px 36rpx;
      border-radius: 174rpx;
      backdrop-filter: blur(10px);
      padding: 12rpx;

      .nav_container_logo {
         width: 104rpx;
         height: 104rpx;
         background: #000;
         border-radius: 100%;
         display: flex;
         justify-content: center;
         align-items: center;

         .logo {
            width: 79rpx;
            height: 47rpx;
         }
      }

      &_item {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         padding: 10rpx;
         box-sizing: border-box;
         width: 25%;

         .icon_wrapper {
            width: 48rpx;
            height: 48rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 8rpx;
            color: #fff;
            padding: 0rpx 5rpx;

            .nav_icon {
               width: 44rpx;
               height: 38rpx;
            }
         }
      }

      .nav_label {
         color: #fff !important;
         font-size: 24rpx;
      }

      // 选中样式
      .active {
         background: #3A3A3A;
         border-radius: 168px;
      }
   }
}
</style>
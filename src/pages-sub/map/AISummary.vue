<template>
   <CustomNavBar title="" bgColor="#f5f5f5 !important">
      <template #right>
         <image src="/static/map/avatar1.webp" mode="cover" class="head-avatar"></image>
      </template>
   </CustomNavBar>
   <view class="container">
      <!-- 日期搜索栏 -->
      <view class="date-search-bar">
         <view class="date-box">
            <u-icon name="calendar-fill" color="#fff" size="30"></u-icon>
            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
               <view class="uni-input">{{ date }}</view>
            </picker>
         </view>
         <view class="search-btn">查找</view>
      </view>

      <!-- 会话处理区 -->
      <view class="section">
         <view class="section-title">会话处理</view>
         <view class="session-card">
            <view class="phone-icon">
               <image src="/static/map/sessionHandling.webp" mode="cover"></image>
            </view>
            <view class="session-info">
               <text>总计处理会话消息22次</text>
               <view class="online-tag">
                  <view class="dot">●</view>
                  <view>9人正在热聊中</view>
               </view>
               <!-- 头像叠放区域 -->
               <view class="avatar-stack">
                  <image src="/static/map/avatar1.webp" mode="cover" class="avatar-item"></image>
                  <image src="/static/map/avatar2.webp" mode="cover" class="avatar-item"></image>
                  <image src="/static/map/avatar3.webp" mode="cover" class="avatar-item"></image>
                  <view class="more-avatar">+99</view>
               </view>
            </view>
            <view class="arrow-btn"><u-icon name="arrow-rightward" color="#000" size="28"></u-icon></view>
         </view>
      </view>

      <!-- 发现区（轮播形式） -->
      <view class="section">
         <view class="section-title">发现</view>
         <view class="discovery-swiper">
            <ZSwiper>
               <ZSwiperItem v-for="(item, index) in swiperList" :key="index">
                  <view class="discovery-card">
                     <image :src="item.path" mode="aspectFill" class="discovery-card-img">
                     </image>
                     <view class="iconfont icon-chuangzuolinggan-shoucang1 collect"></view>
                     <text class="discovery-text">{{ item.label }}</text>
                  </view>

               </ZSwiperItem>
            </ZSwiper>
         </view>
      </view>
   </view>
</template>

<script setup>
import { onMounted } from "vue";
import CustomNavBar from '@/components/custom-navbar/index.vue'
import ZSwiper from '@zebra-ui/swiper/components/z-swiper/z-swiper.vue'
import ZSwiperItem from '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue'
// 导入hooks
import useDatePicker from './hooks/useDatePicker'
import useSwiper from './hooks/useSwiper'

// 使用日期选择hook
const {
   date,
   startDate,
   endDate,
   bindDateChange,
   initDate
} = useDatePicker()

// 使用轮播hook
const {
   swiperList
} = useSwiper()

// 其他变量
const currentTab = ref(0)

// 初始化日期
onMounted(() => {
   initDate()
})
</script>

<style lang="scss" scoped>
// 变量定义
$padding-base: 32rpx;
$padding-large: 32rpx;
$padding-medium: 24rpx;
$border-radius: 20rpx;
$color-text-secondary: #666;
$color-online: #73FF86;

.head-avatar {
   width: 68rpx;
   height: 68rpx;
   border-radius: 50%;
}

// 全局容器
.container {
   padding: $padding-base;
   background-color: #f5f5f5;
   min-height: 100vh;
}

// 顶部栏
.top-bar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: $padding-large;

   .back-arrow {
      font-size: 40rpx;
   }

   .user-avatar {
      image {
         width: 80rpx;
         height: 80rpx;
         border-radius: 50%;
      }
   }
}

// 日期搜索栏
.date-search-bar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #000;
   color: #fff;
   padding: $padding-medium $padding-large;
   border-radius: 150rpx;
   margin-bottom: $padding-large;

   .date-box {
      display: flex;
      align-items: center;
      gap: 12rpx; // 图标与文字间距
   }

   .search-btn {
      font-size: 28rpx;
   }
}

// 板块通用样式
.section {
   margin-bottom: $padding-large;

   .section-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: $padding-base;
   }
}

// 会话处理卡片
.session-card {
   display: flex;
   align-items: center;
   justify-content: space-between;
   background-color: #fff;
   padding: 30rpx;
   border-radius: $border-radius;
   gap: $padding-medium;

   .phone-icon {
      width: 80rpx;
      height: 160rpx;
      border-radius: 129rpx;
      background: #F7F7F7;
      display: flex;
      align-items: center;
      justify-content: center;

      image {
         width: 48rpx;
         height: 48rpx;
      }

   }

   .session-info {
      flex: 1;
      font-size: 28rpx;

      .online-tag {
         display: inline-flex;
         align-items: center;
         white-space: nowrap;
         box-sizing: border-box;
         font-size: 28rpx;
         height: 44rpx;
         color: $color-text-secondary;
         border: 1px solid #000000;
         border-radius: 207px;
         margin: 10rpx 0rpx 20rpx 0rpx;
         padding: 0px 20rpx;
         box-sizing: border-box;


         .dot {
            color: $color-online;
            margin-right: 10rpx;
            font-size: 16rpx;
         }
      }
   }

   // 头像叠放样式
   .avatar-stack {
      position: relative;
      display: flex;
      align-items: center;
      margin-right: $padding-medium;

      .avatar-item {
         width: 56rpx;
         height: 56rpx;
         border-radius: 50%;
         border: 2rpx solid #fff;

         &:nth-child(2) {
            margin-left: -16rpx;
         }

         &:nth-child(3) {
            margin-left: -16rpx;
         }
      }

      .more-avatar {
         right: -20rpx;
         width: 56rpx;
         height: 56rpx;
         margin-left: -16rpx;
         z-index: 99;
         background-color: #333;
         color: #fff;
         border-radius: 50%;
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 24rpx;
      }
   }

   .arrow-btn {
      width: 64rpx;
      height: 64rpx;
      border-radius: 129rpx;
      background: #F0EFF2;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto; // 推到最右侧
      align-self: end;
   }
}

// 发现区轮播
.discovery-swiper {
   width: 100%;

   .discovery-card {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: $border-radius;
      overflow: hidden;

      image {
         width: 100%;
         height: 400rpx; // 图片高度
         border-radius: $border-radius;
         display: block;
      }

      .collect {
         position: absolute;
         right: 20rpx;
         top: 20rpx;
         background: rgba(255, 255, 255, 0.7);
         width: 48rpx;
         height: 48rpx;
         border-radius: 50%;
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 32rpx;
      }

      .discovery-text {
         font-size: 30rpx;
         height: 100rpx; // 文字区域高度
         box-sizing: border-box;
         line-height: 52rpx;
         position: absolute;
         bottom: -40rpx;
         left: 20rpx;
         color: #fff;
      }
   }
}
</style>
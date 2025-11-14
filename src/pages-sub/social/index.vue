<template>
   <view class="social-page">
      <!-- 顶部导航栏 -->
      <view class="header">
         <view class="header-nav">
            <view class="back-btn" @click="handleBack">
               <text class="iconfont icon-fanhui-2" style="font-size: 36rpx; color: #fff;"></text>
            </view>
            <view class="tabs">
               <view class="tab-item" :class="{ 'tab-active': currentTab === 0 }" @click="switchTab(0)">
                  落地圈
               </view>
               <view class="tab-item" :class="{ 'tab-active': currentTab === 1 }" @click="switchTab(1)">
                  社会圈
               </view>
            </view>
         </view>
      </view>

      <!-- 引入图片和视频组件 -->
      <SocialFeed :feedList="feedList" />
   </view>
</template>

<script setup>
import { ref } from 'vue'
import SocialFeed from './components/SocialFeed.nvue'

const currentTab = ref(0) // 0: 落地圈, 1: 社会圈

// 模拟数据
const feedList = ref([
   {
      id: 1,
      type: 'image',
      images: [
         'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image1.JPG',
         'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image2.JPG',
         'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image3.JPG'
      ],
      currentImageIndex: 0,
      userAvatar: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image1.JPG',
      username: '小A的虚拟形象',
      time: '10天前',
      location: '拱桥东地铁站',
      description: '「今天带着我的AI伙伴去了数字海滩一这里的夕阳是数据流做的,超美!」',
      isExpanded: false,
      isLiked: false,
      likeCount: 627000,
      commentCount: 627000,
      shareCount: 142000
   },
   {
      id: 2,
      type: 'image',
      image: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image4.JPG',
      userAvatar: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image5.JPG',
      username: '用户B',
      time: '5天前',
      location: '数字海滩',
      description: '这是一张美丽的风景图片，展现了数字世界的魅力。',
      isExpanded: false,
      isLiked: true,
      likeCount: 125000,
      commentCount: 35000,
      shareCount: 8900
   },
   {
      id: 3,
      type: 'video',
      video: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/video1.MP4',
      poster: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/video1.MP4',
      userAvatar: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image6.JPG',
      username: '用户C',
      time: '3天前',
      location: '虚拟空间',
      description: '这是一个有趣的视频内容，展示了数字世界的奇妙。',
      isExpanded: false,
      isLiked: false,
      likeCount: 890000,
      commentCount: 125000,
      shareCount: 45000
   },
   {
      id: 4,
      type: 'video',
      video: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/video2.MP4',
      poster: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/video2.MP4',
      userAvatar: 'https://aquan-test.oss-cn-hangzhou.aliyuncs.com/aquan/Image7.JPG',
      username: '用户D',
      time: '3天前',
      location: '虚拟空间',
      description: '这是一个有趣的视频内容，展示了数字世界的奇妙。',
      isExpanded: false,
      isLiked: false,
      likeCount: 890000,
      commentCount: 125000,
      shareCount: 45000
   }
])

// 切换选项卡
const switchTab = (index) => {
   currentTab.value = index
   // 这里可以根据不同选项卡加载不同数据
   // loadFeedData(index)
}

// 返回
const handleBack = () => {
   uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.social-page {
   width: 100vw;
   height: 100vh;
   background-color: #000;
   display: flex;
   flex-direction: column;
   overflow: hidden;
}

.header {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   z-index: 100;
   // background: rgba(0, 0, 0, 0.3);
   // backdrop-filter: blur(10rpx);

   .header-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rpx 32rpx;
      padding-top: 20rpx;

      .back-btn {
         width: 60rpx;
         height: 60rpx;
         display: flex;
         align-items: center;
         justify-content: center;
         margin-right: 32rpx;
         position: absolute;
         left: 10rpx;
      }

      .tabs {
         display: flex;
         background: rgba(0, 0, 0, 0.4);
         border-radius: 40rpx;
         padding: 4rpx;
         min-width: 320rpx;
         overflow: hidden;

         .tab-item {
            flex: 1;
            font-size: 32rpx;
            color: #fff;
            padding: 14rpx 0;
            text-align: center;
            border-radius: 36rpx;
            transition: background-color 0.3s ease, color 0.3s ease, font-weight 0.3s ease;
            font-weight: 500;
            position: relative;
            z-index: 1;
            user-select: none;
            -webkit-user-select: none;

            &.tab-active {
               background: rgba(58, 58, 58, 0.5);
               color: #fff;
               font-weight: 600;
            }

            &:active {
               opacity: 0.9;
            }
         }
      }
   }
}
</style>

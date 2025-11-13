<template>
   <view class="image-edit-page">
      <!-- 状态栏 -->
      <u-status-bar></u-status-bar>

      <!-- 顶部导航栏 -->
      <view class="header">
         <view class="header-nav">
            <view class="close-btn" @click="handleClose">
               <text class="iconfont icon-paizhao-cha-1" color="#000"></text>
            </view>
            <view class="next-btn" @click="handleNext">
               <text class="next-text">下一步</text>
            </view>
         </view>
      </view>

      <!-- 图片预览区域 -->
      <view class="image-preview-container">
         <view class="main-preview">
            <image 
               class="preview-image" 
               :src="currentStyleImage" 
               mode="aspectFit"
            ></image>
         </view>
         
         <!-- 风格选择缩略图 -->
         <view class="style-thumbnails">
            <view 
               v-for="(style, index) in styleList" 
               :key="index"
               class="thumbnail-item"
               :class="{ 'thumbnail-active': selectedStyle === index }"
               @click="handleStyleChange(index)"
            >
               <image 
                  class="thumbnail-image" 
                  :src="style.image" 
                  mode="aspectFill"
               ></image>
            </view>
         </view>
      </view>

      <!-- 底部功能区域 -->
      <view class="bottom-section">
         <!-- 一键提升画质 -->
         <view class="quality-enhance">
            <text class="enhance-text">一键提升画质亮度</text>
            <view class="ai-icon">
               <image src="/static/images/circle/ai.png" mode="widthFix"></image>
            </view>
         </view>

         <!-- 图片参考按钮 -->
         <view class="image-ref-btn">
            <view class="ref-icon-wrapper">
               <view class="landscape-icon">
                  <text class="iconfont icon-xiangce"></text>
                  <text>图片参考</text>
               </view>
            </view>
         </view>

         <!-- 功能按钮行（横向滚动） -->
         <scroll-view class="function-buttons-scroll" scroll-x="true" show-scrollbar="false">
            <view class="function-buttons">
               <view v-for="(item, index) in functionList" :key="index" class="function-btn"
                  :class="{ 'function-btn-active': activeFunctions.includes(index) }"
                  @click="handleFunctionClick(index)">
                  <text class="function-text" :class="{ 'function-text-active': activeFunctions.includes(index) }">
                     {{ item }}
                  </text>
               </view>
            </view>
         </scroll-view>

         <!-- 模式选择器 -->
         <view class="mode-selector">
            <!-- 滑动背景块 -->
            <view class="mode-slider" :style="sliderStyle"></view>
            <view v-for="(mode, index) in modeList" :key="index" class="mode-btn"
               :class="{ 'mode-btn-active': index === activeMode }" @click="handleModeChange(index)">
               <text class="mode-text" :class="{ 'mode-text-active': index === activeMode }">
                  {{ mode }}
               </text>
            </view>
         </view>

         <!-- 立即生成按钮 -->
         <view class="generate-btn" @click="handleGenerate">
            <text class="generate-text">立即生成</text>
         </view>
      </view>
   </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMode = ref(0)
const activeFunctions = ref([]) // 改为数组，支持多选
const selectedStyle = ref(0) // 选中的风格索引
const functionList = ref(['画质修复', '一键出片', '夜景提升', 'AI扩图', '去掉水印', 'AI数'])
const modeList = ref(['图片生成', '动图', '视频'])

// 风格列表数据
const styleList = ref([
   {
      id: 0,
      name: '风格1',
      image: '/static/images/circle/portrait.webp'
   },
   {
      id: 1,
      name: '风格2',
      image: '/static/images/circle/portrait.webp' // 可以替换为不同的风格图片
   },
   {
      id: 2,
      name: '风格3',
      image: '/static/images/circle/portrait.webp' // 可以替换为不同的风格图片
   }
])

// 当前显示的风格图片
const currentStyleImage = computed(() => {
   return styleList.value[selectedStyle.value].image
})

// 计算滑动背景的位置
const sliderStyle = computed(() => {
   // 每个按钮占容器的百分比（3个按钮，每个占1/3）
   const itemWidthPercent = 100 / modeList.value.length
   // 滑动距离 = 当前索引 * 100%（相对于容器宽度）
   const translateXPercent = activeMode.value * 100
   return {
      width: `${itemWidthPercent}%`,
      transform: `translateX(${translateXPercent}%)`,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
   }
})

const handleClose = () => {
   uni.navigateBack()
}

const handleNext = () => {
   // 下一步逻辑
   console.log('下一步')
}

const handleGenerate = () => {
   // 立即生成逻辑
   console.log('立即生成')
}

const handleModeChange = (index) => {
   activeMode.value = index
}

const handleFunctionClick = (index) => {
   // 如果已选中，则从数组中移除；否则添加到数组
   const currentIndex = activeFunctions.value.indexOf(index)
   if (currentIndex > -1) {
      // 已选中，取消选中
      activeFunctions.value.splice(currentIndex, 1)
   } else {
      // 未选中，添加到选中列表
      activeFunctions.value.push(index)
   }
}

// 切换风格
const handleStyleChange = (index) => {
   selectedStyle.value = index
}
</script>

<style lang="scss" scoped>
.image-edit-page {
   width: 100vw;
   min-height: 100vh;
   background-color: #EEF1FA;
   display: flex;
   flex-direction: column;
   color: #3D3D3D;
}

/* 顶部导航栏 */
.header {
   padding: 20rpx 32rpx 24rpx;
   background-color: #EEF1FA;
   width: 100%;

   .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .close-btn {
         width: 60rpx;
         height: 60rpx;
         display: flex;
         align-items: center;
         justify-content: center;

         .close-icon {
            font-size: 40rpx;
            font-weight: 300;
            color: #000;
         }
      }

      .next-btn {
         padding: 12rpx 28rpx;
         background-color: #FF194A;
         border-radius: 12rpx;

         .next-text {
            font-size: 24rpx;
            color: #fff;
            font-weight: 500;
         }
      }
   }
}

/* 图片预览区域 */
.image-preview-container {
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 0rpx 160rpx 30rpx;

   .main-preview {
      width: 100%;
      margin-bottom: 24rpx;

      .preview-image {
         width: 100%;
         height: 673rpx;
         border-radius: 16rpx;
      }
   }

   /* 风格选择缩略图 */
   .style-thumbnails {
      display: flex;
      gap: 16rpx;
      justify-content: center;
      width: 100%;

      .thumbnail-item {
         width: 68rpx;
         height: 68rpx;
         border-radius: 12rpx;
         overflow: hidden;
         border: 2rpx solid transparent;
         transition: border-color 0.3s ease;
         padding: 4rpx;

         &.thumbnail-active {
            border-color: #16C5FF;
         }

         .thumbnail-image {
            width: 100%;
            height: 100%;
            border-radius: 8rpx;
         }
      }
   }
}

/* 底部功能区域 */
.bottom-section {
   background-color: #FFFFFF;
   padding: 50rpx 32rpx 32rpx;
   border-radius: 32rpx 32rpx 0 0;
   position: relative;
   z-index: 0;
   padding-bottom: env(safe-area-inset-bottom, 32rpx);
}

/* 一键提升画质 */
.quality-enhance {
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 24rpx;

   .enhance-text {
      font-size: 28rpx;
      color: #202020;
      font-weight: 400;
   }

   .ai-icon {
      width: 56rpx;
      height: 56rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      image {
         width: 100%;
         height: 100%;
      }
   }
}

/* 图片参考按钮 */
.image-ref-btn {
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   padding-bottom: 26rpx;
   border-bottom: 1px solid #DADADA;
   margin-bottom: 26rpx;

   .ref-icon-wrapper {
      width: 100rpx;
      height: 100rpx;
      background-color: #F5F5F5;
      border-radius: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      color: #3D3D3D;

      .landscape-icon {
         width: 100%;
         height: 100%;
         position: relative;
         font-size: 18rpx;
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
      }
   }

   .ref-text {
      font-size: 24rpx;
      color: #000;
   }
}

/* 功能按钮行（横向滚动） */
.function-buttons-scroll {
   width: 100%;
   white-space: nowrap;
   margin-bottom: 30rpx;

   .function-buttons {
      display: inline-flex;
      gap: 16rpx;
      padding-right: 32rpx;

      .function-btn {
         padding: 15rpx 20rpx;
         background-color: #F4F4F4;
         border-radius: 12rpx;
         white-space: nowrap;
         flex-shrink: 0;
         color: #9C9C9C;

         .function-text {
            font-size: 24rpx;
         }
      }

      .function-btn-active {
         color: #3D3D3D;
      }
   }
}

/* 模式选择器 */
.mode-selector {
   position: relative;
   display: flex;
   width: 75%;
   margin-bottom: 32rpx;
   background-color: #F4F4F4;
   border-radius: 12rpx;
   overflow: hidden;

   /* 滑动背景块 */
   .mode-slider {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: #FF194A;
      border-radius: 12rpx;
      z-index: 1;
   }

   .mode-btn {
      flex: 1;
      padding: 20rpx 0;
      text-align: center;
      position: relative;
      z-index: 2;
      border-radius: 0;

      // 第一个按钮左边圆角
      &:first-child {
         border-top-left-radius: 12rpx;
         border-bottom-left-radius: 12rpx;
      }

      // 最后一个按钮右边圆角
      &:last-child {
         border-top-right-radius: 12rpx;
         border-bottom-right-radius: 12rpx;
      }

      .mode-text {
         font-size: 24rpx;
         color: #636363;
         transition: color 0.3s ease;

         &.mode-text-active {
            color: #fff;
            font-weight: 500;
         }
      }
   }
}

/* 立即生成按钮 */
.generate-btn {
   width: 100%;
   padding: 28rpx 0;
   background-color: #000;
   border-radius: 473rpx;
   text-align: center;
   margin-bottom: 32rpx;

   .generate-text {
      font-size: 32rpx;
      color: #fff;
      font-weight: 500;
   }
}
</style>
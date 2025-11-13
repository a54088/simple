<template>
   <view class="content-wrapper" :style="{ height: swiperHeight + 'px' }">
      <ZSwiper ref="swiperRef" :direction="'vertical'" :slides-per-view="1" :space-between="0"
         @slideChange="onSlideChange" class="main-swiper" :style="{ height: '100%' }">
         <ZSwiperItem v-for="(item, index) in feedList" :key="item.id">
            <view class="feed-item">
               <!-- 图片/视频内容 -->
               <view class="media-container">
                  <!-- 如果是图片且有多张 -->
                  <template v-if="item.type === 'image' && item.images && item.images.length > 1">
                     <ZSwiper :direction="'horizontal'" :slides-per-view="1" :space-between="0" class="image-swiper"
                        @slideChange="(swiper) => onImageSlideChange(index, swiper)">
                        <ZSwiperItem v-for="(img, imgIndex) in item.images" :key="imgIndex">
                           <image :src="img" mode="aspectFit" class="media-image"
                              @click="handleImageClick(index, imgIndex)"></image>
                        </ZSwiperItem>
                     </ZSwiper>
                     <!-- 图片指示器 -->
                     <view class="image-indicator">
                        <view class="indicator-dots">
                           <view 
                              v-for="(_, dotIndex) in item.images" 
                              :key="dotIndex"
                              class="indicator-dot"
                              :class="{ 'active': dotIndex === (getFeedItemState(index).currentImageIndex || 0) }"
                           ></view>
                        </view>
                        <!-- <view class="indicator-text">
                           <text>{{ (getFeedItemState(index).currentImageIndex || 0) + 1 }}/{{ item.images.length }}</text>
                        </view> -->
                     </view>
                  </template>
                  <!-- 单张图片 -->
                  <template v-else-if="item.type === 'image'">
                     <image :src="item.image || item.images[0]" mode="aspectFit" class="media-image"
                        @click="handleImageClick(index, 0)"></image>
                  </template>
                  <!-- 视频 -->
                  <template v-else-if="item.type === 'video'">
                     <video :ref="(el) => setVideoRef(el, index)" :id="`video-${index}`" :src="item.video" :loop="true"
                        :controls="true" :show-center-play-btn="true" :enable-play-gesture="true" :muted="false"
                        :preload="'auto'" :autoplay="false" playsinline webkit-playsinline x5-playsinline
                        x5-video-player-type="h5" x5-video-player-fullscreen="false" class="media-video"
                        @click="toggleVideoPlayState(index)"
                        @loadeddata="onVideoLoaded(index)" @error="onVideoError(index)" @canplay="onVideoCanPlay(index)"
                        @stalled="onVideoStalled(index)"
                        @timeupdate="onVideoTimeUpdate(index, $event)"></video>
                     <!-- 视频进度条 -->
                     <view class="video-progress" v-if="getFeedItemState(index).duration > 0">
                        <view class="progress-bar">
                           <view class="progress-fill" :style="{ width: getFeedItemState(index).progress + '%' }"></view>
                        </view>
                        <view class="progress-time">
                           <text>{{ formatTime(getFeedItemState(index).currentTime) }}</text>
                           <text>{{ formatTime(getFeedItemState(index).duration) }}</text>
                        </view>
                     </view>
                  </template>
               </view>

               <!-- 右侧交互按钮 -->
               <view class="right-actions">
                  <!-- 头像 -->
                  <view class="action-item avatar-item" @click="handleAvatarClick(item)">
                     <image :src="item.userAvatar" mode="aspectFill" class="avatar-img"></image>
                     <view class="follow-btn">
                        <image src="/static/images/social/add.svg" style="width: 48rpx; height: 48rpx;"></image>
                     </view>
                  </view>

                  <!-- 点赞 -->
                  <view class="action-item" @click="handleLike(item, index)">
                     <view class="action-icon" :class="{ 'liked': getFeedItemState(index).isLiked }">
                        <text class="iconfont icon-dianzan-2" style="font-size: 52rpx;"></text>
                     </view>
                     <text class="action-count">{{ formatCount(getFeedItemState(index).likeCount) }}</text>
                  </view>

                  <!-- 评论 -->
                  <view class="action-item" @click="handleComment(item, index)">
                     <view class="action-icon">
                        <image src="/static/images/social/pinglun.svg" style="width: 52rpx; height: 52rpx;"></image>
                     </view>
                     <text class="action-count">{{ formatCount(item.commentCount) }}</text>
                  </view>

                  <!-- 分享 -->
                  <view class="action-item" @click="handleShare(item, index)">
                     <view class="action-icon">
                        <text class="iconfont icon-weixuanzhong" style="font-size: 52rpx;"></text>
                     </view>
                     <text class="action-count">{{ formatCount(item.shareCount) }}</text>
                  </view>

                  <!-- 更多 -->
                  <view class="action-item" @click="handleMore(item, index)">
                     <view class="action-icon">
                        <text class="iconfont icon-gengduo-2" style="font-size: 52rpx;"></text>
                     </view>
                  </view>
               </view>

               <!-- 底部信息 -->
               <view class="bottom">
                  <view class="bottom-info">
                     <!-- 位置信息 -->
                     <view class="location-info" v-if="item.location">
                        <text class="iconfont icon-paizhao-dingwei"
                           style="font-size: 24rpx; margin-right: 8rpx;"></text>
                        <text class="location-text">{{ item.location }}</text>
                     </view>

                     <!-- 用户信息 -->
                     <view class="user-info">
                        <text class="username">@{{ item.username }}</text>
                        <text class="time">{{ item.time }}</text>
                     </view>

                     <!-- 描述文字 -->
                     <view class="description" v-if="item.description">
                        <text class="desc-text" :class="{ 'expanded': getFeedItemState(index).isExpanded }">
                           {{ item.description }}
                        </text>
                        <text v-if="item.description && item.description.length > 50" class="expand-btn"
                           @click="toggleExpand(item, index)">
                           {{ item.isExpanded ? '收起' : '展开' }}
                           <text class="iconfont icon-xiala" style="font-size: 20rpx; margin-left: 4rpx;"></text>
                        </text>
                     </view>
                  </view>
               </view>
            </view>
         </ZSwiperItem>
      </ZSwiper>
   </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useImgAndVideo } from '../hook/useImgAndVideo.js'
import ZSwiper from '@zebra-ui/swiper/components/z-swiper/z-swiper.vue'
import ZSwiperItem from '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue'

// 定义组件属性
const props = defineProps({
   feedList: {
      type: Array,
      required: true
   }
})

// 存储视频元素引用 - 使用数组替代对象以避免Vue警告
const videoRefs = ref([])

// 设置视频元素引用
const setVideoRef = (el, index) => {
   if (el) {
      videoRefs.value[index] = el
   }
}

// 使用 hook
// 视频时间格式化函数 - 保留在组件中使用
const formatTime = (seconds) => {
   if (!seconds || isNaN(seconds)) return '00:00';
   const mins = Math.floor(seconds / 60);
   const secs = Math.floor(seconds % 60);
   return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const {
   swiperRef,
   currentIndex,
   swiperHeight,
   onSlideChange: originalOnSlideChange,
   formatCount,
   handleLike,
   handleComment,
   handleShare,
   handleMore,
   handleAvatarClick,
   handleImageClick,
   toggleExpand,
   onImageSlideChange,
   getFeedItemState,
   onVideoTimeUpdate,
   onVideoLoaded,
   pauseOtherVideos,
   toggleVideoPlayState: hookToggleVideoPlayState
} = useImgAndVideo(props.feedList)

// 增强的滑动切换处理函数
const onSlideChange = (swiper) => {
   // 调用原始的滑动处理
   originalOnSlideChange(swiper)

   // 尝试播放当前视频
   playCurrentVideo(swiper.activeIndex)
}
// 尝试播放指定索引的视频
const playCurrentVideo = async (index) => {
   try {
      
      // 首先暂停所有其他视频
      pauseOtherVideos(index)

      // 通过refs获取视频元素
      let video = videoRefs.value[index]

      if (video && props.feedList[index]?.type === 'video') {


         // 确保视频元素已准备好并且有必要的方法
         if (video.readyState < 2) {

            // 先检查load方法是否存在
            if (typeof video.load === 'function') {
               video.load()
            } else {

            }
            // 短暂延迟后再尝试播放
            setTimeout(() => {
               if (index === currentIndex.value) {
                  attemptPlay(video, index)
               }
            }, 500)
            return
         }

         // 直接尝试播放
         await attemptPlay(video, index)
      }
   } catch (error) {
   }
}

// 实际执行播放的辅助函数
const attemptPlay = async (video, index) => {
   // 设置为自动播放状态
   
   getFeedItemState(index).autoplay = true
   // 音频控制已移至hook中处理
}
// 视频错误处理
const onVideoError = (index) => {

   // 尝试重新加载视频
   const video = videoRefs.value[index]
   if (video) {
      try {

         video.load()
         // 重新加载后尝试播放
         setTimeout(() => {
            if (index === currentIndex.value) {
               playCurrentVideo(index)
            }
         }, 1000)
      } catch (reloadError) {

      }
   }
}

// 新增视频可播放事件处理
const onVideoCanPlay = (index) => {
   if (index === currentIndex.value) {
      playCurrentVideo(index)
   }
}


// 视频加载停滞事件处理
const onVideoStalled = (index) => {
   const video = videoRefs.value[index]
   if (video) {
      video.load()
   }
}

// 切换视频播放状态 - 调用hook中的实现
const toggleVideoPlayState = (index) => {
   hookToggleVideoPlayState(index)
}

// 监听 currentIndex 变化，确保当前视频播放
watch(currentIndex, (newIndex) => {
   playCurrentVideo(newIndex)
})

// 在组件挂载后尝试播放当前视频
onMounted(() => {

   // 延迟更久一点确保DOM完全渲染和视频元素绑定
   setTimeout(() => {

      // 检查是否有视频元素 - 避免使用Object.keys()
      const hasVideoRefs = videoRefs.value.some(video => !!video)

      // 主动尝试获取视频元素
      props.feedList.forEach((item, index) => {
         if (item.type === 'video' && !videoRefs.value[index]) {

            const video = document.getElementById(`video-${index}`)
            if (video) {
               videoRefs.value[index] = video
            }
         }
      })

      // 开始播放
      playCurrentVideo(currentIndex.value)
   }, 300)

   // 添加用户交互监听，确保有用户交互后视频能播放
   const handleUserInteraction = () => {

      // 对当前视频尝试播放
      if (props.feedList[currentIndex.value]?.type === 'video') {
         // 再次尝试获取视频元素
         const video = document.getElementById(`video-${currentIndex.value}`)
         if (video && !videoRefs.value[currentIndex.value]) {
            videoRefs.value[currentIndex.value] = video
         }
         playCurrentVideo(currentIndex.value)
      }
   }

   // 添加多种交互事件监听
   document.addEventListener('click', handleUserInteraction)
   document.addEventListener('touchstart', handleUserInteraction)

   // 延迟多次尝试，确保视频能播放
   const retryTimes = [500, 1000, 2000, 3000]
   retryTimes.forEach(delay => {
      setTimeout(() => {
         // 只有在视频可能未播放的情况下再次尝试
         const currentFeed = props.feedList[currentIndex.value]
         if (currentFeed && currentFeed.type === 'video' && !getFeedItemState(currentIndex.value).isPlaying) {

            playCurrentVideo(currentIndex.value)
         }
      }, delay)
   })

   // 清理函数
   return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
   }
})
</script>

<style lang="scss" scoped>
.content-wrapper {
   width: 100%;
   overflow: hidden;
}

.main-swiper {
   width: 100%;
   height: 100%;
}

.feed-item {
   position: relative;
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
}

.media-container {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;

   .image-swiper {
      width: 100%;
      height: 100%;
   }

   .media-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   .media-video {
      width: 100%;
      height: 100%;
   }

   .image-indicator {
      position: absolute;
      bottom: 40rpx;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
      z-index: 5;
      
      .indicator-dots {
         display: flex;
         gap: 8rpx;
         align-items: center;
         
         .indicator-dot {
            width: 10rpx;
            height: 10rpx;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
            
            &.active {
               width: 30rpx;
               border-radius: 5rpx;
               background-color: #fff;
            }
         }
      }
      
      .indicator-text {
         background: rgba(0, 0, 0, 0.6);
         color: #fff;
         padding: 6rpx 16rpx;
         border-radius: 20rpx;
         font-size: 24rpx;
      }
   }
   
   .video-progress {
      position: absolute;
      bottom: 40rpx;
      left: 32rpx;
      right: 32rpx;
      z-index: 5;
      
      .progress-bar {
         height: 4rpx;
         background: rgba(255, 255, 255, 0.3);
         border-radius: 2rpx;
         overflow: hidden;
         margin-bottom: 12rpx;
         
         .progress-fill {
            height: 100%;
            background: #fff;
            border-radius: 2rpx;
            transition: width 0.1s linear;
         }
      }
      
      .progress-time {
         display: flex;
         justify-content: space-between;
         font-size: 22rpx;
         color: #fff;
         text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
      }
   }
}

.right-actions {
   position: absolute;
   right: 32rpx;
   bottom: 200rpx;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 40rpx;
   z-index: 10;

   .action-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8rpx;

      &.avatar-item {
         position: relative;

         .avatar-img {
            width: 96rpx;
            height: 96rpx;
            border-radius: 50%;
            border: 4rpx solid #fff;
         }

         .follow-btn {
            position: absolute;
            bottom: -28rpx;
            right: 20rpx;
         }
      }

      .action-icon {
         width: 96rpx;
         height: 96rpx;
         display: flex;
         align-items: center;
         justify-content: center;
         color: #fff;

         &.liked {
            color: #FF194A;
         }
      }

      .action-count {
         font-size: 24rpx;
         color: #fff;
         text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
      }
   }
}

.bottom {
   padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
   background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
   position: absolute;
   bottom: 0;
   left: 0;
   z-index: 10;
   width: 100%;

   &-info {
      width: calc(100% - 120rpx);
      padding: 32rpx;

      .location-info {
         display: flex;
         align-items: center;
         margin-bottom: 16rpx;

         .location-text {
            font-size: 24rpx;
            color: #fff;
         }
      }

      .user-info {
         display: flex;
         align-items: center;
         gap: 16rpx;
         margin-bottom: 16rpx;

         .username {
            font-size: 28rpx;
            color: #fff;
            font-weight: 600;
         }

         .time {
            font-size: 24rpx;
            color: rgba(255, 255, 255, 0.8);
         }
      }

      .description {
         font-size: 28rpx;
         color: #fff;
         line-height: 1.6;

         .desc-text {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;

            &.expanded {
               display: block;
               -webkit-line-clamp: unset;
               line-clamp: unset;
            }
         }

         .expand-btn {
            color: rgba(255, 255, 255, 0.9);
            font-size: 24rpx;
            margin-left: 8rpx;
            display: inline-flex;
            align-items: center;
         }
      }
   }
}
</style>
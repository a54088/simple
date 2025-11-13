import { ref, onMounted, onUnmounted, watch, reactive, computed } from 'vue'

export function useImgAndVideo(feedList) {
  const swiperRef = ref(null)
  const currentIndex = ref(0)
  const swiperHeight = ref(0)
  const statusBarHeight = ref(0)
  
  // 创建响应式状态对象，避免直接修改props
  const feedStates = reactive(new Map())

  // 计算屏幕高度
  const calculateSwiperHeight = () => {
    const systemInfo = uni.getSystemInfoSync()
    statusBarHeight.value = systemInfo.statusBarHeight || 0
    // 直接使用屏幕高度，让内容区域全部占满
    swiperHeight.value = systemInfo.windowHeight
  }
  
  // 初始化或获取feed项的状态
  const getFeedState = (index) => {
    if (!feedStates.has(index)) {
      feedStates.set(index, {
        isPlaying: false,
        isMuted: true, // 添加音频静音状态
        currentTime: 0,
        duration: 0,
        progress: 0,
        autoplay: false,
        isLiked: feedList[index]?.isLiked || false,
        likeCount: feedList[index]?.likeCount || 0,
        isExpanded: false,
        currentImageIndex: 0
      })
    }
    return feedStates.get(index)
  }

  // 滑动改变
  const onSlideChange = (swiper) => {
    currentIndex.value = swiper.activeIndex
    
    // 暂停其他视频并重置状态
    feedList.forEach((item, index) => {
      if (item.type === 'video') {
        try {
          const videoContext = uni.createVideoContext(`video-${index}`)
          if (index !== currentIndex.value) {
            videoContext?.pause()
            getFeedState(index).isPlaying = false
          } else {
            // 确保当前视频状态重置，让组件重新控制播放
            getFeedState(index).isPlaying = false
          }
        } catch (error) {
        }
      }
    })
  }

  // 格式化数字
  const formatCount = (count) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '万'
    }
    return count.toString()
  }

  // 点赞
  const handleLike = (item, index) => {
    const state = getFeedState(index)
    state.isLiked = !state.isLiked
    if (state.isLiked) {
      state.likeCount++
    } else {
      state.likeCount--
    }
  }

  // 评论
  const handleComment = (item, index) => {
    // TODO: 打开评论页面
  }

  // 分享
  const handleShare = (item, index) => {
    // TODO: 打开分享面板
  }

  // 更多
  const handleMore = (item, index) => {
    // TODO: 打开更多选项
  }

  // 头像点击
  const handleAvatarClick = (item) => {
    // TODO: 跳转到用户主页
  }

  // 图片点击
  const handleImageClick = (index, imgIndex) => {
    // TODO: 打开图片预览
  }

  // 视频播放
  const handleVideoPlay = (index) => {
    // 记录播放状态
    const state = getFeedState(index)
    state.isPlaying = true
    
    // 确保其他视频暂停
    feedList.forEach((item, idx) => {
      if (idx !== index && item.type === 'video') {
        const videoContext = uni.createVideoContext(`video-${idx}`)
        videoContext?.pause()
        getFeedState(idx).isPlaying = false
      }
    })
  }
  
  // 视频时间更新处理函数
  const onVideoTimeUpdate = (index, event) => {
    const video = event.target;
    const currentTime = video.currentTime;
    const duration = video.duration;
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    // 更新状态
    const state = getFeedState(index);
    state.currentTime = currentTime;
    state.duration = duration;
    state.progress = progress;
  };
  
  // 视频加载完成后处理
  const onVideoLoaded = (index) => {
    const state = getFeedState(index);
    state.autoplay = true;
    
    // 获取视频元素并设置默认静音
    try {
      const video = document.getElementById(`video-${index}`);
      if (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.currentTime = 0;
      }
    } catch (error) {
      // 忽略在不支持DOM的环境中的错误
    }
  };
  
  // 设置视频静音状态
  const setVideoMute = (index, muted) => {
    try {
      const state = getFeedState(index);
      state.isMuted = muted;
      
      const videoContext = uni.createVideoContext(`video-${index}`);
      if (videoContext) {
        if (muted) {
          videoContext.muted(true);
        } else {
          videoContext.muted(false);
        }
      }
      
      // 同时尝试直接操作视频元素
      try {
        const video = document.getElementById(`video-${index}`);
        if (video) {
          video.muted = muted;
        }
      } catch (domError) {
        // 忽略在不支持DOM的环境中的错误
      }
    } catch (error) {
      // 忽略错误
    }
  };
  
  // 切换视频静音状态
  const toggleVideoMute = (index) => {
    const state = getFeedState(index);
    const newMuteState = !state.isMuted;
    setVideoMute(index, newMuteState);
    return newMuteState;
  };

  // 视频暂停
  const handleVideoPause = (index) => {
    // 记录暂停状态
    getFeedState(index).isPlaying = false
  }

  // 展开/收起描述
  const toggleExpand = (item, index) => {
    getFeedState(index).isExpanded = !getFeedState(index).isExpanded
  }

  // 图片滑动改变
  const onImageSlideChange = (feedIndex, swiper) => {
    getFeedState(feedIndex).currentImageIndex = swiper.activeIndex
  }

  // 监听 feedList 变化，初始化状态映射
  watch(() => feedList, (newList) => {
    // 清除旧的状态
    feedStates.clear()
    
    // 为新的数据初始化状态
    if (newList && Array.isArray(newList)) {
      newList.forEach((item, index) => {
        // 初始化每条feed的状态
        getFeedState(index)
      })
    }
  }, { deep: true, immediate: true })

  onMounted(() => {
    calculateSwiperHeight()
    // 监听屏幕旋转
    uni.onWindowResize(() => {
      calculateSwiperHeight()
    })
  })

  onUnmounted(() => {
    // 清理视频
    feedList.forEach((item, index) => {
      if (item.type === 'video') {
        const videoContext = uni.createVideoContext(`video-${index}`)
        videoContext?.pause()
      }
    })
    // 清理状态
    feedStates.clear()
  })

  // 获取feed项状态的辅助函数
  const getFeedItemState = (index) => {
    return getFeedState(index)
  }

  return {
    swiperRef,
    currentIndex,
    swiperHeight,
    onSlideChange,
    formatCount,
    handleLike,
    handleComment,
    handleShare,
    handleMore,
    handleAvatarClick,
    handleImageClick,
    handleVideoPlay,
    handleVideoPause,
    toggleExpand,
    onImageSlideChange,
    getFeedItemState,
    onVideoTimeUpdate,
    onVideoLoaded,
    setVideoMute,
    toggleVideoMute
  }
}
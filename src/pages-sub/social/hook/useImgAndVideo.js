import { ref, onMounted, onUnmounted, watch, reactive } from 'vue'

export function useImgAndVideo(feedList) {
  const currentIndex = ref(0)
  const swiperHeight = ref(0)
  const statusBarHeight = ref(0)
  
  // 创建响应式状态对象
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
  const resolveActiveIndex = (payload) => {
    if (typeof payload === 'number') return payload
    if (payload && typeof payload.detail?.current === 'number') {
      return payload.detail.current
    }
    if (payload && typeof payload.activeIndex === 'number') {
      return payload.activeIndex
    }
    return currentIndex.value
  }

  const onSlideChange = (payload) => {
    currentIndex.value = resolveActiveIndex(payload)
    
    // 暂停其他视频并重置状态
    feedList.forEach((item, index) => {
      if (item.type === 'video') {
        try {
          const videoContext = uni.createVideoContext(`video-${index}`)
          if (index !== currentIndex.value) {
            videoContext?.pause()
            getFeedState(index).isPlaying = false
          }
        } catch (error) {
        }
      }
    })
    
    // 自动播放当前视频
    setTimeout(() => {
      const currentItem = feedList[currentIndex.value]
      if (currentItem && currentItem.type === 'video') {
        // 确保视频处于静音状态以支持自动播放
        const state = getFeedState(currentIndex.value)
        state.isMuted = true
        // 延迟播放以确保视频元素完全加载
        playVideo(currentIndex.value)
      }
    }, 300)
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
  
  // 视频时间更新处理函数
  const onVideoTimeUpdate = (index, event) => {
    const detail = event?.detail || {}
    const currentTime = detail.currentTime || 0
    const duration = detail.duration || 0
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
    state.isMuted = true;
  };
  
  // 切换视频播放状态
  const toggleVideoPlayState = (index) => {
    try {
      const state = getFeedState(index)
      if (!state) return
      
      if (state.isPlaying) {
        // 如果正在播放，则暂停
        pauseVideo(index)
      } else {
        // 如果暂停或未播放，则播放
        playVideo(index)
      }
    } catch (error) {
      console.error('切换视频播放状态失败:', error)
    }
  }
  
  // 播放视频
  const playVideo = (index) => {
    try {
      const state = getFeedState(index)
      if (!state) return
      
      // 先暂停其他视频
      pauseOtherVideos(index)
      
      // 使用uni.createVideoContext API播放
      const videoContext = uni.createVideoContext(`video-${index}`)
      if (videoContext && typeof videoContext.play === 'function') {
        videoContext.play()
        // 更新状态
        state.isPlaying = true
      }
    } catch (error) {
      console.error('播放视频失败:', error)
    }
  }
  
  // 暂停视频
  const pauseVideo = (index) => {
    try {
      const state = getFeedState(index)
      if (!state) return
      
      // 使用uni.createVideoContext API暂停
      const videoContext = uni.createVideoContext(`video-${index}`)
      if (videoContext && typeof videoContext.pause === 'function') {
        videoContext.pause()
        // 更新状态
        state.isPlaying = false
      }
    } catch (error) {
      console.error('暂停视频失败:', error)
    }
  }
  
  // 暂停其他视频
  const pauseOtherVideos = (currentIndex) => {
    try {
      feedList.forEach((item, index) => {
        if (index !== currentIndex && item.type === 'video') {
          pauseVideo(index)
        }
      })
    } catch (error) {
      console.error('暂停其他视频失败:', error)
    }
  }

  // 展开/收起描述
  const toggleExpand = (item, index) => {
    getFeedState(index).isExpanded = !getFeedState(index).isExpanded
  }

  // 图片滑动改变
  const onImageSlideChange = (feedIndex, payload) => {
    const nextIndex = resolveActiveIndex(payload)
    getFeedState(feedIndex).currentImageIndex = nextIndex
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
    toggleExpand,
    onImageSlideChange,
    getFeedItemState,
    onVideoTimeUpdate,
    onVideoLoaded,
    toggleVideoPlayState,
    playVideo,
    pauseVideo,
    pauseOtherVideos
  }
}
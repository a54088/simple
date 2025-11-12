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
    console.log('滑动切换，当前索引:', swiper.activeIndex)
    currentIndex.value = swiper.activeIndex
    
    // 暂停其他视频并重置状态
    feedList.forEach((item, index) => {
      if (item.type === 'video') {
        try {
          const videoContext = uni.createVideoContext(`video-${index}`)
          if (index !== currentIndex.value) {
            videoContext?.pause()
            console.log(`暂停视频 ${index}`)
            getFeedState(index).isPlaying = false
          } else {
            // 确保当前视频状态重置，让组件重新控制播放
            getFeedState(index).isPlaying = false
            console.log(`准备播放视频 ${index}`)
          }
        } catch (error) {
          console.warn(`操作视频 ${index} 时出错:`, error)
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
    console.log('评论', item)
    // TODO: 打开评论页面
  }

  // 分享
  const handleShare = (item, index) => {
    console.log('分享', item)
    // TODO: 打开分享面板
  }

  // 更多
  const handleMore = (item, index) => {
    console.log('更多', item)
    // TODO: 打开更多选项
  }

  // 头像点击
  const handleAvatarClick = (item) => {
    console.log('查看用户', item)
    // TODO: 跳转到用户主页
  }

  // 图片点击
  const handleImageClick = (index, imgIndex) => {
    console.log('查看图片', index, imgIndex)
    // TODO: 打开图片预览
  }

  // 视频播放
  const handleVideoPlay = (index) => {
    console.log('视频播放', index)
    // 记录播放状态
    getFeedState(index).isPlaying = true
    
    // 确保其他视频暂停
    feedList.forEach((item, idx) => {
      if (idx !== index && item.type === 'video') {
        const videoContext = uni.createVideoContext(`video-${idx}`)
        videoContext?.pause()
        getFeedState(idx).isPlaying = false
      }
    })
  }

  // 视频暂停
  const handleVideoPause = (index) => {
    console.log('视频暂停', index)
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
    console.log('feedList 数据更新，共', newList?.length || 0, '条数据')
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
    // 清理事件监听
    uni.offWindowResize()
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
    getFeedItemState
  }
}
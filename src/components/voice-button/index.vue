<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-25 17:22:36
 * @Description: 语音录制按钮组件
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// #ifdef APP-PLUS
import { utsRecordManager } from '@/uni_modules/aquan-recorder/utssdk/app-android/index.uts'
// #endif

const props = defineProps({
  // 目标帧大小（字节），默认 1024 * 10 (10KB)
  targetFrameSize: {
    type: Number,
    default: 10240
  }
})

const emit = defineEmits([
  'start',      // 开始录音
  'stop',       // 停止录音
  'pause',      // 暂停录音
  'resume',     // 恢复录音
  'frame',      // 收到录音分片数据
  'finished',   // 录音完成
  'error'       // 录音错误
])

// 录音状态
const isRecording = ref(false)
const isPaused = ref(false)
const buttonText = ref('按住说话')
const recordStartTime = ref(0)
const recordDuration = ref(0)
let durationTimer = null

// 平台检测：判断是否是 Android 平台（所有平台都定义，非APP平台默认为false）
const isAndroid = ref(false)

// #ifdef APP-PLUS
// 检查 UTS 模块是否可用（延迟加载，避免开发模式下报错）
let isUTSAvailable = false
let utsManagerInstance = null

// 尝试加载 UTS 管理器（只在真正需要时）
const tryInitUTSManager = () => {
  if (isUTSAvailable && utsManagerInstance) {
    return utsManagerInstance
  }
  
  try {
    // 检查 utsRecordManager 是否存在且可用
    if (typeof utsRecordManager !== 'undefined' && utsRecordManager) {
      utsManagerInstance = utsRecordManager
      isUTSAvailable = true
      return utsManagerInstance
    }
  } catch (e) {
    console.warn('UTS 录音管理器不可用:', e.message)
    isUTSAvailable = false
    return null
  }
  
  return null
}

onMounted(() => {
  try {
    // 运行时判断平台（uni-app 不支持通过条件编译区分 Android/iOS）
    // 注意：根据 uni-app 文档，Android 和 iOS 平台不支持通过条件编译区分
    // 必须通过调用 uni.getSystemInfo 来获取平台信息
    const systemInfo = uni.getSystemInfoSync()
    // platform 可能是 'android' 或 'Android'
    const platform = systemInfo.platform?.toLowerCase() || ''
    isAndroid.value = platform === 'android'
    
    console.log('=== 录音组件初始化 ===')
    console.log('系统信息:', JSON.stringify(systemInfo, null, 2))
    console.log('platform 原始值:', systemInfo.platform)
    console.log('platform 小写值:', platform)
    console.log('是否Android平台:', isAndroid.value)
    
    // 只在 Android 平台且 UTS 可用时初始化录音管理器
    if (isAndroid.value) {
      // 延迟初始化，确保在真正的 Android 运行时环境中
      // 使用 setTimeout 确保在下一个事件循环中执行，给 UTS 运行时足够时间初始化
      setTimeout(() => {
        try {
          const manager = tryInitUTSManager()
          if (manager) {
            console.log('开始初始化录音管理器...')
            manager.init(props.targetFrameSize, {
              onFrameRecorded: (sliceInfo) => {
                // 收到录音分片数据
                emit('frame', sliceInfo)
              },
              onRecordPaused: () => {
                isPaused.value = true
                emit('pause')
              },
              onRecordResumed: () => {
                isPaused.value = false
                emit('resume')
              },
              onRecordFinished: (totalSliceCount, totalDuration) => {
                // 录音完成
                isRecording.value = false
                isPaused.value = false
                buttonText.value = '按住说话'
                recordDuration.value = totalDuration
                if (durationTimer) {
                  clearInterval(durationTimer)
                  durationTimer = null
                }
                emit('finished', {
                  totalSliceCount,
                  totalDuration
                })
              },
              onRecordError: (errorMsg) => {
                // 录音错误
                isRecording.value = false
                isPaused.value = false
                buttonText.value = '按住说话'
                if (durationTimer) {
                  clearInterval(durationTimer)
                  durationTimer = null
                }
                emit('error', errorMsg)
                uni.showToast({
                  title: errorMsg || '录音失败',
                  icon: 'none'
                })
              }
            })
            console.log('录音管理器初始化成功')
            isUTSAvailable = true
          } else {
            console.warn('UTS 录音管理器不可用，可能是开发模式或非 Android 运行时环境')
            isAndroid.value = false // 标记为不可用
          }
        } catch (error) {
          console.error('录音管理器初始化失败:', error)
          console.error('错误详情:', error.message, error.stack)
          isAndroid.value = false // 标记为不可用
          // 不在这里显示错误，让用户在使用时看到友好的提示
        }
      }, 100) // 延迟 100ms，确保 UTS 运行时已初始化
    } else {
      console.log('当前不是 Android 平台，录音功能不可用')
    }
  } catch (error) {
    console.error('获取系统信息失败:', error)
    isAndroid.value = false
  }
})

// 清理资源
onUnmounted(() => {
  if (durationTimer) {
    clearInterval(durationTimer)
    durationTimer = null
  }
  // #ifdef APP-PLUS
  if (isAndroid.value && isUTSAvailable && isRecording.value) {
    try {
      const manager = utsManagerInstance || utsRecordManager
      if (manager) {
        manager.stop()
      }
    } catch (e) {
      console.error('停止录音失败:', e)
    }
  }
  if (isAndroid.value && isUTSAvailable) {
    try {
      const manager = utsManagerInstance || utsRecordManager
      if (manager) {
        manager.destroy()
      }
    } catch (e) {
      console.error('销毁录音管理器失败:', e)
    }
  }
  // #endif
})
// #endif

// 开始录音
const startRecord = () => {
  // #ifdef APP-PLUS
  // 运行时判断：只在 Android 平台执行录音
  console.log('startRecord 调用, isAndroid:', isAndroid.value, 'isUTSAvailable:', isUTSAvailable)
  
  if (!isAndroid.value || !isUTSAvailable) {
    console.warn('录音功能不可用 - isAndroid:', isAndroid.value, 'isUTSAvailable:', isUTSAvailable)
    // 尝试再次初始化
    const manager = tryInitUTSManager()
    if (!manager) {
      uni.showToast({
        title: '录音功能不可用，请确保在 Android 设备上运行',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 如果成功获取管理器，标记为可用并继续
    isUTSAvailable = true
  }
  
  try {
    const manager = utsManagerInstance || utsRecordManager
    if (!manager) {
      throw new Error('录音管理器未初始化')
    }
    
    console.log('调用录音管理器 start()')
    manager.start()
    isRecording.value = true
    isPaused.value = false
    buttonText.value = '录音中...'
    recordStartTime.value = Date.now()
    recordDuration.value = 0
    
    // 开始计时
    durationTimer = setInterval(() => {
      recordDuration.value = Math.floor((Date.now() - recordStartTime.value) / 1000)
      buttonText.value = `录音中 ${recordDuration.value}秒`
    }, 1000)
    
    emit('start')
  } catch (error) {
    console.error('开始录音失败:', error)
    isAndroid.value = false
    isUTSAvailable = false
    emit('error', error.message || '开始录音失败')
    uni.showToast({
      title: error.message || '开始录音失败，请确保在 Android 设备上运行',
      icon: 'none',
      duration: 2000
    })
  }
  // #endif
  
  // #ifndef APP-PLUS
  console.warn('条件编译：当前平台不支持录音')
  uni.showToast({
    title: '当前平台不支持录音',
    icon: 'none'
  })
  // #endif
}

// 停止录音
const stopRecord = () => {
  // #ifdef APP-PLUS
  if (!isRecording.value || !isAndroid.value || !isUTSAvailable) return
  
  try {
    const manager = utsManagerInstance || utsRecordManager
    if (manager) {
      manager.stop()
    }
    if (durationTimer) {
      clearInterval(durationTimer)
      durationTimer = null
    }
  } catch (error) {
    console.error('停止录音失败:', error)
    emit('error', error.message || '停止录音失败')
  }
  // #endif
}

// 触摸开始
const handleTouchStart = (e) => {
  e.preventDefault()
  startRecord()
}

// 触摸结束
const handleTouchEnd = (e) => {
  e.preventDefault()
  if (isRecording.value) {
    stopRecord()
  }
}

// 触摸取消（如滑动离开按钮区域）
const handleTouchCancel = (e) => {
  e.preventDefault()
  if (isRecording.value) {
    stopRecord()
  }
}
</script>

<template>
  <view class="voice-button-wrapper">
    <view
      class="operation-bar-btn"
      :class="{ 'recording': isRecording, 'paused': isPaused }"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchCancel"
    >
      <text class="operation-bar-btn-text">{{ buttonText }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.icon-jianpan {
  left: 30rpx;
}
.icon-jianpan-2 {
  right: 30rpx;
}
.iconfont__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.3s;
}
.operation-bar-btn {
  height: 96rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid !important;
  border-image: radial-gradient(
      108% 108% at 50% 50%,
      #3d3d3d 0%,
      rgba(255, 255, 255, 0) 100%
    )
    1;
  backdrop-filter: blur(10px);
  border-radius: 174rpx;
  color: unset;
  transition: all 0.3s;
  user-select: none;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.recording {
    border-image: radial-gradient(
        108% 108% at 50% 50%,
        #ff4444 0%,
        rgba(255, 68, 68, 0.3) 100%
      )
      1;
    
    &:before {
      background: rgba(255, 68, 68, 0.1);
    }
    
    .operation-bar-btn-text {
      color: #ff6b6b;
    }
  }
  
  &.paused {
    border-image: radial-gradient(
        108% 108% at 50% 50%,
        #ffaa00 0%,
        rgba(255, 170, 0, 0.3) 100%
      )
      1;
    
    &:before {
      background: rgba(255, 170, 0, 0.1);
    }
    
    .operation-bar-btn-text {
      color: #ffaa00;
    }
  }
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 174rpx;
    background: #181818;
    transition: background 0.3s;
  }
  
  .operation-bar-btn-text {
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 0em;
    color: #ffffff;
    position: relative;
    transition: color 0.3s;
  }
}

.voice-button-wrapper {
  color: #fff;
}

.voice-button-icon {
  font-size: 48rpx;
  color: #ffffff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.voice-button-icon-left {
    // 左侧图标样式
  }
  
  &.voice-button-icon-right {
    // 右侧图标样式
  }
}

.voice-button-content {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
  transition: all 0.3s ease;
}

.voice-button-text {
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
  letter-spacing: 0em;
  color: #ffffff;
  position: relative;
  transition: all 0.3s ease;
  
  &.recording {
    color: #ff4444;
    animation: recordingPulse 1.5s ease-in-out infinite;
  }
}

@keyframes recordingPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
</style>

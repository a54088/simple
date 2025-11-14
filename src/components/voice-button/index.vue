<template>
  <view 
    class="voice-button"
    :class="[customClass, isRecording && 'recording']"
  >
    <!-- 左侧图标插槽 -->
    <slot name="leftIcon"></slot>
    
    <!-- 录音按钮区域 -->
    <view 
      class="voice-button-content"
      @touchstart.prevent="handleTouchStart"
      @touchend.prevent="handleTouchEnd"
      @touchcancel.prevent="handleTouchCancel"
    >
      <!-- 录音文本 -->
      <text 
        class="voice-button-text"
        :class="[isRecording && 'recording']"
      >
        {{ recordingText }}
      </text>
    </view>
    
    <!-- 右侧图标插槽 -->
    <slot name="rightIcon"></slot>
  </view>
</template>

<script setup>
import { useRecord } from '@/shared/hooks/useRecord.js'

/**
 * 组件 Props
 */
const props = defineProps({
  // 左侧图标
  leftIcon: {
    type: String,
    default: ''
  },
  // 右侧图标
  rightIcon: {
    type: String,
    default: ''
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 录音配置 - 最长录音时间（毫秒）
  duration: {
    type: Number,
    default: 60000
  },
  // 录音配置 - 采样率
  sampleRate: {
    type: Number,
    default: 16000
  },
  // 录音配置 - 录音通道数
  numberOfChannels: {
    type: Number,
    default: 1
  },
  // 录音配置 - 编码码率
  encodeBitRate: {
    type: Number,
    default: 96000
  },
  // 录音配置 - 音频格式
  format: {
    type: String,
    default: 'mp3'
  },
  // 录音配置 - 帧大小
  frameSize: {
    type: Number,
    default: 50
  },
  // 最小录音时长（秒）
  minDuration: {
    type: Number,
    default: 1
  },
  // 是否显示提示
  showToast: {
    type: Boolean,
    default: true
  }
})

/**
 * 组件事件
 */
const emit = defineEmits(['record-complete', 'record-error', 'record-start', 'record-stop'])

/**
 * 使用录音 hooks
 */
const {
  isRecording,
  recordingText,
  recordDuration,
  startRecord,
  stopRecord,
  cancelRecord
} = useRecord({
  duration: props.duration,
  sampleRate: props.sampleRate,
  numberOfChannels: props.numberOfChannels,
  encodeBitRate: props.encodeBitRate,
  format: props.format,
  frameSize: props.frameSize,
  minDuration: props.minDuration,
  showToast: props.showToast,
  onStart: () => {
    emit('record-start')
  },
  onStop: () => {
    emit('record-stop')
  },
  onComplete: (data) => {
    emit('record-complete', data)
  },
  onError: (err) => {
    emit('record-error', err)
  }
})

/**
 * 处理触摸开始
 */
const handleTouchStart = () => {
  startRecord()
}

/**
 * 处理触摸结束
 */
const handleTouchEnd = () => {
  stopRecord()
}

/**
 * 处理触摸取消
 */
const handleTouchCancel = () => {
  cancelRecord()
}

/**
 * 暴露给父组件的方法和状态
 */
defineExpose({
  isRecording,
  recordingText,
  recordDuration,
  startRecord,
  stopRecord,
  cancelRecord
})
</script>

<style lang="scss" scoped>
.voice-button {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  &.recording {
    .voice-button-content {
      background: rgba(255, 68, 68, 0.1);
    }
  }
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

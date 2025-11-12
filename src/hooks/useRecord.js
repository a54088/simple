import { ref, onUnmounted } from 'vue'

/**
 * 录音配置选项
 * @typedef {Object} RecordOptions
 * @property {number} [duration=60000] - 最长录音时间（毫秒），默认 60 秒
 * @property {number} [sampleRate=16000] - 采样率，默认 16000
 * @property {number} [numberOfChannels=1] - 录音通道数，默认 1（单声道）
 * @property {number} [encodeBitRate=96000] - 编码码率，默认 96000
 * @property {string} [format='mp3'] - 音频格式，默认 'mp3'
 * @property {number} [frameSize=50] - 指定帧大小，默认 50
 * @property {number} [minDuration=1] - 最小录音时长（秒），默认 1 秒
 * @property {Function} [onStart] - 录音开始回调
 * @property {Function} [onStop] - 录音停止回调
 * @property {Function} [onError] - 录音错误回调
 * @property {Function} [onComplete] - 录音完成回调 (data) => void
 * @property {boolean} [showToast=true] - 是否显示提示，默认 true
 */

/**
 * H5（基于 MediaRecorder API）
 */
class H5RecorderManager {
  constructor(options = {}) {
    this.options = options
    this.mediaRecorder = null
    this.audioStream = null
    this.audioChunks = []
    this.onStartCallback = null
    this.onStopCallback = null
    this.onErrorCallback = null
    this.maxDuration = options.duration || 60000
    this.durationTimer = null
  }

  /**
   * 录音开始事件
   */
  onStart(callback) {
    this.onStartCallback = callback
  }

  /**
   * 录音停止事件
   */
  onStop(callback) {
    this.onStopCallback = callback
  }

  /**
   * 录音错误事件
   */
  onError(callback) {
    this.onErrorCallback = callback
  }

  /**
   * 开始录音
   */
  async start(config = {}) {
    try {
      // 检查浏览器支持
      if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('浏览器不支持 getUserMedia API，需要在 HTTPS 环境或 localhost 下使用')
      }

      const audioConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }

      const sampleRate = config.sampleRate || this.options.sampleRate || 16000
      const channelCount = config.numberOfChannels || this.options.numberOfChannels || 1
      
      try {
        audioConstraints.sampleRate = sampleRate
        audioConstraints.channelCount = channelCount
      } catch (e) {
        console.warn('浏览器可能不支持某些音频约束，使用默认值')
      }

      // 请求麦克风权限并获取音频流
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints
      })

      this.audioStream = stream
      this.audioChunks = []

      // 获取浏览器支持的 MIME 类型
      let mimeType = 'audio/webm'
      const supportedTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
        'audio/wav'
      ]

      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type
          break
        }
      }

      // 创建 MediaRecorder 实例
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
        audioBitsPerSecond: config.encodeBitRate || this.options.encodeBitRate || 96000
      })

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data)
        }
      }

      // 录音停止时的处理
      this.mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(this.audioChunks, { type: mimeType })
          const tempFilePath = URL.createObjectURL(audioBlob)
          const fileSize = audioBlob.size

          if (this.onStopCallback) {
            this.onStopCallback({
              tempFilePath: tempFilePath,
              fileSize: fileSize,
              format: this.getFormatFromMimeType(mimeType)
            })
          }

          this.cleanup()
        } catch (error) {
          console.error('处理录音数据失败:', error)
          if (this.onErrorCallback) {
            this.onErrorCallback({
              errMsg: '处理录音数据失败: ' + error.message
            })
          }
        }
      }

      // 录音错误处理
      this.mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder 错误:', event.error)
        if (this.onErrorCallback) {
          this.onErrorCallback({
            errMsg: event.error ? event.error.message : '录音错误'
          })
        }
        this.cleanup()
      }

      // 开始录音
      this.mediaRecorder.start(this.options.frameSize || 50)

      // 触发开始回调
      if (this.onStartCallback) {
        this.onStartCallback()
      }

      // 设置最大录音时长定时器
      if (this.maxDuration > 0) {
        this.durationTimer = setTimeout(() => {
          this.stop()
        }, this.maxDuration)
      }
    } catch (error) {
      console.error('启动录音失败:', error)
      let errorMsg = '启动录音失败'
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMsg = '麦克风权限被拒绝，请在浏览器设置中允许访问麦克风'
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMsg = '未找到可用的麦克风设备'
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMsg = '麦克风被其他应用占用'
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMsg = '不支持的录音参数'
      } else if (error.name === 'SecurityError') {
        errorMsg = '安全错误：需要在 HTTPS 环境下使用录音功能'
      } else {
        errorMsg = error.message || '启动录音失败'
      }

      if (this.onErrorCallback) {
        this.onErrorCallback({
          errMsg: errorMsg
        })
      }

      this.cleanup()
    }
  }

  /**
   * 停止录音
   */
  stop() {
    if (this.durationTimer) {
      clearTimeout(this.durationTimer)
      this.durationTimer = null
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop()
    } else {
      // 如果 MediaRecorder 已经停止，手动触发停止回调
      if (this.onStopCallback) {
        this.onStopCallback({
          tempFilePath: '',
          fileSize: 0
        })
      }
      this.cleanup()
    }
  }

  /**
   * 清理资源
   */
  cleanup() {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => {
        track.stop()
      })
      this.audioStream = null
    }

    if (this.durationTimer) {
      clearTimeout(this.durationTimer)
      this.durationTimer = null
    }
  }

  /**
   * 从 MIME 类型获取格式
   */
  getFormatFromMimeType(mimeType) {
    if (mimeType.includes('webm')) return 'webm'
    if (mimeType.includes('ogg')) return 'ogg'
    if (mimeType.includes('mp4')) return 'm4a'
    if (mimeType.includes('wav')) return 'wav'
    return 'webm'
  }
}

/**
 * 使用录音功能
 * @param {RecordOptions} options - 录音配置选项
 * @returns {Object} 返回录音相关的状态和方法
 */
export function useRecord(options = {}) {
  const {
    duration = 60000,
    sampleRate = 16000,
    numberOfChannels = 1,
    encodeBitRate = 96000,
    format = 'mp3',
    frameSize = 50,
    minDuration = 1,
    onStart,
    onStop,
    onError,
    onComplete,
    showToast = true
  } = options

  // 录音状态
  const isRecording = ref(false)
  const recordingText = ref('按住说话')
  const recordStartTime = ref(0)
  const recordDuration = ref(0)

  // 获取录音管理器（区分 H5 和其他平台）
  let recorderManager = null
  let isRecorderSupported = true

  // #ifdef H5
  // 检查浏览器是否支持 MediaRecorder API
  if (typeof MediaRecorder === 'undefined' || typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.warn('当前浏览器不支持录音功能，需要 HTTPS 环境和现代浏览器')
    isRecorderSupported = false
  } else {
    try {
      recorderManager = new H5RecorderManager({
        duration,
        sampleRate,
        numberOfChannels,
        encodeBitRate,
        format,
        frameSize
      })
    } catch (error) {
      console.error('初始化 H5 录音管理器失败:', error)
      isRecorderSupported = false
    }
  }
  // #endif

  // #ifndef H5
  // 小程序和 APP 环境使用 uni.getRecorderManager
  try {
    if (typeof uni !== 'undefined' && typeof uni.getRecorderManager === 'function') {
      recorderManager = uni.getRecorderManager()
    } else {
      console.warn('当前环境不支持录音功能')
      isRecorderSupported = false
    }
  } catch (error) {
    console.error('获取录音管理器失败:', error)
    isRecorderSupported = false
  }
  // #endif

  // 如果录音功能不支持，返回降级方案
  if (!isRecorderSupported || !recorderManager) {
    const handleUnsupported = () => {
      const errorMsg = '当前环境不支持录音功能'
      console.warn(errorMsg)
      
      if (showToast && typeof uni !== 'undefined' && typeof uni.showToast === 'function') {
        try {
          uni.showToast({
            title: errorMsg,
            icon: 'none',
            duration: 2000
          })
        } catch (e) {
          console.error('显示提示失败:', e)
        }
      }
      
      if (onError) {
        onError(new Error(errorMsg))
      }
    }

    return {
      isRecording,
      recordingText: ref('不支持录音'),
      recordDuration: ref(0),
      startRecord: handleUnsupported,
      stopRecord: () => {},
      cancelRecord: () => {}
    }
  }

  // 录音开始事件
  recorderManager.onStart(() => {
    console.log('录音开始')
    isRecording.value = true
    recordingText.value = '录音中...'
    recordStartTime.value = Date.now()

    if (onStart) {
      onStart()
    }
  })

  // 录音停止事件
  recorderManager.onStop((res) => {
    console.log('录音停止', res)
    isRecording.value = false
    recordingText.value = '按住说话'
    recordDuration.value = (Date.now() - recordStartTime.value) / 1000

    if (onStop) {
      onStop(res)
    }

    // 处理录音结果
    if (res.tempFilePath) {
      handleRecordResult(res)
    }
  })

  // 录音错误事件
  recorderManager.onError((err) => {
    console.error('录音错误:', err)
    isRecording.value = false
    recordingText.value = '按住说话'

    if (onError) {
      onError(err)
    }

    if (showToast) {
      uni.showToast({
        title: '录音失败: ' + (err.errMsg || '未知错误'),
        icon: 'none',
        duration: 2000
      })
    }
  })

  /**
   * 处理录音结果
   * @param {Object} res - 录音结果
   */
  const handleRecordResult = (res) => {
    // 检查录音时长，如果太短则不处理
    if (recordDuration.value < minDuration) {
      if (showToast) {
        uni.showToast({
          title: `录音时间太短，至少需要 ${minDuration} 秒`,
          icon: 'none'
        })
      }
      return
    }

    const recordData = {
      filePath: res.tempFilePath,
      duration: recordDuration.value,
      fileSize: res.fileSize
    }

    console.log('录音完成，文件路径:', recordData.filePath)
    console.log('录音时长:', recordData.duration.toFixed(2), '秒')
    console.log('文件大小:', (recordData.fileSize / 1024).toFixed(2), 'KB')

    // 触发完成回调
    if (onComplete) {
      onComplete(recordData)
    }
  }

  /**
   * 执行录音
   */
  const startRecording = () => {
    recorderManager.start({
      duration,
      sampleRate,
      numberOfChannels,
      encodeBitRate,
      format,
      frameSize
    })
  }

  /**
   * 开始录音（处理权限）
   */
  const startRecord = () => {
    if (isRecording.value) return

    // #ifdef APP-PLUS
    // APP 环境 - Android 平台
    // #ifdef APP-PLUS-ANDROID
    plus.android.requestPermissions(
      ['android.permission.RECORD_AUDIO'],
      (resultObj) => {
        if (resultObj.granted && resultObj.granted.length > 0) {
          // 权限已授予，开始录音
          startRecording()
        } else {
          if (showToast) {
            uni.showToast({
              title: '需要麦克风权限才能录音',
              icon: 'none'
            })
          }
        }
      },
      (error) => {
        console.error('权限请求失败:', error)
        if (showToast) {
          uni.showToast({
            title: '权限请求失败',
            icon: 'none'
          })
        }
      }
    )
    // #endif

    // APP 环境 - iOS 平台
    // #ifdef APP-PLUS-IOS
    // iOS 平台在首次使用时系统会自动弹出权限请求
    // 如果权限被拒绝，会在 onError 回调中处理
    startRecording()
    // #endif
    // #endif

    // #ifndef APP-PLUS
    // H5 和小程序直接开始录音
    // H5 环境的权限请求在 MediaRecorder 内部处理
    startRecording()
    // #endif
  }

  /**
   * 停止录音
   */
  const stopRecord = () => {
    if (!isRecording.value) return
    recorderManager.stop()
  }

  /**
   * 取消录音（触摸取消，比如滑出按钮区域）
   */
  const cancelRecord = () => {
    if (!isRecording.value) return
    recorderManager.stop()
    isRecording.value = false
    recordingText.value = '按住说话'
    
    if (showToast) {
      uni.showToast({
        title: '录音已取消',
        icon: 'none',
        duration: 1500
      })
    }
  }

  // 组件卸载时清理资源
  onUnmounted(() => {
    if (isRecording.value) {
      recorderManager.stop()
    }
    // #ifdef H5
    // H5 环境需要清理 MediaRecorder 资源
    if (recorderManager && typeof recorderManager.cleanup === 'function') {
      recorderManager.cleanup()
    }
    // #endif
  })

  return {
    // 状态
    isRecording,
    recordingText,
    recordDuration,
    
    // 方法
    startRecord,
    stopRecord,
    cancelRecord
  }
}

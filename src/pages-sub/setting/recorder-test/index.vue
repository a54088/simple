<template>
    <view class="recorder-test__layout">
        <CustomNavbar title="录音测试" />
        
        <view class="recorder-test__content">
            <!-- UTS 功能测试区域 -->
            <view class="recorder-test__uts-tests">
                <view class="uts-tests-title">UTS 功能测试</view>
                <view class="uts-tests-icons">
                    <view 
                        class="uts-icon-item" 
                        v-for="(item, index) in utsTestItems" 
                        :key="index"
                        @click="handleUtsTest(item.type)"
                    >
                        <i class="iconfont" :class="item.icon"></i>
                        <text class="uts-icon-label">{{ item.label }}</text>
                    </view>
                </view>
            </view>

            <!-- 状态显示 -->
            <view class="recorder-test__status">
                <view class="status-item">
                    <text class="status-label">录音状态：</text>
                    <text class="status-value" :class="statusClass">{{ statusText }}</text>
                </view>
                <view class="status-item" v-if="totalDuration > 0">
                    <text class="status-label">录音时长：</text>
                    <text class="status-value">{{ formatDuration(totalDuration) }}</text>
                </view>
                <view class="status-item" v-if="decibel >= 0">
                    <text class="status-label">当前分贝：</text>
                    <text class="status-value">{{ decibel.toFixed(1) }} dB</text>
                </view>
                <view class="status-item" v-if="sliceCount > 0">
                    <text class="status-label">片段数量：</text>
                    <text class="status-value">{{ sliceCount }}</text>
                </view>
            </view>

            <!-- 控制按钮 -->
            <view class="recorder-test__controls">
                <button 
                    class="control-btn start-btn" 
                    :disabled="isRecording || isPaused"
                    @click="handleStart"
                >
                    开始录音
                </button>
                <button 
                    class="control-btn pause-btn" 
                    :disabled="!isRecording || isPaused"
                    @click="handlePause"
                >
                    暂停
                </button>
                <button 
                    class="control-btn resume-btn" 
                    :disabled="!isPaused"
                    @click="handleResume"
                >
                    继续
                </button>
                <button 
                    class="control-btn stop-btn" 
                    :disabled="!isRecording && !isPaused"
                    @click="handleStop"
                >
                    停止录音
                </button>
            </view>

            <!-- 日志信息 -->
            <view class="recorder-test__logs">
                <view class="logs-title">操作日志：</view>
                <scroll-view class="logs-content" scroll-y>
                    <view 
                        class="log-item" 
                        v-for="(log, index) in logs" 
                        :key="index"
                    >
                        <text class="log-time">{{ log.time }}</text>
                        <text class="log-message">{{ log.message }}</text>
                    </view>
                </scroll-view>
            </view>

            <!-- 片段信息 -->
            <view class="recorder-test__slices" v-if="slices.length > 0">
                <view class="slices-title">录音片段信息：</view>
                <view 
                    class="slice-item" 
                    v-for="(slice, index) in slices" 
                    :key="index"
                >
                    <text class="slice-info">片段 {{ slice.sliceIndex + 1 }}：</text>
                    <text class="slice-info">大小 {{ formatSize(slice.sliceSize) }}，</text>
                    <text class="slice-info">时长 {{ formatDuration(slice.sliceDuration) }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import CustomNavbar from '@/components/custom-navbar/index.vue'

// #ifdef APP-PLUS
// 仅在 Android 平台导入
// @ts-ignore
import { utsRecorder } from '@/uni_modules/aquan-recorder/utssdk/app-android/index.uts'
// @ts-ignore
import { changeIcon } from '@/uni_modules/uts-icon/utssdk/app-android/index.uts'
// @ts-ignore
import { openSchema, canOpenURL } from '@/uni_modules/uts-openSchema/utssdk/app-android/index.uts'
// 注意：uts-progressNotification 插件使用了装饰器语法，在开发模式下会导致编译错误
// 如需使用，请在编译到 Android 时再启用
// #endif

const isRecording = ref(false)
const isPaused = ref(false)
const totalDuration = ref(0)
const decibel = ref(-1)
const sliceCount = ref(0)
const slices = ref([])
const logs = ref([])

// UTS 测试项配置
const utsTestItems = ref([
    {
        type: 1,
        icon: 'icon-paizhao-quanxian',
        label: '图标1'
    },
    {
        type: 2,
        icon: 'icon-zhibo-renshu',
        label: '图标2'
    },
    {
        type: 3,
        icon: 'icon-paizhao-jinru',
        label: '图标3'
    },
    {
        type: 'openUrl',
        icon: 'icon-paizhao-quanxian',
        label: '打开链接'
    }
])

// UTS 功能测试处理函数
const handleUtsTest = (type) => {
    // #ifdef APP-PLUS
    try {
        if (type === 1) {
            changeIcon(1)
            addLog('切换应用图标：图标1')
            uni.showToast({
                title: '已切换到图标1',
                icon: 'none'
            })
        } else if (type === 2) {
            changeIcon(2)
            addLog('切换应用图标：图标2')
            uni.showToast({
                title: '已切换到图标2',
                icon: 'none'
            })
        } else if (type === 3) {
            changeIcon(3)
            addLog('切换应用图标：图标3')
            uni.showToast({
                title: '已切换到图标3',
                icon: 'none'
            })
        } else if (type === 'openUrl') {
            // 测试打开链接
            const testUrl = 'https://uniapp.dcloud.io/uni-app-x'
            if (canOpenURL(testUrl)) {
                openSchema(testUrl)
                addLog(`打开链接：${testUrl}`)
                uni.showToast({
                    title: '正在打开链接',
                    icon: 'none'
                })
            } else {
                addLog(`无法打开链接：${testUrl}`)
                uni.showToast({
                    title: '无法打开该链接',
                    icon: 'none'
                })
            }
        }
    } catch (error) {
        addLog(`UTS 测试失败：${error.message}`)
        uni.showToast({
            title: `测试失败：${error.message}`,
            icon: 'none'
        })
    }
    // #endif
    
    // #ifndef APP-PLUS
    addLog('此功能仅在 Android APP 平台可用')
    uni.showToast({
        title: '此功能仅在 Android APP 平台可用',
        icon: 'none'
    })
    // #endif
}

const statusText = computed(() => {
    if (isPaused.value) return '已暂停'
    if (isRecording.value) return '录音中'
    return '未开始'
})

const statusClass = computed(() => {
    if (isRecording.value) return 'status-recording'
    if (isPaused.value) return 'status-paused'
    return 'status-idle'
})

// 添加日志
const addLog = (message) => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    logs.value.unshift({ time, message })
    if (logs.value.length > 50) {
        logs.value = logs.value.slice(0, 50)
    }
}

// 格式化时长
const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 格式化大小
const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// 开始录音
const handleStart = () => {
    // #ifdef APP-PLUS
    try {
        utsRecorder.onStart(() => {
            isRecording.value = true
            isPaused.value = false
            addLog('录音已开始')
        })

        utsRecorder.onPause(() => {
            isPaused.value = true
            addLog('录音已暂停')
        })

        utsRecorder.onResume(() => {
            isPaused.value = false
            addLog('录音已继续')
        })

        utsRecorder.onStop((totalSliceCount, duration, allSlices) => {
            isRecording.value = false
            isPaused.value = false
            totalDuration.value = duration
            sliceCount.value = totalSliceCount
            slices.value = allSlices
            addLog(`录音已停止，共 ${totalSliceCount} 个片段，总时长 ${formatDuration(duration)}`)
        })

        utsRecorder.onFrameRecorded((sliceInfo) => {
            addLog(`片段 ${sliceInfo.sliceIndex + 1} 录制完成，大小 ${formatSize(sliceInfo.sliceSize)}`)
        })

        utsRecorder.onError((errorMsg) => {
            addLog(`录音错误：${errorMsg}`)
            uni.showToast({
                title: errorMsg,
                icon: 'none'
            })
        })

        utsRecorder.onInterruptionBegin(() => {
            addLog('录音被系统中断')
        })

        utsRecorder.onInterruptionEnd(() => {
            addLog('录音中断已恢复')
        })

        utsRecorder.onDecibelChange((db) => {
            decibel.value = db
        })

        utsRecorder.start({ frameSize: 10240 })
        addLog('正在启动录音...')
    } catch (error) {
        addLog(`启动失败：${error.message}`)
        uni.showToast({
            title: '启动录音失败',
            icon: 'none'
        })
    }
    // #endif
    
    // #ifndef APP-PLUS
    addLog('此功能仅在 Android APP 平台可用')
    uni.showToast({
        title: '此功能仅在 Android APP 平台可用',
        icon: 'none'
    })
    // #endif
}

// 暂停录音
const handlePause = () => {
    // #ifdef APP-PLUS
    try {
        utsRecorder.pause()
    } catch (error) {
        addLog(`暂停失败：${error.message}`)
    }
    // #endif
}

// 继续录音
const handleResume = () => {
    // #ifdef APP-PLUS
    try {
        utsRecorder.resume()
    } catch (error) {
        addLog(`继续失败：${error.message}`)
    }
    // #endif
}

// 停止录音
const handleStop = () => {
    // #ifdef APP-PLUS
    try {
        utsRecorder.stop()
    } catch (error) {
        addLog(`停止失败：${error.message}`)
    }
    // #endif
}

onMounted(() => {
    addLog('录音测试页面已加载')
    // #ifndef APP-PLUS
    addLog('当前平台不支持录音功能')
    // #endif
})

onUnmounted(() => {
    // #ifdef APP-PLUS
    try {
        utsRecorder.offStart()
        utsRecorder.offPause()
        utsRecorder.offResume()
        utsRecorder.offStop()
        utsRecorder.offFrameRecorded()
        utsRecorder.offError()
        utsRecorder.offInterruptionBegin()
        utsRecorder.offInterruptionEnd()
        utsRecorder.offDecibelChange()
    } catch (error) {
        console.error('清理录音监听器失败：', error)
    }
    // #endif
})
</script>

<style lang="scss" scoped>
.recorder-test__layout {
    background-color: #f7f7f7;
    min-height: 100vh;
    padding-bottom: 30rpx;
}

.recorder-test__content {
    padding: 30rpx 32rpx;
}

.recorder-test__uts-tests {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .uts-tests-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
        color: #333;
    }
    
    .uts-tests-icons {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
        
        .uts-icon-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 120rpx;
            height: 120rpx;
            background: #f5f5f5;
            border-radius: 12rpx;
            cursor: pointer;
            transition: all 0.3s;
            
            &:active {
                background: #e0e0e0;
                transform: scale(0.95);
            }
            
            .iconfont {
                font-size: 48rpx;
                color: #2979ff;
                margin-bottom: 10rpx;
            }
            
            .uts-icon-label {
                font-size: 24rpx;
                color: #666;
            }
        }
    }
}

.recorder-test__status {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .status-item {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        
        &:last-child {
            margin-bottom: 0;
        }
        
        .status-label {
            font-size: 28rpx;
            color: #666;
            margin-right: 20rpx;
        }
        
        .status-value {
            font-size: 28rpx;
            font-weight: 500;
            
            &.status-idle {
                color: #999;
            }
            
            &.status-recording {
                color: #ff4444;
            }
            
            &.status-paused {
                color: #ffaa00;
            }
        }
    }
}

.recorder-test__controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 30rpx;
    
    .control-btn {
        flex: 1;
        min-width: 150rpx;
        height: 80rpx;
        border-radius: 12rpx;
        font-size: 28rpx;
        border: none;
        
        &.start-btn {
            background: #4CAF50;
            color: #fff;
        }
        
        &.pause-btn {
            background: #ff9800;
            color: #fff;
        }
        
        &.resume-btn {
            background: #2196F3;
            color: #fff;
        }
        
        &.stop-btn {
            background: #f44336;
            color: #fff;
        }
        
        &[disabled] {
            background: #e0e0e0;
            color: #999;
        }
    }
}

.recorder-test__logs {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    
    .logs-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
    }
    
    .logs-content {
        max-height: 400rpx;
        
        .log-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 10rpx;
            font-size: 24rpx;
            line-height: 1.6;
            
            .log-time {
                color: #999;
                margin-right: 10rpx;
                min-width: 80rpx;
            }
            
            .log-message {
                color: #333;
                flex: 1;
            }
        }
    }
}

.recorder-test__slices {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    
    .slices-title {
        font-size: 32rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
    }
    
    .slice-item {
        padding: 15rpx 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 26rpx;
        color: #666;
        
        &:last-child {
            border-bottom: none;
        }
        
        .slice-info {
            margin-right: 10rpx;
        }
    }
}
</style>
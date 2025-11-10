<template>
  <view 
    id="three-container" 
    class="three-container"
    :prop="propData"
    :change:prop="renderjs.handlePropChange"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  model: { type: String, default: '/static/models/fox.glb' },
  autoRotate: { type: Boolean, default: false }
})

const emit = defineEmits(['load', 'error', 'progress'])

// 将 props 转换为响应式数据，传递给 renderjs
const propData = computed(() => ({
  model: props.model,
  autoRotate: props.autoRotate
}))

// 提供给 renderjs 调用的方法
function handleLoad(modelData) {
  emit('load', modelData)
}

function handleError(error) {
  emit('error', error)
}

function handleProgress(progress) {
  emit('progress', progress)
}

// 暴露方法供 renderjs 调用
defineExpose({
  handleLoad,
  handleError,
  handleProgress
})
</script>

<script module="renderjs" lang="renderjs">
import * as THREE from 'three'
import { 
  initScene, 
  handleResize,
  createControls, 
  updateControlsTarget, 
  setAutoRotate, 
  updateControls,
  loadModel,
  createMixer, 
  updateMixer, 
  stopAllAnimations, 
  disposeMixer,
  createRenderLoop, 
  createClock, 
  cleanupResources, 
  registerResizeListener, 
  registerBeforeUnloadListener
} from './modules/index.js'

// 场景相关变量
let scene = null
let camera = null
let renderer = null
let containerEl = null

// 控制器相关变量
let controls = null

// 模型相关变量
let model = null
let removeModelFn = null

// 动画相关变量
let mixer = null
let clock = null

// 渲染循环相关变量
let stopRenderLoop = null
let removeResizeListener = null
let removeBeforeUnloadListener = null

// 状态标志
let initialized = false
let ownerInstanceRef = null

/**
 * 初始化 Three.js 场景
 */
function initThree() {
  if (initialized) return

  containerEl = document.getElementById('three-container')
  if (!containerEl) {
    console.error('无法找到容器元素')
    return
  }

  // 初始化场景、相机、渲染器
  const sceneData = initScene(containerEl)
  if (!sceneData) return

  scene = sceneData.scene
  camera = sceneData.camera
  renderer = sceneData.renderer

  // 创建控制器
  controls = createControls(camera, renderer.domElement)

  // 创建时钟
  clock = createClock()

  // 创建渲染循环
  stopRenderLoop = createRenderLoop(() => {
    // 更新控制器
    updateControls(controls)
    
    // 更新动画
    updateMixer(mixer, clock)
    
    // 渲染场景
    if (renderer && scene && camera) {
      renderer.render(scene, camera)
    }
  })

  // 注册窗口大小改变监听
  removeResizeListener = registerResizeListener(() => {
    handleResize(camera, renderer, containerEl)
  })

  // 注册页面卸载监听
  removeBeforeUnloadListener = registerBeforeUnloadListener(() => {
    cleanup()
  })

  initialized = true
}

/**
 * 加载模型
 * @param {String} modelUrl - 模型文件路径
 */
function loadModelHandler(modelUrl) {
  if (!initialized) {
    initThree()
    // 等待初始化完成
    setTimeout(() => loadModelHandler(modelUrl), 100)
    return
  }

  // 清理旧模型和动画
  if (removeModelFn) {
    removeModelFn()
    removeModelFn = null
  }
  if (mixer) {
    stopAllAnimations(mixer)
    disposeMixer(mixer)
    mixer = null
  }

  // 加载新模型
  removeModelFn = loadModel(
    modelUrl,
    scene,
    {
      onLoad: (data) => {
        model = data.model
        const gltf = data.gltf

        // 更新控制器目标为原点（模型中心）
        updateControlsTarget(controls)

        // 处理模型动画
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = createMixer(model, gltf.animations)
        }

        // 通过 callMethod 触发 Vue 组件的 load 事件
        if (ownerInstanceRef) {
          ownerInstanceRef.callMethod('handleLoad', {
            animations: data.animations
          })
        }
      },
      onProgress: (progress) => {
        if (ownerInstanceRef) {
          ownerInstanceRef.callMethod('handleProgress', progress)
        }
      },
      onError: (error) => {
        console.error('模型加载失败:', error)
        if (ownerInstanceRef) {
          ownerInstanceRef.callMethod('handleError', error)
        }
      }
    }
  )
}

/**
 * 清理资源
 */
function cleanup() {
  cleanupResources({
    scene,
    renderer,
    controls,
    mixer,
    raf: stopRenderLoop
  })

  if (removeResizeListener) {
    removeResizeListener()
    removeResizeListener = null
  }

  if (removeBeforeUnloadListener) {
    removeBeforeUnloadListener()
    removeBeforeUnloadListener = null
  }

  // 重置状态
  scene = null
  camera = null
  renderer = null
  controls = null
  model = null
  mixer = null
  clock = null
  containerEl = null
  removeModelFn = null
  stopRenderLoop = null
  initialized = false
}

// 导出函数供模板使用
export default {
  methods: {
    handlePropChange(newValue, oldValue, ownerInstance) {
      // 保存 ownerInstance 引用，供其他函数使用
      if (ownerInstance) {
        ownerInstanceRef = ownerInstance
      }

      // 首次初始化
      if (!initialized) {
        initThree()
        // 延迟加载模型，确保初始化完成
        setTimeout(() => {
          if (newValue && newValue.model) {
            loadModelHandler(newValue.model)
          }
          if (controls && newValue) {
            setAutoRotate(controls, newValue.autoRotate || false)
          }
        }, 100)
        return
      }

      // 处理 model 变化
      if (newValue && oldValue && newValue.model !== oldValue.model) {
        loadModelHandler(newValue.model)
      }

      // 处理 autoRotate 变化
      if (newValue && controls && newValue.autoRotate !== undefined) {
        setAutoRotate(controls, newValue.autoRotate)
      }
    }
  }
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let scene
let camera
let renderer
let controls
let model
let raf = 0
let mixer
const clock = new THREE.Clock()
let containerEl
let initialized = false
let ownerInstanceRef = null

// 初始化 Three.js 场景
function initThree() {
  if (initialized) return
  
  containerEl = document.getElementById('three-container')
  if (!containerEl) {
    console.error('无法找到容器元素')
    return
  }
  
  const { clientWidth: w, clientHeight: h } = containerEl
  
  // 创建场景并设置背景色
  scene = new THREE.Scene()

  // 创建透视相机 - 从正前方看向原点
  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000)
  camera.position.set(0, 2, 10)  // 相机在正前方，稍微高一点
  camera.lookAt(0, 0, 0)  // 看向原点

  // 创建 WebGL 渲染器（启用抗锯齿）
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)
  // 将渲染器的 canvas 元素添加到容器中
  containerEl.appendChild(renderer.domElement)

  /* ======================== 光源 start ======================== */
  // 环境光更亮一些
  scene.add(new THREE.AmbientLight(0xffffff, 1.5))
  // 主方向光更强一点
  const dir = new THREE.DirectionalLight(0xffffff, 3)
  dir.position.set(5, 10, 7)
  scene.add(dir)

  // 添加补光（从相反方向）
  const fill = new THREE.DirectionalLight(0xffffff, 1.5)
  fill.position.set(-5, -2, -5)
  scene.add(fill)
  /* ======================== 光源 end ======================== */

  /* ======================== 辅助内容 start ======================== */
  // 辅助线
  // const axesHelper = new THREE.AxesHelper(100);
  // scene.add(axesHelper);
  /* ======================== 辅助内容 end ======================== */

  // 创建轨道控制器（支持鼠标/触摸操作）
  controls = new OrbitControls(camera, renderer.domElement)
  // 设置控制器的目标点为原点（模型位置）
  controls.target.set(0, 0, 0)
  controls.update()  // 更新控制器
  // 启用阻尼效果，使控制更平滑
  controls.enableDamping = true
  
  initialized = true
  animate()
  window.addEventListener('resize', onResize)
}

// 加载模型
function loadModel(modelUrl) {
  if (!initialized) {
    initThree()
    // 等待初始化完成
    setTimeout(() => loadModel(modelUrl), 100)
    return
  }
  
  const loader = new GLTFLoader()

  loader.load(
    modelUrl,
    gltf => {
      if (model) scene.remove(model)
      model = gltf.scene
      scene.add(model)
      
      // 计算模型的原始包围盒，用于定位和缩放
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const center = new THREE.Vector3()
      box.getCenter(center)
      
      // 将模型居中到原点（基于原始中心）
      model.position.set(-center.x, -center.y, -center.z)
      
      // 然后应用缩放（缩放会以模型当前原点为中心，所以模型会保持居中）
      const scale = 6 / Math.max(size.x, size.y, size.z)
      model.scale.multiplyScalar(scale)
      
      // 缩放后重新计算包围盒，验证中心是否在原点
      const boxAfterScale = new THREE.Box3().setFromObject(model)
      const centerAfterScale = new THREE.Vector3()
      boxAfterScale.getCenter(centerAfterScale)
      
      // 确保中心精确在原点
      if (Math.abs(centerAfterScale.x) > 0.001 || 
          Math.abs(centerAfterScale.y) > 0.001 || 
          Math.abs(centerAfterScale.z) > 0.001) {
        model.position.x -= centerAfterScale.x
        model.position.y -= centerAfterScale.y
        model.position.z -= centerAfterScale.z
      }
      
      // 更新控制器目标为原点（模型中心）
      controls.target.set(0, 0, 0)
      controls.update()

      // 模型动画
      if (gltf.animations && gltf.animations.length > 0) {
        if (mixer) mixer.stopAllAction()
        mixer = new THREE.AnimationMixer(model)
        const a1 = gltf.animations[1]
        if (a1) {
          mixer.clipAction(a1).play()
        }

        // gltf.animations.forEach((clip) => {
        //   mixer.clipAction(clip).play()
        // })
      } else {
        console.log("没有动画数据")
      }

      // 通过 callMethod 触发 Vue 组件的 load 事件
      // 注意：在 renderjs 中无法直接传递复杂对象，所以只传递模型的基本信息
      if (ownerInstanceRef) {
        ownerInstanceRef.callMethod('handleLoad', {
          animations: gltf.animations ? gltf.animations.length : 0
        })
      }
    },
    // 加载进度回调
    xhr => {
      const progress = xhr.loaded / xhr.total
      if (ownerInstanceRef) {
        ownerInstanceRef.callMethod('handleProgress', progress)
      }
    },
    // 加载错误回调
    err => {
      console.error('模型加载失败:', err)
      if (ownerInstanceRef) {
        ownerInstanceRef.callMethod('handleError', err.message || '模型加载失败')
      }
    }
  )
}

// 动画循环
function animate() {
  if (!initialized) return
  raf = requestAnimationFrame(animate)
  if (controls) controls.update()
  if (mixer) {
    const delta = clock.getDelta()
    mixer.update(delta)
  }
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

// 窗口大小改变处理
function onResize() {
  if (!containerEl || !camera || !renderer) return
  const { clientWidth: w, clientHeight: h } = containerEl
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

// 清理资源
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (raf) cancelAnimationFrame(raf)
    if (controls) controls.dispose()
    if (renderer) renderer.dispose()
    if (mixer) mixer.stopAllAction()
    if (scene) scene.clear()
    window.removeEventListener('resize', onResize)
  })
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
            loadModel(newValue.model)
          }
          if (controls && newValue) {
            controls.autoRotate = newValue.autoRotate || false
          }
        }, 100)
        return
      }
      
      // 处理 model 变化
      if (newValue && oldValue && newValue.model !== oldValue.model) {
        if (model) scene.remove(model)
        if (mixer) {
          mixer.stopAllAction()
          mixer = undefined
        }
        loadModel(newValue.model)
      }
      
      // 处理 autoRotate 变化
      if (newValue && controls && newValue.autoRotate !== undefined) {
        controls.autoRotate = newValue.autoRotate
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
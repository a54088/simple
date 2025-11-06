<template>
  <view ref="container" class="three-container" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


const props = defineProps({
  model: { type: String, default: '/static/models/fox.glb' },
  autoRotate: { type: Boolean, default: false }
})

const emit = defineEmits(['load', 'error', 'progress'])

const container = ref<any>()
let scene!: THREE.Scene
let camera!: THREE.PerspectiveCamera
let renderer!: THREE.WebGLRenderer
let controls!: OrbitControls
let model!: THREE.Group
let raf = 0
let mixer: THREE.AnimationMixer | undefined
const clock = new THREE.Clock()

onMounted(async () => {
  // await nextTick()
  initThree()
  loadModel()
  animate()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
  controls?.dispose()
  renderer?.dispose()
  mixer?.stopAllAction()
  scene?.clear()
})

// 获取实际的 DOM 元素
function getContainerElement(): HTMLElement {
  // #ifdef H5
  if (container.value && container.value.$el) {
    return container.value.$el
  }
  if (container.value && container.value.appendChild) {
    return container.value
  }
  if (typeof document !== 'undefined') {
    const el = document.querySelector('.three-container') as HTMLElement
    if (el) return el
  }
  // #endif
  
  // #ifndef H5
  // 非 H5 平台，直接使用 ref（如果已经是 DOM 元素）
  if (container.value && container.value.appendChild) {
    return container.value
  }
  // #endif
  
  throw new Error('无法获取容器 DOM 元素')
}

// 初始化 Three.js 场景
function initThree() {
  const containerEl = getContainerElement()
  const { clientWidth: w, clientHeight: h } = containerEl
  
  // 创建场景并设置背景色
  scene = new THREE.Scene()
  scene.background = new THREE.Color('#eee')

  // 创建透视相机 - 从正前方看向原点
  camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000)
  camera.position.set(0, 2, 10)  // 相机在正前方，稍微高一点
  camera.lookAt(0, 0, 0)  // 看向原点

  // 创建 WebGL 渲染器（启用抗锯齿）
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0);
  // 将渲染器的 canvas 元素添加到容器中
  containerEl.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 1))          // 柔光打底
  const dir = new THREE.DirectionalLight(0xffffff, 2)     // 主光×2
  dir.position.set(5, 10, 7)
  scene.add(dir)

  // 辅助线
  // const axesHelper = new THREE.AxesHelper(100);
  // scene.add(axesHelper);

  // 创建轨道控制器（支持鼠标/触摸操作）
  controls = new OrbitControls(camera, renderer.domElement)
  // 设置控制器的目标点为原点（模型位置）
  controls.target.set(0, 0, 0)
  controls.update()  // 更新控制器
  // 启用阻尼效果，使控制更平滑
  controls.enableDamping = true
  // 设置是否自动旋转
  controls.autoRotate = props.autoRotate
}

// 加载模型
function loadModel() {
  const loader = new GLTFLoader()

  loader.load(
    props.model,
    gltf => {
      // if (model) scene.remove(model)
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
        mixer?.stopAllAction()
        mixer = new THREE.AnimationMixer(model)
        const a1 = gltf.animations[1]
        mixer!.clipAction(a1).play()

        // gltf.animations.forEach((clip) => {
        //   mixer!.clipAction(clip).play()
        // })
      } else {
        console.log("没有动画数据")
      }

      emit('load', model)
    },
    // 加载进度回调
    xhr => emit('progress', xhr.loaded / xhr.total),
    // 加载错误回调
    err => emit('error', err)
  )
}

// 动画
function animate() {
  raf = requestAnimationFrame(animate)
  controls.update()
  const delta = clock.getDelta()
  mixer?.update(delta)
  renderer.render(scene, camera)
}

function onResize() {
  const containerEl = getContainerElement()
  const { clientWidth: w, clientHeight: h } = containerEl
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

// 动态切换模型
watch(() => props.model, (url) => {
  if (model) scene.remove(model)
  mixer?.stopAllAction()
  mixer = undefined
  loadModel()
})
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
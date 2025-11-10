/**
 * 场景初始化模块
 * 负责创建和管理 Three.js 场景、相机、渲染器和光源
 */
import * as THREE from 'three'

/**
 * 初始化 Three.js 场景
 * @param {HTMLElement} containerEl - 容器元素
 * @returns {Object} 返回场景对象 { scene, camera, renderer }
 */
export function initScene(containerEl) {
  if (!containerEl) {
    console.error('无法找到容器元素')
    return null
  }

  const { clientWidth: w, clientHeight: h } = containerEl

  // 创建场景
  const scene = new THREE.Scene()

  // 创建透视相机 - 从正前方看向原点
  const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000)
  camera.position.set(0, 2, 10)  // 相机在正前方，稍微高一点
  camera.lookAt(0, 0, 0)  // 看向原点

  // 创建 WebGL 渲染器（启用抗锯齿）
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 0)
  // 将渲染器的 canvas 元素添加到容器中
  containerEl.appendChild(renderer.domElement)

  // 设置光源
  setupLights(scene)

  return { scene, camera, renderer }
}

/**
 * 设置场景光源
 * @param {THREE.Scene} scene - Three.js 场景对象
 */
function setupLights(scene) {
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
}

/**
 * 处理窗口大小改变
 * @param {THREE.PerspectiveCamera} camera - 相机对象
 * @param {THREE.WebGLRenderer} renderer - 渲染器对象
 * @param {HTMLElement} containerEl - 容器元素
 */
export function handleResize(camera, renderer, containerEl) {
  if (!containerEl || !camera || !renderer) return
  
  const { clientWidth: w, clientHeight: h } = containerEl
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}


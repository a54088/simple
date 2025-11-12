/**
 * 交互控制模块
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * 创建轨道控制器
 * @param {THREE.PerspectiveCamera} camera - 相机对象
 * @param {HTMLElement} domElement - DOM 元素（通常为 renderer.domElement）
 * @param {Object} options - 控制器选项
 * @param {boolean} [options.enableZoom=true] - 是否启用缩放
 * @param {boolean} [options.enablePan=true] - 是否启用平移
 * @param {boolean} [options.enableRotate=true] - 是否启用旋转
 * @param {boolean} [options.lockVerticalRotation=false] - 是否锁定垂直旋转（只能水平旋转）
 * @returns {OrbitControls} 控制器对象
 */
export function createControls(camera, domElement, options = {}) {
  const {
    enableZoom = false,  // 默认禁用缩放
    enablePan = false,   // 默认禁用平移
    enableRotate = true, // 默认启用旋转
    lockVerticalRotation = true  // 默认锁定垂直旋转（只能左右滑动）
  } = options

  // 创建轨道控制器（支持鼠标/触摸操作）
  const controls = new OrbitControls(camera, domElement)
  
  // 设置控制器的目标点为原点（模型位置）
  controls.target.set(0, 0, 0)
  
  // 禁用缩放
  controls.enableZoom = enableZoom
  
  // 禁用平移
  controls.enablePan = enablePan
  
  // 启用/禁用旋转
  controls.enableRotate = enableRotate
  
  // 如果锁定垂直旋转，只能水平旋转（左右滑动）
  if (lockVerticalRotation) {
    // 将垂直角度限制在水平位置（Math.PI / 2 表示水平方向）
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
  }
  
  // 启用阻尼效果，使控制更平滑
  controls.enableDamping = true
  
  controls.update()  // 更新控制器
  
  return controls
}

/**
 * 更新控制器目标点
 * @param {OrbitControls} controls - 控制器对象
 * @param {THREE.Vector3} target - 目标点（默认为原点）
 */
export function updateControlsTarget(controls, target = null) {
  if (!controls) return
  
  if (target) {
    controls.target.copy(target)
  } else {
    controls.target.set(0, 0, 0)
  }
  controls.update()
}

/**
 * 设置自动旋转
 * @param {OrbitControls} controls - 控制器对象
 * @param {Boolean} autoRotate - 是否自动旋转
 */
export function setAutoRotate(controls, autoRotate) {
  if (!controls) return
  controls.autoRotate = autoRotate
}

/**
 * 更新控制器（需要在动画循环中调用）
 * @param {OrbitControls} controls - 控制器对象
 */
export function updateControls(controls) {
  if (!controls) return
  controls.update()
}

/**
 * 清理控制器资源
 * @param {OrbitControls} controls - 控制器对象
 */
export function disposeControls(controls) {
  if (!controls) return
  controls.dispose()
}


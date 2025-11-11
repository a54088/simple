/**
 * 渲染循环模块
 * 负责管理渲染循环和资源清理
 */
import * as THREE from 'three'

/**
 * 创建渲染循环
 * @param {Function} renderCallback - 渲染回调函数
 * @returns {Function} 返回停止循环的函数
 */
export function createRenderLoop(renderCallback) {
  let rafId = null
  let isRunning = false

  function loop() {
    if (!isRunning) return
    
    rafId = requestAnimationFrame(loop)
    
    if (renderCallback) {
      renderCallback()
    }
  }

  function start() {
    if (isRunning) return
    isRunning = true
    loop()
  }

  function stop() {
    isRunning = false
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  // 自动启动
  start()

  return stop
}

/**
 * 创建时钟对象
 */
export function createClock() {
  return new THREE.Clock()
}

/**
 * 清理场景资源
 */
export function cleanupResources(resources) {
  const { scene, renderer, controls, mixer, raf } = resources

  // 停止渲染循环
  if (raf && typeof raf === 'function') {
    raf()
  }

  // 清理控制器
  if (controls && controls.dispose) {
    controls.dispose()
  }

  // 清理渲染器
  if (renderer) {
    renderer.dispose()
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }

  // 停止动画
  if (mixer && mixer.stopAllAction) {
    mixer.stopAllAction()
  }

  // 清理场景
  if (scene) {
    scene.clear()
  }
}

/**
 * 注册窗口大小改变监听器
 * @param {Function} resizeHandler - 窗口大小改变处理函数
 * @returns {Function} 返回移除监听器的函数
 */
export function registerResizeListener(resizeHandler) {
  if (typeof window === 'undefined') return () => {}

  window.addEventListener('resize', resizeHandler)

  return () => {
    window.removeEventListener('resize', resizeHandler)
  }
}

/**
 * 注册页面卸载监听器
 * @param {Function} cleanupHandler - 清理处理函数
 * @returns {Function} 返回移除监听器的函数
 */
export function registerBeforeUnloadListener(cleanupHandler) {
  if (typeof window === 'undefined') return () => {}

  window.addEventListener('beforeunload', cleanupHandler)

  return () => {
    window.removeEventListener('beforeunload', cleanupHandler)
  }
}


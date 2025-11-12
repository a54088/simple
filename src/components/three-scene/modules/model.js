/**
 * 模型加载模块
 * 负责加载和管理 3D 模型
 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * 加载 GLTF 模型
 * @param {String} modelUrl - 模型文件路径
 * @param {THREE.Scene} scene - 场景对象
 * @param {Object} callbacks - 回调函数对象 { onLoad, onProgress, onError }
 * @returns {Function} 返回清理函数，用于移除当前模型
 */
export function loadModel(modelUrl, scene, callbacks = {}) {
  if (!scene) {
    console.error('场景未初始化')
    return null
  }

  const loader = new GLTFLoader()
  let currentModel = null

  loader.load(
    modelUrl,
    gltf => {
      // 移除旧模型
      if (currentModel) {
        scene.remove(currentModel)
      }
      
      currentModel = gltf.scene
      scene.add(currentModel)
      
      // 居中并缩放模型
      centerAndScaleModel(currentModel)
      
      // 触发加载完成回调
      if (callbacks.onLoad) {
        callbacks.onLoad({
          model: currentModel,
          gltf: gltf,
          animations: gltf.animations ? gltf.animations.length : 0
        })
      }
    },
    // 加载进度回调
    xhr => {
      if (xhr.lengthComputable) {
        const progress = xhr.loaded / xhr.total
        if (callbacks.onProgress) {
          callbacks.onProgress(progress)
        }
      }
    },
    // 加载错误回调
    err => {
      console.error('模型加载失败:', err)
      if (callbacks.onError) {
        callbacks.onError(err.message || '模型加载失败')
      }
    }
  )

  // 返回清理函数
  return () => {
    if (currentModel) {
      scene.remove(currentModel)
      currentModel = null
    }
  }
}

/**
 * 居中并缩放模型到合适大小
 * @param {THREE.Object3D} model - 模型对象
 * @param {Number} targetSize - 目标尺寸（默认 6）
 */
function centerAndScaleModel(model, targetSize = 6) {
  if (!model) return

  // 计算模型的原始包围盒，用于定位和缩放
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const center = new THREE.Vector3()
  box.getCenter(center)

  // 将模型居中到原点（基于原始中心）
  model.position.set(-center.x, -center.y, -center.z)

  // 然后应用缩放（缩放会以模型当前原点为中心，所以模型会保持居中）
  const scale = targetSize / Math.max(size.x, size.y, size.z)
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
}

/**
 * 从场景中移除模型
 * @param {THREE.Scene} scene - 场景对象
 * @param {THREE.Object3D} model - 模型对象
 */
export function removeModel(scene, model) {
  if (scene && model) {
    scene.remove(model)
  }
}


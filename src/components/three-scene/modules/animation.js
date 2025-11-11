/**
 * 动画管理模块
 */
import * as THREE from 'three'

/**
 * 创建动画混合器
 * @param {THREE.Object3D} model - 模型对象
 * @param {Array<THREE.AnimationClip>} animations - 动画剪辑数组
 * @returns {THREE.AnimationMixer} 动画混合器对象
 */
export function createMixer(model, animations) {
  if (!model) return null
  
  const mixer = new THREE.AnimationMixer(model)
  
  // 播放第一个动画
  if (animations && animations.length > 0) {
    const firstClip = animations[0]
    if (firstClip) {
      mixer.clipAction(firstClip).play()
    }
    
    // 如果需要播放所有动画，可以取消注释下面的代码
    // animations.forEach((clip) => {
    //   mixer.clipAction(clip).play()
    // })
  } else {
    console.log("没有动画数据")
  }
  
  return mixer
}

/**
 * 更新动画混合器
 * @param {THREE.AnimationMixer} mixer - 动画混合器对象
 * @param {THREE.Clock} clock - 时钟对象
 */
export function updateMixer(mixer, clock) {
  if (!mixer || !clock) return
  
  const delta = clock.getDelta()
  mixer.update(delta)
}

/**
 * 停止所有动画
 * @param {THREE.AnimationMixer} mixer - 动画混合器对象
 */
export function stopAllAnimations(mixer) {
  if (!mixer) return
  mixer.stopAllAction()
}

/**
 * 清理动画混合器
 * @param {THREE.AnimationMixer} mixer - 动画混合器对象
 */
export function disposeMixer(mixer) {
  if (!mixer) return
  mixer.stopAllAction()
}


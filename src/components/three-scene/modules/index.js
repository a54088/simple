// 场景初始化模块
export { initScene, handleResize } from './scene.js'

// 交互控制模块
export { 
  createControls, 
  updateControlsTarget, 
  setAutoRotate, 
  updateControls, 
  disposeControls 
} from './controls.js'

// 模型加载模块
export { loadModel, removeModel } from './model.js'

// 动画管理模块
export { 
  createMixer, 
  updateMixer, 
  stopAllAnimations, 
  disposeMixer 
} from './animation.js'

// 渲染循环模块
export { 
  createRenderLoop, 
  createClock, 
  cleanupResources, 
  registerResizeListener, 
  registerBeforeUnloadListener 
} from './render.js'


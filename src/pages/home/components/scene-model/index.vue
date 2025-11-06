<script setup>
import { inject } from "vue";
import ThreeScene from '@/components/three-scene/index.vue';

const vm = inject("homeVM");

const threeLoad = (model) => {
  console.log('模型加载完成', model.animations, model)
}

const progress = (num) => {
  console.log('模型进度', num)
}

const error = (err) => {
  console.log('模型加载失败', err)
}

</script>

<template>
  <view class="scene-box">
    <ThreeScene 
      model="https://cos.shanghejingan.com/20251106/meinv_1762411171317.glb"
      @load="threeLoad"
      @progress="progress"
      @error="error"
    />
  </view>
</template>

<style lang="scss" scoped>
.scene-box {
    height: 100%;
}
</style>

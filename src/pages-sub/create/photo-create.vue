<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:03:10
 * @Description: 
-->
.
<script setup>
import CustomNavbar from "@/components/custom-navbar/index.vue";
import ThreeScene from '@/components/three-scene/index.vue';
</script>

<template>

  <view class="sms-form">
    <CustomNavbar leftIconColor="#000" title="" bgColor="transparent">
        </CustomNavbar>
        <ThreeScene 
        style="width: 100%; height: 100vh;"
      model="https://cos.shanghejingan.com/20251106/meinv_1762411171317.glb"
    />
  </view>
  
</template>

<style lang="scss" scoped>
</style>

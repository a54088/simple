<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-17 17:35:57
 * @Description: 
-->
<script setup>
const latitude = 39.9042;
const longitude = 116.4074;
const covers = [
  {
    latitude,
    longitude,
    width: 50,
    height: 50,
  },
];
</script>

<template>
  <view>
    <map
      style="width: 100vw; height: 70vh"
      :latitude="latitude"
      :longitude="longitude"
      :markers="covers"
      :enable-3D="true"
    >
    </map>
  </view>
</template>

<style lang="scss" scoped></style>

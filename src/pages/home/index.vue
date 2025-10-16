<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-16 14:47:01
 * @Description:
-->
<template>
  <view class="content">
    {{ title }}
  </view>
</template>

<script setup>
import { ref } from "vue";
const title = ref("Hello");
</script>

<style></style>

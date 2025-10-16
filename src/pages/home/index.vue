<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-16 16:35:42
 * @Description:
-->
<template>
  <view class="content">
    {{ title }}
  </view>
  <view>
    <view class="desc" @tap="onChange">{{ $t("login.button") }}</view></view
  >
</template>

<script setup>
import { ref } from "vue";
const title = ref("Hello");

const onChange = () => {
  uni.$u.setLocale("en");
};
</script>

<style></style>

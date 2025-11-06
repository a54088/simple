<!--
 * @Author: 王硕
 * @Date: 2025-08-06 14:30:24
 * @LastEditors: hch
 * @LastEditTime: 2025-08-08 10:15:48
 * @Description: 
-->
<script setup>
import { useAttrs } from "vue";

const attrs = useAttrs();

const border = computed(() => {
  return attrs.border || false;
});

const leftIconSize = computed(() => {
  return attrs.leftIconSize || "45rpx";
});

const height = computed(() => {
  return attrs.height || "88rpx";
});

const titleStyle = computed(() => {
  return (
    attrs.titleStyle || {
      fontSize: "32rpx",
      fontWeight: "500",
    }
  );
});

const fixed = computed(() => {
  return attrs.fixed || false;
});

const autoBack = computed(() => {
  return attrs.autoBack === false ? false : true;
});

const leftClick = () => {
  if (attrs.leftClick) {
    attrs.leftClick();
  }
};
</script>

<template>
  <u-navbar
    v-bind="$attrs"
    :border="border"
    :leftIconSize="leftIconSize"
    :height="height"
    :titleStyle="titleStyle"
    :fixed="fixed"
    :autoBack="autoBack"
    @leftClick="leftClick"
  >
    <template v-slot:right><slot name="right"> </slot></template>
    <template v-slot:center><slot name="center"> </slot></template>
    <template v-slot:left><slot name="left"> </slot></template>
  </u-navbar>
</template>

<style lang="scss" scoped></style>

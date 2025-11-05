<!--
 * @Author: 王硕
 * @Date: 2025-07-28 10:24:24
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:07:29
 * @Description: 
-->
<script setup>
import { inject } from "vue";

const vm = inject("loginVM");

const onToForgetPassword = () => {
  vm.formType = "forget_password";
};
</script>

<template>
  <view class="login-bottom__layout" @tap="onToForgetPassword">
    <text>忘记密码?</text>
  </view>
</template>

<style lang="scss" scoped>
.login-bottom__layout {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}
</style>

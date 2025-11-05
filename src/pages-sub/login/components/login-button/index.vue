<!--
 * @Author: 王硕
 * @Date: 2025-06-11 10:16:59
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 15:45:51
 * @Description: 
-->
<script setup lang="js">
import { inject } from 'vue'

const vm = inject('loginVM')

const onClick = () => {
 if (!vm.isAgreement) {
    uni.showToast({
      title: '请先同意用户协议',
      icon: 'none'
    })
    return
  }

  vm.submit()
}
</script>

<template>
  <button
    :class="[
      'login_button__layout',
      vm.isAgreement ? 'login_button__layout--agreement' : '',
    ]"
    @tap="onClick"
  >
    {{ vm.loginButtonText }}
  </button>
</template>

<style lang="scss" scoped>
.login_button__layout--agreement {
  background-color: #fff !important;
  color: #000000 !important;
}
.login_button__layout {
  width: 100%;
  height: 100rpx;
  background: #c9c9c9;
  border-radius: 22rpx;
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.5);
  line-height: 100rpx;

  background: rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(60px);
}
</style>

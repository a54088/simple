<!--
 * @Author: 王硕
 * @Date: 2025-07-26 13:25:29
 * @LastEditors: hch
 * @LastEditTime: 2025-10-22 13:22:58
 * @Description: 
-->
<script setup>
import { provide } from "vue";
import LoginForm from "./components/login-form/index.vue";
import LoginTab from "./components/login-tab/index.vue";
import LoginAgreement from "./components/login-agreement/index.vue";
import LoginButton from "./components/login-button/index.vue";
import LoginBottom from "./components/login-bottom/index.vue";
import { LoginVM } from "./vm/index";
import { onLoad, onShow } from "@dcloudio/uni-app";
let vm = new LoginVM();

provide("loginVM", vm);

onUnmounted(() => {
  vm = null;
});

onLoad((options) => {
  options.tabType && vm.setTab(options.tabType)
  options.mobile && vm.setInvitMobile(options.mobile)
  options.inviteCode && vm.setInviteCode(options.inviteCode)
});
</script>

<template>
  <view class="body">
    <toptitle :nobg="1" title="安合供"></toptitle>
    <view class="outer">
      <view class="login__layout">
        <view class="login_welcome">
          <text>嗨!</text>
          <text class="login_welcome_text">安合供欢迎您</text>
        </view>
        <view class="login-tab">
          <LoginTab />
        </view>
        <view class="login-form">
          <LoginForm />
        </view>
        <view class="login-agreement">
          <LoginAgreement />
        </view>
        <view class="login-button">
          <LoginButton />
        </view>
        <!-- <view class="login-bottom" v-if="vm.currentTab.key === 'password'">
          <LoginBottom />
        </view> -->
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.body {
  width: 100vw;
  background-image: url("@/static/images/login/rgbg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.login__layout {
  width: 100vw;
  // height: 100vh;
  padding: 96rpx 57rpx 0;
  .login-bottom {
    margin-top: 30rpx;
  }
  .login-button {
    margin-top: 30rpx;
    margin-bottom: 30rpx;
  }
  .login-agreement {
    margin-top: 80rpx;
  }
  .login-form {
    margin-top: 46rpx;
  }
  .login-tab {
    margin-top: 132rpx;
  }
  .login_welcome {
    font-size: 50rpx;
    font-weight: 500;
    .login_welcome_text {
      margin-left: 23rpx;
    }
  }
}
</style>

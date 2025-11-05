<!--
 * @Author: 王硕
 * @Date: 2025-07-26 13:25:29
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:12:50
 * @Description: 
-->
<script setup>
import { provide } from "vue";
import LoginForm from "./components/login-form/index.vue";
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
  options.tabType && vm.setTab(options.tabType);
  options.inviteCode && vm.setInviteCode(options.inviteCode);
});
</script>

<template>
  <view class="login__layout">
    <view class="login__logo">
      <image
        class="login__logo_img"
        src="@/static/images/login/login_logo.png"
      />

      <view class="login__logo_text">
        <text>A Circle，圈住未来</text>
      </view>
    </view>
    <view class="login-form">
      <LoginForm />
    </view>
    <view class="login-button">
      <LoginButton />
    </view>
    <view>
      <LoginAgreement />
    </view>

    <view class="login-bottom" v-if="vm.formType === 'password_login'">
      <LoginBottom />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login__layout {
  width: 100vw;
  height: 100vh;
  padding: 130rpx 70rpx 0;
  background-color: #181818;
  color: rgba(255, 255, 255, 0.8);
  .login__logo {
    text-align: center;
    .login__logo_text {
      margin-top: 24rpx;
      font-size: 22rpx;
      letter-spacing: 0.2em;
      color: rgba(255, 255, 255, 0.6);
    }
    .login__logo_img {
      width: 256rpx;
      height: 102rpx;
    }
  }
  .login-bottom {
    position: fixed;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
  }
  .login-button {
    margin-top: 80rpx;
    margin-bottom: 40rpx;
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

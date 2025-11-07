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
import LoginType from "./components/login-type/index.vue";
import LoginAgreement from "./components/login-agreement/index.vue";
import LoginButton from "./components/login-button/index.vue";
import LoginBottom from "./components/login-bottom/index.vue";
import AppleLoginButton from "./components/apple-login-button/index.vue";
import LoginMobileType from "./components/login-mobile-type/index.vue";
import { LoginVM } from "./vm/index";
// import { onLoad, onUnmounted } from "@dcloudio/uni-app";
let vm = new LoginVM();

provide("loginVM", vm);

const handleMobileLogin = () => {
  vm.formType = "sms_login";
  // uni.navigateTo({
  //   url: "/pages-sub/login/mobile-login",
  // });
};
// onUnmounted(() => {
//   vm = null;
// });

// onLoad((options) => {
//   options.tabType && vm.setTab(options.tabType);
//   options.inviteCode && vm.setInviteCode(options.inviteCode);
// });
</script>

<template>
  <view class="login__layout">
    <template v-if="vm.formType === 'mobile_auto_login'">
      <view class="login__logo">
        <image class="login__logo_img" src="@/static/images/login/aquan.png" />
        <image
          class="login__logo_Ball"
          src="@/static/images/login/dengluye.png"
        />
      </view>
      <view class="login-mobile__wrapper">
        <view class="login-mobile" @tap="handleMobileLogin"> 手机号登录 </view>
      </view>
      <LoginType></LoginType>
    </template>
    <!-- 邀请码登录 -->
     <view v-if="vm.formType === 'invite_code'" class="login-form__wrapper">
      <LoginForm></LoginForm> 
      <!-- <LoginButton></LoginButton> -->
    </view>
    <!-- 手机号登录 -->
    <view v-else class="login-form__wrapper">
      <LoginForm></LoginForm> 
      <LoginButton></LoginButton>
      <LoginAgreement></LoginAgreement>
      <LoginMobileType></LoginMobileType>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login__layout {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // padding: 130rpx 70rpx 0;
  // Logo部分
  .login__logo {
    // 保持原有样式
    padding-top: 130rpx;
  }
  .login-form__wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 32rpx; // 撑大剩余空间，自动排除logo和LoginType的高度
  }
  // 中间撑大的部分
  .login-mobile__wrapper {
    flex: 1; // 撑大剩余空间，自动排除logo和LoginType的高度
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 230rpx;

    .login-mobile {
      width: 622rpx;
      height: 98rpx;
      line-height: 98rpx;
      text-align: center;
      background: #000000;
      border-radius: 49rpx;
      color: #fff;
      font-size: 32rpx;
      font-weight: 500;
      align-self: center;
    }
  }

  // LoginType组件会自动排在底部，其高度不会被login-mobile__wrapper包含
  .login__logo {
    text-align: center;
    .login__logo_Ball {
      width: 483rpx;
      height: 411rpx;
    }
    .login__logo_img {
      width: 373rpx;
      height: 172rpx;
      margin-bottom: 80rpx;
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

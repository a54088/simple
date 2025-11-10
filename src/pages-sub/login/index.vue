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
import LoginMobileType from "./components/login-mobile-type/index.vue";
import { LoginVM } from "./vm/index";
// import { onLoad, onUnmounted } from "@dcloudio/uni-app";
import { useI18n } from 'vue-i18n'
import { isChineseLocale, saveLanguageSetting } from '@/utils/index';
import { useUserStore } from "@/store/index";
import { onLoad } from "@dcloudio/uni-app";
const { t, locale } = useI18n()

// 切换语言
const toggleLanguage = () => {
  locale.value = locale.value === 'zh-Hans' ? 'en' : 'zh-Hans';
  // 保存语言设置
  saveLanguageSetting(locale.value);
}
let vm = new LoginVM();

provide("loginVM", vm);

const handleMobileLogin = (formType) => {
  vm.formType = formType;
  // uni.navigateTo({
  //   url: "/pages-sub/login/mobile-login",
  // });
};
// onUnmounted(() => {
//   vm = null;
// });

onLoad((options) => {
  // options.tabType && vm.setTab(options.tabType);
  // options.inviteCode && vm.setInviteCode(options.inviteCode);
  if (useUserStore().getToken) {
    vm.formType = "visit_login";
  }
  // useUserStore().setToken(accessToken);
  //     useUserStore().setUserId(userId);
});
</script>

<template>
  <view class="login__layout">
      <!-- <view class="language-toggle" @tap="toggleLanguage">
        {{ locale === 'zh-Hans' ? 'English' : '中文' }}
      </view> -->
    <template v-if="vm.formType === 'mobile_auto_login'">
      <!-- 语言切换按钮 -->
      <view class="login__logo">
        <image class="login__logo_img" v-if="isChineseLocale()" src="@/static/images/login/aquan.png" />
        <image class="login__logo_img-en" v-else src="@/static/images/login/aquan-en.png" />
        <image
          class="login__logo_Ball"
          src="@/static/images/login/dengluye.png"
        />
      </view>
      <view class="login-mobile__wrapper">
        <view class="login-mobile" @tap="handleMobileLogin('sms_login')" v-if="isChineseLocale()">{{ t('login.enterAquan') }}</view>
        <view class="login-mobile" @tap="handleMobileLogin('email_login')" v-else>{{ t('login.enterAquan') }}</view>
      </view>
      <LoginType></LoginType>
    </template>
    <!-- 邀请码登录 -->
     <view v-else-if="vm.formType === 'invite_code'" class="login-form__wrapper">
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
  
  // 语言切换按钮样式
  .language-toggle {
    position: absolute;
    top: 60rpx;
    right: 40rpx;
    padding: 10rpx 20rpx;
    border: 1px solid #000;
    border-radius: 20rpx;
    font-size: 28rpx;
    color: #000;
    z-index: 10;
  }
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
    .login__logo_img-en {
      width: 538rpx;
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

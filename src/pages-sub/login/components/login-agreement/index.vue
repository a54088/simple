<!--
 * @Author: 王硕
 * @Date: 2025-07-28 10:05:07
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 15:52:00
 * @Description: 
-->
<script setup lang="js">
import { inject } from 'vue';
import { H5Url } from "@/config/index.js";

const vm = inject('loginVM')

const onAgreement = () => {
  vm.isAgreement = !vm.isAgreement
}

const onToAgreement = (path, title, type) => {
  uni.navigateTo({
    url: path
  });
};

const onToAgreement2 = (path, title, type) => {
  const fullPath = `${H5Url}/${path}`;

  uni.navigateTo({
    url:
      "/pages-sub/web-view/index?path=" +
      encodeURIComponent(fullPath) +
      "&title=" +
      title,
  });
};
</script>

<template>
  <view class="login-agreement">
    <text class="login-agreement__left" @click="onAgreement">
      <u-icon
        v-if="vm.isAgreement"
        name="checkbox-mark"
        color="#FB494A"
        size="26rpx"
      ></u-icon>
    </text>
    <view class="login-agreement__right">
      <text @click="onAgreement">登录即表明同意</text>
      <!-- <text
        class="agreement"
        @click="
          onToAgreement(
            'pages-agreement/auction-service/index',
            '用户许可协议',
            'service'
          )
        "
        >《用户许可协议》</text
      > -->
      <text
        class="agreement"
        @click="onToAgreement('/pages-agreement/auction-service/index')"
        >《隐私政策》</text
      >
      <text>和</text>
      <text
        class="agreement"
        @click="
          onToAgreement('pages-agreement/privacy/index', '隐私政策', 'ys')
        "
        >《用户许可协议》</text
      >
      <!-- <text
        class="agreement"
        @tap="onToAgreement('/pages-agreement/privacy/index')"
        >《隐私政策》</text
      > -->
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-agreement {
  display: flex;
  justify-content: center;
  .login-agreement__right {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.6);
    .agreement {
      color: #ff194a;
    }
  }
  .icon-dagou {
    color: #ff194a;
    border: none !important;
  }
  .login-agreement__left {
    flex-shrink: 0;
    width: 32rpx;
    height: 32rpx;
    border: 2rpx solid #8b8c8e;
    margin-right: 14rpx;
    border-radius: 5rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

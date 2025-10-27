<!--
 * @Author: 王硕
 * @Date: 2025-07-28 10:05:07
 * @LastEditors: 王硕
 * @LastEditTime: 2025-09-29 10:13:57
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
      <text @click="onAgreement">登录即表示接受</text>
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
        >《用户许可协议》</text
      >
      <text>和</text>
      <text
        class="agreement"
        @click="
          onToAgreement('pages-agreement/privacy/index', '隐私政策', 'ys')
        "
        >《隐私政策》</text
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
  .login-agreement__right {
    font-size: 24rpx;
    color: #222222;
    line-height: 34rpx;
    .agreement {
      color: #fb494a;
    }
  }
  .icon-dagou {
    color: #fb494a;
    border: none !important;
  }
  .login-agreement__left {
    flex-shrink: 0;
    width: 26rpx;
    height: 26rpx;
    background: #ffffff;
    border: 2rpx solid #fb494a;
    margin-right: 14rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

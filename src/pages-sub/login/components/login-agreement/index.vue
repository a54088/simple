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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
        color="#666"
      ></u-icon>
    </text>
    <view class="login-agreement__right">
      <text @click="onAgreement">{{ t('login.agreeTo') }}</text>
      <text
        class="agreement"
        @click="onToAgreement('/pages-agreement/auction-service/index')"
        >{{ t('login.privacyPolicy') }}</text
      >
      <text>{{ t('and') }}</text>
      <text
        class="agreement"
        @click="
          onToAgreement('pages-agreement/privacy/index', '隐私政策', 'ys')
        "
        >{{ t('login.userAgreement') }}</text
      >
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-agreement {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20rpx;
  flex: 1;
  .login-agreement__right {
    font-family: PingFang SC;
    font-size: 24rpx;
    color: #3d3d3d;
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
    width: 24rpx;
    height: 24rpx;
    border: 2rpx solid #8b8c8e;
    margin-right: 8rpx;
    border-radius: 6rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

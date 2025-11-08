<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 15:59:49
 * @Description: 
-->
.
<script setup>
import CustomNavbar from "@/components/custom-navbar/index.vue";
import { inject, ref } from "vue";

const vm = inject("loginVM");

const passwordForm = ref();

vm.passwordFormRef = passwordForm;

const form = computed({
  set(val) {
    vm.loginForm = val;
  },
  get() {
    return vm.loginForm;
  },
});

const rules = {
  "password": {
    required: true,
    message: "密码不能为空",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
  },
};

const showPassword = ref(false);

const onChangeCode = () => {
  if (vm.formType === "sms_login") {
    vm.formType = "password_login";
  } else if (vm.formType === "password_login") {
    vm.formType = "sms_login";
  }
};

const onChangeRegister = () => {
  vm.formType = "register";
};
</script>

<template>
  <view class="password-form">
    <CustomNavbar leftIconColor="#000" title="" bgColor="transparent" />
    <view class="password-form__logo">
      <image class="img_left" src="@/static/images/login/zhuceye-aquan.png" />
      <image class="img_right" src="@/static/images/login/zhuceye-icon.png" />
    </view>
    <u-form
      class="password-form__layout"
      labelPosition="left"
      labelWidth="60"
      :model="form"
      :rules="rules"
      :borderBottom="false"
      ref="passwordForm"
    >
      <u-form-item prop="mobile" label="手机号">
        <u-input
          v-model="form.mobile"
          border="none"
          color="#3D3D3D"
          fontSize="28rpx"
          placeholder="请输入登录手机号"
        >
        </u-input>
      </u-form-item>

      <u-form-item prop="password">
          <u-input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            border="none"
            fontSize="28rpx"
            color="#3D3D3D"
            placeholder="请输入登录密码"
            :showPasswordToggle="false"
          >
            <template #suffix>
              <u-icon
                :name="showPassword ? 'eye-off' : 'eye'"
                color="#3D3D3D"
                size="20"
                @click="showPassword = !showPassword"
              />
            </template>
          </u-input>
      </u-form-item>
      <!-- <view class="code-login">
        <text @tap="onChangeRegister">新用户注册</text>
        <text @tap="onChangeCode">{{
          vm.isSmsLogin ? "密码登录" : "验证码登录"
        }}</text>
      </view> -->
    </u-form>
  </view>
</template>

<style lang="scss" scoped>
.password-form {
  padding: 130rpx 0 0;
}
.code-login {
  margin-top: 4rpx;
  padding: 0 40rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: red;
}
.code-button {
  color: #fb494a;
}
.password-form__layout {
  ::v-deep.u-form-item {
    margin-bottom: 32rpx;
  }
  ::v-deep.u-form-item:last-child {
    margin-bottom: 60rpx;
  }
  ::v-deep.u-form-item__body {
    width: 100%;
    border-radius: 56rpx;
    padding: 36.5rpx 40rpx;
    display: flex;
    color: #3d3d3d;
    background: rgba(0, 0, 0, 0.04);
  }
  ::v-deep.u-form-item__body__left__content__label {
    font-size: 28rpx;
    font-weight: 500;
    color: #3d3d3d;
  }
}
.password-form__logo {
  padding: 120rpx 32rpx 84rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img_left {
    width: 222rpx;
    height: 144rpx;
  }
  .img_right {
    width: 192rpx;
    height: 174rpx;
  }
}
</style>

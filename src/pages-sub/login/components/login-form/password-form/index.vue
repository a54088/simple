<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 15:30:51
 * @Description: 
-->
.
<script setup>
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
  "form.password": {
    required: true,
    message: "密码不能为空",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
  },
};

const showPassword = ref(false);

const onChangeCode = () => {
  vm.isSmsLogin = !vm.isSmsLogin;
};
</script>

<template>
  <u-form
    labelPosition="left"
    labelWidth="0"
    :model="form"
    :rules="rules"
    :borderBottom="false"
    ref="passwordForm"
  >
    <u-form-item prop="mobile">
      <view class="form-item--init">
        <u-input
          v-model="form.mobile"
          border="none"
          color="#fff"
          placeholder="请输入登录手机号"
        >
        </u-input>
      </view>
    </u-form-item>

    <u-form-item prop="password">
      <view class="form-item--init">
        <u-input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          border="none"
          color="#fff"
          placeholder="请输入登录密码"
          :showPasswordToggle="false"
        >
          <template #suffix>
            <u-icon
              :name="showPassword ? 'eye-off' : 'eye'"
              color="rgba(255, 255, 255, 0.8)"
              size="20"
              @click="showPassword = !showPassword"
            />
          </template>
        </u-input>
      </view>
    </u-form-item>
    <view class="code-login" @tap="onChangeCode">
      <text>新用户注册</text>
      <text>{{ vm.isSmsLogin ? "密码登录" : "验证码登录" }}</text>
    </view>
  </u-form>
</template>

<style lang="scss" scoped>
.code-login {
  margin-top: 4rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}
.form-item--init {
  width: 100%;
  background: #000000;
  border-radius: 22rpx;
  padding: 25rpx 30rpx;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 28rpx;

  // color: rgba(255, 255, 255, 0.6);
}
.code-button {
  color: #fb494a;
}
</style>

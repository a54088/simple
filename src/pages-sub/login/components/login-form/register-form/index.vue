<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 14:31:16
 * @Description: 
-->
.
<script setup>
import { inject, ref } from "vue";

const vm = inject("loginVM");

const form = computed(() => vm.registerForm);

const registerFormRef = ref(null);

const codeButtonText = ref("获取验证码");

vm.registerFormRef = registerFormRef;

const rules = {
  mobile: {
    trigger: ["blur", "change"],
    validator: (rule, value, callback) => {
      // 上面有说，返回true表示校验通过，返回false表示不通过
      // uni.$u.test.mobile()就是返回true或者false的
      return uni.$u.test.mobile(value);
    },
    required: true,
    message: "手机号码不正确",
  },
  password: {
    required: true,
    message: "密码不能为空",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
  },
  confirmPassword: [
    {
      required: true,
      message: "确认密码不能为空",
      trigger: ["blur", "change"],
    },
    {
      validator: (rule, value) => {
        return value === form.value.password;
      },
      message: "两次密码输入不一致",
      trigger: ["blur", "change"],
    },
  ],
  mobileCode: {
    required: true,
    message: "验证码不能为空",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
  },
};

const uniCode = ref();

vm.smsCodeRef = uniCode;

const getCode = () => {
  if (form.value.mobile) {
    vm.getCode();
  } else {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
  }
};

const codeChange = (text) => {
  codeButtonText.value = text;
};
</script>

<template>
  <u--form
    labelPosition="left"
    labelWidth="0"
    :model="form"
    :rules="rules"
    :borderBottom="false"
    ref="registerFormRef"
  >
    <u-form-item prop="mobile">
      <view class="form-item--init">
        <u--input
          v-model="form.mobile"
          border="none"
          placeholder="请输入手机号"
        >
          <template #prefix>
            <text class="form-label">手机号</text>
          </template>
        </u--input>
      </view>
    </u-form-item>

    <u-form-item prop="mobileCode">
      <view class="form-item--init">
        <u--input
          v-model="form.mobileCode"
          border="none"
          placeholder="请输入验证码"
        >
          <template #prefix>
            <text class="form-label">验证码</text>
          </template>
          <template #suffix>
            <u-code
              ref="uniCode"
              @change="codeChange"
              seconds="60"
              changeText="X秒重新获取"
            />
            <text class="code-button" @tap="getCode">{{ codeButtonText }}</text>
          </template>
        </u--input>
      </view>
    </u-form-item>

    <u-form-item prop="password">
      <view class="form-item--init">
        <u--input
          v-model="form.password"
          border="none"
          placeholder="请设置新密码"
        >
          <template #prefix>
            <text class="form-label">设置密码</text>
          </template>
        </u--input>
      </view>
    </u-form-item>

    <u-form-item prop="confirmPassword">
      <view class="form-item--init">
        <u--input
          v-model="form.confirmPassword"
          border="none"
          placeholder="请重复密码"
        >
          <template #prefix>
            <text class="form-label">重复密码</text>
          </template>
        </u--input>
      </view>
    </u-form-item>
    <u-form-item v-if="form.invitMobile">
      <view class="form-item--init">
        <u--input v-model="form.invitMobile" border="none" disabled>
          <template #prefix>
            <text class="form-label">推荐人手机号后四位</text>
          </template>
        </u--input>
      </view>
    </u-form-item>
  </u--form>
</template>

<style lang="scss" scoped>
.form-item--init {
  width: 100%;
  background: #f8f8f8;
  border-radius: 10rpx;
  padding: 25rpx 30rpx;
  display: flex;
  align-items: center;
}
.code-button {
  color: #fb494a;
}
.form-label {
  font-size: 28rpx;
  letter-spacing: 0;
  color: #3d3d3d;
  width: 120rpx;
  margin-right: 30rpx;
}
</style>

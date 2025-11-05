<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:03:10
 * @Description: 
-->
.
<script setup>
import { inject, ref } from "vue";

const vm = inject("loginVM");

const smsLoginCodeRef = ref();

const smsFormRef = ref();

const codeButtonText = ref("获取验证码");

vm.smsFormRef = smsFormRef;
vm.smsLoginCodeRef = smsLoginCodeRef;

const form = computed({
  set(val) {
    vm.smsForm = val;
  },
  get() {
    return vm.smsForm;
  },
});

const rules = {
  // mobile: {
  //   trigger: ["blur", "change"],
  //   validator: (rule, value, callback) => {
  //     // 上面有说，返回true表示校验通过，返回false表示不通过
  //     // uni.$u.test.mobile()就是返回true或者false的
  //     return uni.$u.test.mobile(value);
  //   },
  //   required: true,
  //   message: "手机号码不正确",
  // },
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

const codeChange = (text) => {
  codeButtonText.value = text;
};

const getCode = () => {
  if (form.value.mobile) {
    vm.getSmsLoginCode();
  } else {
    uni.showToast({
      title: "请输入手机号",
      icon: "none",
    });
  }
};

const onChangeRegister = () => {
  vm.formType = "register";
};
</script>

<template>
  <u-form
    labelPosition="left"
    labelWidth="0"
    :model="form"
    :rules="rules"
    :borderBottom="false"
    ref="smsFormRef"
  >
    <u-form-item prop="mobile">
      <view class="form-item--init">
        <u-input
          v-model="form.mobile"
          border="none"
          type="number"
          placeholder="请输入手机号"
        >
        </u-input>
      </view>
    </u-form-item>

    <u-form-item prop="code">
      <view class="form-item--init">
        <u-input
          v-model="form.code"
          border="none"
          placeholder="请输入验证码"
          type="number"
        >
          <template #suffix>
            <u-code
              ref="smsLoginCodeRef"
              @change="codeChange"
              seconds="60"
              changeText="X秒重新获取"
            />
            <text class="code-button" @tap="getCode">{{ codeButtonText }}</text>
          </template>
        </u-input>
      </view>
    </u-form-item>
    <view class="code-login">
      <text @tap="onChangeRegister">新用户注册</text>
      <text @tap="onChangeCode">{{
        vm.isSmsLogin ? "密码登录" : "验证码登录"
      }}</text>
    </view>
  </u-form>
</template>

<style lang="scss" scoped>
.code-login {
  margin-top: 8rpx;
  padding: 0 40rpx;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28rpx;
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
}
.code-button {
  color: #fff;
}
.form-label {
  display: inline-block;
  font-size: 28rpx;
  letter-spacing: 0;
  color: #3d3d3d;
  width: 120rpx;
  margin-right: 10rpx;
}
</style>

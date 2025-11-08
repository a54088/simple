<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:03:10
 * @Description: 
-->
.
<script setup>
import CustomNavbar from "@/components/custom-navbar/index.vue";
import { inject, ref } from "vue";

const vm = inject("loginVM");

const smsLoginCodeRef = ref();

const emailFormRef = ref();

const codeButtonText = ref("get code");
import { useI18n } from "vue-i18n";

const { t } = useI18n();

vm.emailFormRef = emailFormRef;
vm.smsLoginCodeRef = smsLoginCodeRef;

const form = computed({
  set(val) {
    vm.emailForm = val;
  },
  get() {
    return vm.emailForm;
  },
});

const rules = {
  /** 邮箱 */
  email: {
    required: true,
    message: "please input correct email",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
    validator: (rule, value, callback) => {
      // 上面有说，返回true表示校验通过，返回false表示不通过
      // uni.$u.test.mobile()就是返回true或者false的
      return uni.$u.test.email(value);
    },
  },
  /** 验证码 */
  code: {
    required: true,
    message: "please input code",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
  },
};

const codeChange = (text) => {
  codeButtonText.value = text;
};

const getCode = () => {
  if (form.value.email) {
    vm.getEmailLoginCode();
  } else {
    uni.showToast({
      title: "please input email",
      icon: "none",
    });
  }
};

const onLeftClick = () => {
  vm.formType = "mobile_auto_login";
};
</script>

<template>

  <view class="sms-form">
    <CustomNavbar leftIconColor="#000" title="" bgColor="transparent" :autoBack="false" :leftClick="onLeftClick"/>
    <view class="sms-form__logo">
      <image class="img_left" src="@/static/images/login/zhuceye-aquan.png" />
      <image class="img_right" src="@/static/images/login/zhuceye-icon.png" />
    </view>
    <u-form
    labelPosition="left"
    labelWidth="60"
    :model="form"
    :rules="rules"
    :borderBottom="false"
    ref="emailFormRef"
    class="sms-form__layout"
  >
    <u-form-item prop="email" label="Email">
        <u-input
          v-model="form.email"
          border="none"
          type="text"
          placeholder="please input email"
        >
        </u-input>
    </u-form-item>

    <u-form-item prop="code">
        <u-input
          v-model="form.code"
          border="none"
          placeholder="please input code"
          type="number"
        >
          <template #suffix>
            <u-code
              ref="smsLoginCodeRef"
              @change="codeChange"
              seconds="60"
              changeText="X second get"
              startText="Get Code"
            />
            <text class="code-button" @tap="getCode">{{ codeButtonText }}</text>
          </template>
        </u-input>
    </u-form-item>
  </u-form>
  </view>
  
</template>

<style lang="scss" scoped>

.sms-form {
  padding: 130rpx 0 0;
}
.code-button {
  color: #3D3D3D;
}
.form-label {
  display: inline-block;
  font-size: 28rpx;
  letter-spacing: 0;
  color: #3d3d3d;
  width: 120rpx;
  margin-right: 10rpx;
}

.sms-form__logo {
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
.sms-form__layout {
  
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
  // ::v-deep.u-form-item__body {
  //   padding: 0;
  // }
  ::v-deep.u-form-item__body__left__content__label {
    font-size: 28rpx;
    font-weight: 500;
    color: #3d3d3d;
  }
}
</style>

<!--
 * @Author: 王硕
 * @Date: 2025-07-28 11:18:35
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:10:35
 * @Description: 
-->
<script setup>
import PasswordForm from "./password-form/index.vue";
import RegisterForm from "./register-form/index.vue";
import SmsForm from "./sms-form/index.vue";
import ForgetPasswordForm from "./forget-password-form/index.vue";
import InviteForm from "./invite-form/index.vue";
import EmailForm from "./email-form/index.vue";
import DiceFrom from "./invite-form/dice.vue";

const vm = inject("loginVM");
</script>

<template>
  <PasswordForm v-show="vm.formType === 'password_login'" />
  <!-- <RegisterForm v-show="vm.formType === 'register'" /> -->
  <SmsForm v-show="vm.formType === 'sms_login'" />
  <!-- <ForgetPasswordForm v-show="vm.formType === 'forget_password'" /> -->
  <InviteForm v-show="vm.formType === 'invite_code'" />
  <!-- <DiceFrom v-show="vm.formType === 'invite_code'" /> -->
  <EmailForm v-show="vm.formType === 'email_login'" />
</template>

<style lang="scss" scoped>
::v-deep.u-form-item__body__right__message {
font-size: 28rpx;
color: #FF1B1B;
	line-height: 42rpx;
  height: 0;
}
</style>

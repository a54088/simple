<!--
 * @Author: 王硕
 * @Date: 2025-07-28 11:18:35
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 14:31:51
 * @Description: 
-->
<script setup>
import PasswordForm from "./password-form/index.vue";
import RegisterForm from "./register-form/index.vue";
import SmsForm from "./sms-form/index.vue";

const vm = inject("loginVM");
</script>

<template>
  <PasswordForm v-show="vm.formType === 'password_login'" />
  <RegisterForm v-show="vm.formType === 'register'" />
  <SmsForm v-show="vm.formType === 'sms_login'" />
</template>

<style lang="scss" scoped></style>

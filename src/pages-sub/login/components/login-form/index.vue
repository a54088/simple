<!--
 * @Author: 王硕
 * @Date: 2025-07-28 11:18:35
 * @LastEditors: 王硕
 * @LastEditTime: 2025-08-16 16:06:40
 * @Description: 
-->
<script setup>
import PasswordForm from "./password-form/index.vue";
import RegisterForm from "./register-form/index.vue";
import SmsForm from "./sms-form/index.vue";

const vm = inject("loginVM");
</script>

<template>
  <PasswordForm v-show="vm.currentTab.key === 'password'" />
  <RegisterForm v-show="vm.currentTab.key === 'register'" />
  <SmsForm v-show="vm.currentTab.key === 'sms'" />
</template>

<style lang="scss" scoped></style>

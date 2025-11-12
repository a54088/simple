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
// import LoginApi from "@/api/auth/index.js";
import MemberApi from "@/api/member/index.js";

const vm = inject("loginVM");

const inviteFormRef = ref();

const form = reactive({
  inviteCode: "",
});

// const form = computed({
//   set(val) {
//     vm.inviteForm = val;
//   },
//   get() {
//     return vm.inviteForm;
//   },
// });

const rules = {
  // "inviteCode": {
  //   required: true,
  //   message: "邀请码不能为空",
  //   // blur和change事件触发检验
  //   trigger: ["blur", "change"],
  // },
};


const onLeftClick = () => {
  vm.formType = "sms_login";
};

const onClick = async () => {
  // await inviteFormRef.value.validate();
  if (!form.inviteCode) {
    uni.showToast({
      title: "请输入邀请码",
      icon: "none",
    });
    return;
  }
  MemberApi.useInviteCode({
    inviteCode: form.inviteCode,
  }).then((res) => {
    if (res.code === 200) {
      uni.showToast({
        title: "邀请码校验成功",
        icon: "success",
      });
      // vm.formType = "sms_login";
    }
  }).catch((err) => {
    uni.showToast({
      title: err.msg || "邀请码校验失败",
      icon: "none",
    });
    console.log(err);
  });
};
</script>

<template>

  <view class="dice-form">
    <CustomNavbar leftIconColor="#000" title="" bgColor="transparent" :autoBack="false" :leftClick="onLeftClick"/>
    <u-form
    labelPosition="left"
    labelWidth="60"
    :model="form"
    :rules="rules"
    :borderBottom="false"
    ref="inviteFormRef"
    class="invite-form__layout"
  >
    <u-form-item prop="inviteCode" label="邀请码">
        <u-input
          v-model="form.inviteCode"
          border="none"
          type="number"
          placeholder="请输入邀请码"
        >
        </u-input>
    </u-form-item>
  </u-form>

  <button
    :class="[
      'login_button__layout',
    ]"
    @tap="onClick"
  >
    确 定
  </button>
  </view>
  
</template>

<style lang="scss" scoped>
.dice-form {
//   padding: 130rpx 0 0;
  background: url("@/static/images/login/invite/yaoqingbeijing.png");
}
</style>

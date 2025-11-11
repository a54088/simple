<script setup>
import { inject } from 'vue'

const vm = inject('homepageVM')

const rules = {
  "authInfo": {
    required: true,
    message: "验证信息不能为空",
    // blur和change事件触发检验
    trigger: ["blur", "change"],
  },
};

const close = () => {
    vm.showAddFriendPopup = false
}

const open = () => {
    vm.showAddFriendPopup = true
}
</script>

<template>
    <u-popup :show="vm.showAddFriendPopup" round="20rpx" @close="close" @open="open">
        <view class="add-friend-popup__content">
            <view class="add-friend-popup__title">添加好友</view>

            <u-form labelPosition="top" labelWidth="160" :model="vm.addFriendForm" :rules="rules" :borderBottom="false"
                ref="inviteFormRef" class="invite-form__layout">
                <u-form-item prop="authInfo" label="填写验证信息">
                    <u-input v-model="vm.addFriendForm.authInfo" border="none" type="number" placeholder="请输入好友验证信息">
                    </u-input>
                </u-form-item>

                <u-form-item prop="remark" label="设置备注">
                    <u-input v-model="vm.addFriendForm.remark" border="none" type="number" placeholder="请输入好友备注">
                    </u-input>
                </u-form-item>
            </u-form>
        </view>
    </u-popup>
</template>

<style lang="scss" scoped>
.add-friend-popup__content {
    padding: 70rpx 32rpx;

    .add-friend-popup__title {
        font-size: 40rpx;
        font-weight: 500;
        color: #000000;
        text-align: center;
        margin-bottom: 40rpx;
    }
}
</style>
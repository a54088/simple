<script setup>
import { inject } from 'vue'

const vm = inject('imVM')

const value1 = ref('')

const onConfirm = () => {
    if (value1.value) {
        vm.sendMessage(value1.value)
        value1.value = ''
    }
}
</script>

<template>
    <view class="chat__footer">
        <u-textarea class="chat__footer__textarea" round="40rpx" height="96rpx" v-model="value1" placeholder="请输入消息" border="none" autoHeight @confirm="onConfirm"></u-textarea>
    </view>
      <u-safe-bottom></u-safe-bottom>
</template>

<style lang="scss" scoped>
.chat__footer {
   padding: 0 32rpx 68rpx 32rpx; 
}
.chat__footer__textarea {
    padding: 26rpx 40rpx;
    font-size: 32rpx;
}
</style>
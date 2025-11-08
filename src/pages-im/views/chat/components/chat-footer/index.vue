<script setup>
const value1 = ref('')
</script>

<template>
    <view class="chat__footer">
        <u-textarea class="chat__footer__textarea" round="40rpx" height="96rpx" v-model="value1" placeholder="请输入消息" border="none" autoHeight></u-textarea>
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
<script setup>
import CustomTabbar from '@/components/custom-tabbar/index.vue'
import ChatList from './chat-list/index.vue'
import Contacts from './contacts/index.vue'
</script>
<template>
  <view class="im__layout">
    <u-status-bar></u-status-bar>
    <view>
        <ChatList />
        <Contacts />
    </view>
    <CustomTabbar />
  </view>
</template>

<style lang="scss" scoped>
.im__layout {
    height: 100%;
    background-color: #f5f5f5;
}
</style>
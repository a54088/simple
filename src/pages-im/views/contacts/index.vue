<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'

</script>
<template>
     <view class="chat-list__layout">
         <CustomNavbar :autoBack="false" @rightClick="onRightClick">
            <template v-slot:left>
                <text class="custom-navbar__title">聊天</text>
            </template>
            <template v-slot:right>
                   <ChatOperate :operateList="chatOperateList" :show="imVM.showChatOperate" @close="close" @open="open">
                     <text class="iconfont icon-gengduo"></text>
                   </ChatOperate>
            </template>
        </CustomNavbar>
     </view>
</template>
<style lang="sass" scoped></style>
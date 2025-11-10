<script setup>
import CustomTabbar from '@/components/custom-tabbar/index.vue'
import ChatList from './views/chat-list/index.vue'
import Contacts from './views/contacts/index.vue'
import Circle from './views/circle/index.vue'

import ZSwiper from '@zebra-ui/swiper/components/z-swiper/z-swiper.vue'
import ZSwiperItem from '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue'
import { useCustomTabbarStore } from "@/store/index.js";
import { provide, onMounted, computed, inject } from 'vue'

// let vm = new IMVM()
// provide('imVM', vm)
const customTabbarStore = useCustomTabbarStore();
const imVM = inject('imVM')
const currentTab = computed(() => customTabbarStore.currentTab);
const tabList = computed(() => customTabbarStore.tabList);
// onMounted(() => {
//     imVM.init()
// })
// onUnmounted(() => {
//     imVM = ''
// })
const swiperRef = ref(null)
onMounted(() => {
    customTabbarStore.swiperRef = swiperRef
})
</script>
<template>
    <view class="im__layout">
        <!-- <u-status-bar></u-status-bar> -->
        <ZSwiper ref="swiperRef" autoHeight>
            <ZSwiperItem v-for="(item, index) in tabList" :key="index">
                <view class="im__content">
                    <ChatList v-if="item.key === 'chat-list'" />
                    <Contacts v-if="item.key === 'contacts'" />
                    <Circle v-if="item.key === 'circle'" />
                </view>
            </ZSwiperItem>
        </ZSwiper>
        <CustomTabbar />
    </view>
</template>

<style lang="scss" scoped>
.im__layout {
    height: 100%;
}
</style>
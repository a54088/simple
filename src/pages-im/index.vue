<script setup>
import CustomTabbar from '@/components/custom-tabbar/index.vue'
import ChatList from './chat-list/index.vue'
import Contacts from './contacts/index.vue'
import ZSwiper from '@zebra-ui/swiper/components/z-swiper/z-swiper.vue'
import ZSwiperItem from '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue'
import { useCustomTabbarStore } from "@/store/index.js";
const customTabbarStore = useCustomTabbarStore();

const currentTab = computed(() => customTabbarStore.currentTab);
const tabList = computed(() => customTabbarStore.tabList);
</script>
<template>
    <view class="im__layout">
        <u-status-bar></u-status-bar>
        <ZSwiper>
            <ZSwiperItem v-for="(item, index) in tabList" :key="index">
               
                <view class="im__content">
                    <ChatList v-if="currentTab.key === 'chat-list'" />
                    <Contacts v-if="currentTab.key === 'contacts'" />
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
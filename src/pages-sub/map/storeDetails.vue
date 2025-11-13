<template>
    <view class="store-details">
        <!-- <u-swiper 
            :list="list1" 
            @change="change" 
            @click="click"
        ></u-swiper> -->
        轮播图<br />
        轮播图<br />
        轮播图<br />
        轮播图<br />
        轮播图<br />
        轮播图<br />
        轮播图<br />
    </view>
</template>

<script setup>
import { ref } from 'vue';

const list1 = ref([
    "https://uviewui.com/swiper/swiper1.png",
    "https://uviewui.com/swiper/swiper2.png",
    "https://uviewui.com/swiper/swiper3.png",
]);

const change = (e) => {
    console.log(e);
}

const click = (e) => {
    console.log(e);
}
</script>

<style lang="scss" scoped>
.store-details {}
</style>
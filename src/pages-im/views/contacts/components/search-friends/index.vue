<script setup>
import ImApi from "@/api/im/index";
import { onMounted } from "vue";
// import { emit } from 'vue'

const emit = defineEmits(['confirm'])

const onConfirm = (e) => {
    console.log(e);
    emit('confirm', e)
}
const guUrl = () => {
    uni.navigateTo({
        url: "/pages-im/views/add-friend/index",
    });
}
onMounted(() => {
    // ImApi.getFriendList().then((res) => {
    //     console.log(res);
    // })
})
</script>
<template>
    <view class="search-friends" @tap="guUrl">
        <!-- <icon type="search" size="20" style="color: #666;"/> -->
        <u-icon name="search" style="color: #666;margin-right:18rpx" size="24"></u-icon>

        <!-- <text :class="['iconfont', 'icon-a-zu16']" style="color: red;width: 22px;height: 22px;"></text> -->
        <text>搜索名称/账号</text>
        <!-- <u-input
	    placeholder="搜索名称/账号"
	    prefixIcon="search"
	    prefixIconStyle="font-size: 36rpx;color:#666"
        border="none"
        customStyle="height: 87rpx;padding: 0 26rpx"
        placeholderStyle="font-size: 24rpx;color:#666"
        :clearable="true"
        @confirm="onConfirm"
	></u-input> -->
    </view>
</template>

<style lang="scss" scoped>
.iconfont {
    margin-right: 20rpx
}
.search-friends {
    width: 100%;
    background: #fff;
    // border: 1rpx solid transparent;
    // border-image: linear-gradient(97deg, #FF194A 4%, #16C5FF 95%) 1;
    // backdrop-filter: blur(10rpx);
    border-radius: 20rpx;
    padding: 26rpx;
    display: flex;
    align-items: center;
    color: #666;
}
</style>
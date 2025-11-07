<template>
    <view 
        class="msg-avatar-group-close avatar-close-show"
        :style="{'width': showAvatarList.length * 20 + 'rpx'}"
    >
        <u-avatar 
            v-for="(item, i) in showAvatarList" 
            :key="i" 
            :src="item"
            :size="avatarSize"
            :style="{'z-index': 99 - i, left: i * translate + 'rpx'}"
        ></u-avatar>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    avatarList: {
        type: Array,
        default: () => []
    },
    maxCount: {
        type: Number,
    },
    translate: {
        type: Number,
        default: 12
    },
    avatarSize: {
        type: Number,
        default: 31
    }
});

const showAvatarList = computed(() => {
    return props.avatarList.slice(0, props.maxCount || props.avatarList.length);
});
</script>

<style lang="scss" scoped>
.msg-avatar-group-close {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rpx;
    position: relative;
    
    &.avatar-close-show {
        animation: avatarCloseIn 0.2s ease-in-out forwards;
    }
    
    .u-avatar {
        position: absolute;
    }
}
</style>
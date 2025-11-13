<template>
    <view 
        class="msg-avatar-group-close avatar-close-show"
        :style="{'width': showAvatarList.length * 20 + 'rpx', 'height': avatarSize + 'px'}"
    >
        <u-avatar 
            v-for="(item, i) in showAvatarList" 
            :key="i" 
            :src="item"
            :size="avatarSize"
            :style="{'z-index': getZIndex(i), left: i * translate + 'rpx'}"
        ></u-avatar>
    </view>
</template>

<script setup>
import { computed } from 'vue';

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
    },
    direction: {
        type: String,
        default: 'left', // 'left' | 'right'
        validator: (value) => ['left', 'right'].includes(value)
    }
});

const showAvatarList = computed(() => {
    return props.avatarList.slice(0, props.maxCount || props.avatarList.length);
});

const getZIndex = (index) => {
    if (props.direction === 'right') {
        // 从右往左：最后一个元素在最上层
        return showAvatarList.value.length + index;
    } else {
        // 从左往右：第一个元素在最上层（默认）
        return 99 - index;
    }
};
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
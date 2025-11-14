<script setup>
const props = defineProps({
    operateList: {
        type: Array,
        default: () => []
    },
    show: {
        type: Boolean,
        default: false
    },
    
})
const emit = defineEmits(['close', 'open', 'itemTap'])

const showChatOperate = computed(() => props.show)

const chatOperateList = computed(() => props.operateList)

const close = () => {
      emit('close')
}

const open = () => {
      emit('open')
}

const overlayClick = () => {
      close()
}

const handleTap = (item) => {
      emit('itemTap', item)
      if (item.path) {
            uni.navigateTo({
                  url: item.path
            })
      }
}
</script>
<template>
      <view>
            <u-overlay :show="showChatOperate" @click="overlayClick"></u-overlay>
            <view class="chat-operate__content">
                  <slot></slot>
                  <u-transition :show="showChatOperate">
                        <view class="chat-operate__layout">
                              <view class="chat-operate__item" v-for="(item, index) in chatOperateList" :key="index" @tap="handleTap(item)">
                                    <text :class="['iconfont', 'iconfont-init', item.icon]"></text>
                                    <view class="chat-operate__item__text">
                                          <text>{{ item.text }}</text>
                                    </view>

                              </view>
                        </view>
                  </u-transition>
            </view>
      </view>
</template>
<style lang="scss" scoped>
.chat-operate__content {
      position: relative;
      z-index: 99999;
}

.iconfont-init {
      font-size: 32rpx;
      color: #fff;
}

.chat-operate__layout {
      width: 260rpx;
      z-index: 999;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 20rpx;
      background: #292929;
      padding: 32rpx;
      &:before {
            content: '';
            position: absolute;
            top: -5rpx;
            right: 32rpx;
            width: 20rpx;
            height: 20rpx;
            border-radius: 4rpx;
            background: #292929;
            transform: rotate(45deg);
      }
      .chat-operate__item {
            display: flex;
            align-items: center;
            margin-bottom: 40rpx;
            &:last-of-type {
                  margin-bottom: 0;
            }
            .chat-operate__item__text {
                  margin-left: 20rpx;
                  // width: 112rpx;
                  font-size: 28rpx;
                  font-weight: 500;
                  color: #FFFFFF;
            }
      }
}
</style>
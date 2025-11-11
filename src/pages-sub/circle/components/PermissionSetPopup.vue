<template>
  <view>
    <!-- 遮罩层 -->
    <view v-if="show" class="psp__mask" @click="handleMaskClick"></view>

    <!-- 底部弹层 -->
    <view v-if="show" class="psp__sheet">
      <text class="iconfont icon-xiala psp__drag" style=""></text>


      <view class="psp__header">
        <text class="psp__title">谁可以看</text>
        <text class="psp__confirm" @click="handleConfirm">确认</text>
      </view>


      <view class="psp__list">
        <view v-for="item in innerOptions" :key="item.value" class="psp__item" @click="select(item.value)">
          <view class="psp__item-left">
            <text class="psp__icon" :class="item.icon"></text>
            <view class="psp__texts">
              <text class="psp__label">{{ item.label }}</text>
              <text class="psp__desc">{{ item.desc }}</text>
            </view>
          </view>

          <view class="psp__check">
            <text v-if="selected === item.value" class="iconfont icon-xuanzhong psp__check-icon"></text>
          </view>
        </view>
      </view>

      <view class="psp__safe"></view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  value: { type: String, default: '公开可见' },
  options: {
    type: Array,
    default: () => [
      { value: '仅自己可见', label: '仅自己可见', desc: '作品将只有自己可见', icon: 'iconfont icon-gongkai' },
      { value: '公开可见', label: '公开可见', desc: '作品将对所有用户可见', icon: 'iconfont icon-jinhaoyou' },
      { value: '仅好友可见', label: '仅好友可见', desc: '作品将仅好友可见', icon: 'iconfont icon-jinziji' }
    ]
  }
})

const emits = defineEmits(['update:show', 'confirm', 'change', 'cancel'])

const show = computed({
  get: () => props.show,
  set: v => emits('update:show', v)
})

const innerOptions = computed(() => props.options)
const selected = ref(props.value)

watch(
  () => props.value,
  v => (selected.value = v)
)

const select = (v) => {
  selected.value = v
  emits('change', v)
}

const handleConfirm = () => {
  emits('confirm', selected.value)
  show.value = false
}

const handleMaskClick = () => {
  emits('cancel')
  show.value = false
}
</script>

<style lang="scss" scoped>
.psp__mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 999;
}

.psp__sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  z-index: 1000;
  padding: 16rpx 24rpx 0;
}

.psp__drag {
  display: flex;
  align-items: center;
  justify-content: center;
}

.psp__header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rpx 4rpx 16rpx;
  position: relative;
}

.psp__title {
  font-size: 30rpx;
  color: #111;
  font-weight: 600;
}

.psp__confirm {
  font-size: 28rpx;
  color: #111;
  position: absolute;
  right: 0rpx;
}

.psp__list {
  padding-bottom: 8rpx;
}

.psp__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 8rpx;
}


.psp__item-left {
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.psp__icon {
  font-size: 40rpx;
  color: #000;
  width: 76rpx;
  height: 76rpx;
  background: #F4F4F4;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.psp__texts {
  display: flex;
  flex-direction: column;
}

.psp__label {
  font-size: 28rpx;
  color: #111;
}

.psp__desc {
  font-size: 22rpx;
  color: #9c9c9c;
}

.psp__check-icon {
  font-size: 32rpx;
  color: #111;
}

.psp__safe {
  height: calc(env(safe-area-inset-bottom, 0px) + 16rpx);
}
</style>

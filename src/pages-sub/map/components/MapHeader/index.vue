<template>
  <!-- 外层容器：承载阴影层和内容层 -->
  <cover-view class="header-container">
    <!-- 阴影模拟层（底层） -->
    <cover-view class="shadow-layer"></cover-view>
    <!-- 原始内容层（上层） -->
    <cover-view class="header-content">
      <cover-view class="title">{{ title }}</cover-view>
      <cover-view class="stats">
        <cover-view class="stats_item">活动 {{ activityCount }}</cover-view>
        <cover-view class="stats_item">圈友 {{ memberCount }}</cover-view>
      </cover-view>
    </cover-view>
  </cover-view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '闸弄口街道'
  },
  activityCount: {
    type: Number,
    default: 10
  },
  memberCount: {
    type: Number,
    default: 29919
  }
})
</script>

<style lang="scss" scoped>
// 外层容器：相对定位，控制整体位置
.header-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 329rpx; // 与内容层高度一致
  z-index: 1000;
}

// 阴影模拟层：通过半透明渐变和偏移实现阴影效果
.shadow-layer {
  position: absolute;
  top: 2rpx; // 向下偏移一点，模拟阴影位置
  left: 0;
  right: 0;
  bottom: 0;
  // 横向渐变模拟阴影扩散（左右淡入淡出）
  background: linear-gradient(90deg, 
    rgba(0, 0, 0, 0.2) 0%, 
    rgba(0, 0, 0, 0.3) 50%, 
    rgba(0, 0, 0, 0.2) 100%
  );
  // 叠加纵向渐变增强底部阴影感
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  opacity: 0.6; // 控制阴影浓度
}

// 原始内容层：保持原有样式，覆盖在阴影上
.header-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 40rpx 24rpx 24rpx;
  background: linear-gradient(180deg, #181818 0%, rgba(24, 24, 24, 0) 100%);
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .title {
    font-size: 50rpx;
    font-weight: 600;
    color: #fff;
    margin-bottom: 16rpx;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
  }

  .stats {
    display: flex;
    gap: 20rpx;

    &_item {
      font-size: 32rpx;
      color: #fff;
      margin-right: 30rpx;
    }
  }
}
</style>
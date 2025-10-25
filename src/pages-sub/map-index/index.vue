<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-25 15:41:22
 * @Description: 
-->
<script setup>
import { ref, onMounted } from "vue";

// 当前位置坐标
const currentLatitude = ref(39.9042);
const currentLongitude = ref(116.4074);

// 获取当前位置
const getCurrentLocation = () => {
  uni.getLocation({
    type: "gcj02", // 返回可以用于uni.openLocation的经纬度
    success: (res) => {
      console.log("获取位置成功:", res);
      currentLatitude.value = res.latitude;
      currentLongitude.value = res.longitude;

      // 更新当前位置标记
      updateCurrentLocationMarker(res.latitude, res.longitude);

      uni.showToast({
        title: "位置获取成功",
        icon: "success",
      });
    },
    fail: (err) => {
      console.error("获取位置失败:", err);
      uni.showToast({
        title: "位置获取失败",
        icon: "none",
      });
    },
  });
};

// 更新当前位置标记
const updateCurrentLocationMarker = (lat, lng) => {
  // 查找或创建当前位置标记
  const currentLocationMarker = markers.value.find((m) => m.id === 0);
  if (currentLocationMarker) {
    // 更新现有标记位置
    currentLocationMarker.latitude = lat;
    currentLocationMarker.longitude = lng;
  } else {
    // 添加新标记
    markers.value.unshift({
      id: 0,
      latitude: lat,
      longitude: lng,
      iconPath: "@/static/logo.png",
      width: 40,
      height: 40,
      title: "我的位置",
      anchor: { x: 0.5, y: 1 },
      callout: {
        content: `当前位置\n纬度: ${lat.toFixed(6)}\n经度: ${lng.toFixed(6)}`,
        color: "#FFFFFF",
        fontSize: 12,
        borderRadius: 5,
        bgColor: "#FF6B6B",
        padding: 5,
        display: "ALWAYS",
      },
    });
  }
};

// 组件挂载时获取位置
onMounted(() => {
  getCurrentLocation();
});

// 标记点击事件
const onMarkerTap = (e) => {
  console.log("标记被点击:", e.detail.markerId);
  // 可以根据markerId执行不同的操作
  switch (e.detail.markerId) {
    case 1:
      console.log("点击了总部位置");
      break;
    case 2:
      console.log("点击了分部位置");
      break;
    case 3:
      console.log("点击了重要地点");
      break;
    case 4:
      console.log("点击了普通标记");
      break;
  }
};

// 气泡点击事件
const onCalloutTap = (e) => {
  console.log("气泡被点击:", e.detail.markerId);
  uni.showToast({
    title: `查看标记 ${e.detail.markerId} 详情`,
    icon: "none",
  });
};
const polygons = [
  {
    points: [
      { latitude: 39.91, longitude: 116.395 },
      { latitude: 39.915, longitude: 116.4 },
      { latitude: 39.91, longitude: 116.405 },
      { latitude: 39.905, longitude: 116.4 },
    ],
    strokeColor: "#FF0000",
    strokeWidth: 3,
  },
  {
    points: [
      { latitude: 39.9, longitude: 116.385 },
      { latitude: 39.905, longitude: 116.39 },
      { latitude: 39.9, longitude: 116.395 },
      { latitude: 39.895, longitude: 116.39 },
    ],
    strokeColor: "#00FF00",
    strokeWidth: 3,
  },
];

// 标记数组 - 使用ref使其响应式
const markers = ref([
  {
    id: 1,
    latitude: 39.909,
    longitude: 116.39742,
    iconPath: "../../../static/logo.png",
    width: 30,
    height: 30,
    title: "总部位置",
    anchor: { x: 0.5, y: 1 },
  },
  {
    id: 2,
    latitude: 39.9,
    longitude: 116.39,
    iconPath: "@/static/logo.png",
    width: 25,
    height: 25,
    title: "分部位置",
    anchor: { x: 0.5, y: 1 },
  },
  {
    id: 3,
    latitude: 39.915,
    longitude: 116.405,
    iconPath: "@/static/logo.png",
    width: 35,
    height: 35,
    title: "重要地点",
    anchor: { x: 0.5, y: 1 },
    callout: {
      content: "这是重要地点\n点击查看详情",
      color: "#FFFFFF",
      fontSize: 14,
      borderRadius: 5,
      bgColor: "#007AFF",
      padding: 5,
      display: "ALWAYS",
    },
  },
  {
    id: 4,
    latitude: 39.895,
    longitude: 116.385,
    iconPath: "@/static/logo.png",
    width: 20,
    height: 20,
    title: "普通标记",
    anchor: { x: 0.5, y: 0.5 },
    alpha: 0.8,
  },
]);
</script>

<template>
  <view class="map__layout">
    <map
      style="width: 100vw; height: 100vh"
      :latitude="currentLatitude"
      :longitude="currentLongitude"
      :markers="markers"
      :polygons="polygons"
      show-location
      @markertap="onMarkerTap"
      @callouttap="onCalloutTap"
    >
    </map>

    <!-- 获取位置按钮 -->
    <view class="location-btn" @click="getCurrentLocation">
      <text class="location-btn-text">📍 获取位置</text>
    </view>

    <view class="map__marker">
      <view class="map__marker__content">
        <view class="map__marker__title">当前位置</view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.map__layout {
  position: relative;
}

.location-btn {
  position: absolute;
  bottom: 50px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  padding: 10px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  &-text {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>

<template>
  <view class="map-container">
    <!-- 地图容器 -->
    <view id="mapContainer" class="map"></view>
    <!-- 操作按钮 -->
    <view class="btn-group">
      <button @click="addMarker">添加标记</button>
      <button @click="clearMarkers">清除标记</button>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// 地图实例和标记数组
const map = ref(null);
const markers = ref([]); // 存储所有标记实例
const userMarker = ref(null); // 单独存储本人位置标记

// 预设4个不同位置的经纬度（保持不变）
const presetPositions = [
  [116.397428, 39.90923],    // 位置1（北京中心）
  [116.410783, 39.911816],    // 位置2（稍偏东）
  [116.385457, 39.918223],    // 位置3（稍偏西）
  [116.397428, 39.898567]     // 位置4（稍偏南）
];

// 初始化地图
const initMap = () => {
  map.value = new AMap.Map('mapContainer', {
    zoom: 13,
    center: [116.397428, 39.90923] // 初始中心点
  });

  // 获取当前定位并添加本人位置标记
  map.value.plugin('AMap.Geolocation', () => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000
    });
    map.value.addControl(geolocation);
    geolocation.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        map.value.setCenter(result.position);
        // 添加本人位置标记（特殊样式）
        addUserPositionMarker(result.position);
      }
      // 添加预设的4个标记（保持原有逻辑）
      addPresetMarkers();
    });
  });
};

// 添加本人位置标记（特殊样式：蓝色底+头像阴影）
const addUserPositionMarker = (position) => {
  userMarker.value = new AMap.Marker({
    position: position,
    title: '我的位置',
    content: `
      <div style="position: relative; width: 54px; height: 65px;">
        <!-- 蓝色圆形背景 -->
        <div style="width: 54px; height: 54px; border-radius: 50%; background: #409EFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(64, 158, 255, 0.8);">
          <!-- 本人头像（带阴影） -->
          <img src="/static/map/avatar1.svg" style="width: 48px; height: 48px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);" />
        </div>
        <!-- 底部蓝色尖角 -->
        <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 11px solid #409EFF;"></div>
        <!-- 中心定位点 -->
        <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 50%; background: #409EFF; border: 2px solid white;"></div>
      </div>
    `,
    anchor: 'bottom-center'
  });

  userMarker.value.addTo(map.value);
  markers.value.push(userMarker.value); // 加入标记数组统一管理
};

// 添加预设的4个标记（保持原有样式不变）
const addPresetMarkers = () => {
  if (!map.value) return;
  
  presetPositions.forEach((position, index) => {
    const avatarNum = index + 1; // 头像序号1-4
    const marker = new AMap.Marker({
      position: position,
      title: `标记 ${avatarNum}`,
      content: `
        <div style="position: relative; width: 54px; height: 60px;">
          <!-- 黑色圆形背景 -->
          <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;">
            <img src="/static/map/avatar${avatarNum}.svg" style="width: 48px; height: 48px; border-radius: 50%;" />
          </div>
          <!-- 底部黑色尖角 -->
          <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid #000;"></div>
        </div>
      `,
      anchor: 'bottom-center'
    });

    marker.addTo(map.value);
    markers.value.push(marker);
  });
};

// 添加标记（保持原有逻辑）
const addMarker = () => {
  if (!map.value) return;

  const center = map.value.getCenter();
  const marker = new AMap.Marker({
    position: center,
    title: `标记 ${markers.value.length + 1}`,
    content: `
     <div style="position: relative; width: 54px; height: 60px;">
        <!-- 黑色圆形背景 -->
        <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;">
          <img src="/static/map/avatar1.svg" style="width: 48px; height: 48px; border-radius: 50%;" />
        </div>
        <!-- 底部尖角 -->
        <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid #000;"></div>
      </div>
    `,
    anchor: 'bottom-center'
  });

  marker.addTo(map.value);
  markers.value.push(marker);
};

// 清除所有标记（保持原有逻辑）
const clearMarkers = () => {
  markers.value.forEach(marker => marker.remove());
  markers.value = [];
  userMarker.value = null; // 重置本人位置标记
};

onMounted(() => {
  initMap();
});
</script>

<style scoped>
/* 保持原有样式不变 */
.map-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.btn-group {
  position: absolute;
  bottom: 30rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20rpx;
  z-index: 10;
}

button {
  padding: 15rpx 30rpx;
  background-color: #007aff;
  color: white;
  border-radius: 8rpx;
}
</style>
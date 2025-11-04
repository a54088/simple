<!-- index.vue -->
<template>
  <view class="map_container">
    <map style="width: 100%; height: 100%" :markers="markers" :latitude="currentLatitude" :longitude="currentLongitude"
      ref="mapRef" :show3D="true" :skew="30" :rotate="0">
    </map>
    <MapHeader class="header_wrap" />
    <MapSide class="side_wrap" />
    <MapFooter class="footer_wrap" />
  </view>
</template>

<script setup>

import { ref, onMounted, nextTick } from "vue";
import { useMap } from './hooks/useMap';
import MapHeader from './components/MapHeader';
import MapFooter from './components/MapFooter';
import MapSide from './components/MapSide';

// 地图实例引用
const mapRef = ref(null);
// 初始化地图钩子
const { markers, currentLatitude, currentLongitude, initMap } = useMap();


onMounted(() => {
  // 等待组件渲染完成后再获取地图实例
  nextTick(() => {
    initMap(mapRef.value);
  });
});
</script>

<style scoped>
.map_container {
  width: 100%;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;
}

.overlay_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  pointer-events: none;
}

map {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
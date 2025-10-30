<template>
  <view class="map_container">
    <!-- 头部组件 -->
    <MapHeader title="闸弄口街道" :activityCount="10" :memberCount="29919" />
    <!-- 右上角菜单 -->
    <MapSide/>

    <!-- 地图容器 -->
    <view id="mapContainer" class="map"></view>

    <!-- 底部导航组件 -->
    <MapFooter />
  </view>
</template>

<script setup>
import { useMap } from './hooks/useMap';
import MapHeader from './components/MapHeader';
import MapFooter from './components/MapFooter';
import MapSide from './components/MapSide'; // 引入菜单组件


// 使用地图Hook
const { addMarker, clearMarkers } = useMap('mapContainer');
</script>

<style scoped>
.map_container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
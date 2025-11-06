<!-- index.vue -->
<template>
  <view class="map_container">
    <map style="width: 100%; height: 100%" :markers="markers" :latitude="currentLatitude" :longitude="currentLongitude"
      ref="mapRef" :show3D="true" :skew="30" :rotate="0" @markertap="handleMarkerTap">
      <!-- 自定义定位按钮 -->
      <cover-view class="location-btn" @click="moveToCurrentLocation">
        <cover-image src="/static/map/position.png" mode="aspectFit" @click="moveToCurrentLocation"></cover-image>
      </cover-view>
    </map>
    <MapHeader class="header_wrap" />
    <MapSide class="side_wrap" />
    <MapFooter class="footer_wrap" />
    <AddFriend :visible="popupShow" title="不会捏蛋" desc="已持续和28位用户交流" :avatars="userAvatars" buttonText="+ 添加好友"
      @close="popupShow = false" @action="handleAddFriend" />
  </view>
</template>

<script setup>

import { ref, onMounted, nextTick } from "vue";
import { useMap } from './hooks/useMap';
import MapHeader from './components/MapHeader';
import MapFooter from './components/MapFooter';
import MapSide from './components/MapSide';
import AddFriend from './components/AddFriend';





// 地图实例引用
const mapRef = ref(null);
// 初始化地图钩子
const { markers, currentLatitude, currentLongitude, initMap } = useMap();
// 获取当前位置并移动地图
const moveToCurrentLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    timeout: 5000,
    success: (res) => {
      currentLatitude.value = res.latitude;
      currentLongitude.value = res.longitude;
      // 调用地图实例的 moveToLocation 方法，将地图中心移动到当前位置
      mapRef.value.moveToLocation({
        latitude: res.latitude,
        longitude: res.longitude
      });
    },
    fail: (err) => {
      uni.showToast({ title: '定位失败', icon: 'none' });
    }
  });
};

//展示弹框
const popupShow = ref(false);
const userAvatars = ref([
  '/static/map/avatar1.webp',
  '/static/map/avatar2.webp',
  '/static/map/avatar3.webp',
  '/static/map/avatar4.webp',
  '/static/map/avatar5.webp',
]);
// handleMarkerTap
const handleMarkerTap = (e) => {
  // console.log('Marker tapped:', e);
  const markerId = e.detail.markerId;
  // console.log('点击了标记，id为：', markerId);
  // 根据id查找对应的标记详情
  const clickedMarker = markers.value.find(marker => marker.id === markerId);
  // console.log('点击的标记详情：', clickedMarker);
  popupShow.value = true;
  
}


// 添加好友
const handleAddFriend = (e) => {
  
}

onMounted(() => {
  // 等待组件渲染完成后再获取地图实例
  nextTick(() => {
    initMap(mapRef.value);
  });
});
</script>

<style lang="scss" scoped>
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

.location-btn {
  position: absolute;
  bottom: 340rpx;
  left: 40rpx;
  width: 96rpx;
  height: 96rpx;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  padding: 24rpx;
  border-radius: 25rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.location-btn image {
  width: 40rpx;
  height: 40rpx;
}
</style>
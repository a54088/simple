// hooks/useMap.js
import { ref } from 'vue';

export function useMap() {
  // 地图实例
  const map = ref(null);
  // 当前位置坐标
  const currentLatitude = ref(39.9042);
  const currentLongitude = ref(116.4074);
  // 标记数组
  const markers = ref([
    {
      id: 1,
      latitude: 39.909,
      longitude: 116.39742,
      iconPath: "/static/map/avatar1.webp",
      width: 48,
      height: 48,
      // title: "总部位置",
      anchor: { x: 0.5, y: 1 },
      label: {
        content: ' ',
        fontSize: 14,
        bgColor: '#73FF86',
        borderRadius: 200,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        anchorX: -10,
        anchorY: -48,
        // border:
        padding: 5
      }
    },
    {
      id: 2,
      latitude: 39.9,
      longitude: 116.39,
      iconPath: "/static/map/avatar2.webp",
      width: 48,
      height: 48,
      // title: "分部位置",
      anchor: { x: 0.5, y: 1 },
    },
    {
      id: 3,
      latitude: 39.915,
      longitude: 116.405,
      iconPath: "/static/map/avatar3.webp",
      width: 48,
      height: 48,
      // title: "重要地点",
      anchor: { x: 0.5, y: 1 },
      // callout: {
      //   content: "这是重要地点\n点击查看详情",
      //   color: "#FFFFFF",
      //   fontSize: 14,
      //   borderRadius: 5,
      //   bgColor: "#007AFF",
      //   padding: 5,
      //   display: "ALWAYS",
      // },
    },
    {
      id: 4,
      latitude: 39.895,
      longitude: 116.385,
      iconPath: "/static/map/avatar4.webp",
      width: 48,
      height: 48,
      // title: "普通标记",
      anchor: { x: 0.5, y: 0.5 },
      alpha: 0.8,
    },
  ]);

  /**
   * 初始化地图
   * @param {Object} mapInstance 地图组件实例
   */
  const initMap = (mapInstance) => {
    map.value = mapInstance;
    console.log('地图初始化');


    // 获取定位
    uni.getLocation({
      type: "gcj02",
      success: (res) => {
        console.log("获取位置成功:", res);
        currentLatitude.value = res.latitude;
        currentLongitude.value = res.longitude;
        updateCurrentLocationMarker(res.latitude, res.longitude);

        // 移动地图中心到当前位置
        map.value.moveToLocation({
          latitude: res.latitude,
          longitude: res.longitude
        });

        uni.showToast({
          title: "位置获取成功",
          icon: "success",
        });
      },
      fail: (err) => {
        uni.showToast({
          title: "位置获取失败，使用默认位置",
          icon: "none",
        });
      }
    });
  };

  /**
   * 更新当前位置标记
   */
  const updateCurrentLocationMarker = (lat, lng) => {
    const currentLocationMarker = markers.value.find(m => m.id === 0);
    if (currentLocationMarker) {
      currentLocationMarker.latitude = lat;
      currentLocationMarker.longitude = lng;
    } else {
      markers.value.unshift({
        id: 0,
        latitude: lat,
        longitude: lng,
        iconPath: "/static/map/avatar1.webp",
        width: 40,
        height: 40,
        title: "我的位置",
        anchor: { x: 0.5, y: 1 },
        callout: {
          content: `当前位置\n纬度: ${lat.toFixed(6)}\n经度: ${lng.toFixed(6)}`,
          color: "#FF6B6B",
          fontSize: 12,
          borderRadius: 5,
          bgColor: "#FF6B6B",
          padding: 5,
          display: "ALWAYS",
        },
      });
    }
  };

  /**
   * 添加默认用户标记（定位失败时）
   */
  const addUserMarker = (lat, lng) => {
    currentLatitude.value = lat;
    currentLongitude.value = lng;
    updateCurrentLocationMarker(lat, lng);
  };

  /**
   * 添加普通标记
   */
  const addMarker = (item) => {
    console.log('添加普通标记', item);
    const markerData = {
      id: item.id,
      longitude: item.longitude,
      latitude: item.latitude,
      iconPath: `/static/map/avatar${item.id}.webp`,
      width: 48,
      height: 48,
      anchor: { x: 0.5, y: 1 },
      zIndex: 50,
      title: `标记 ${item.id}`
    };
    markers.value.push(markerData);
    return markerData.id;
  };

  /**
   * 清除所有标记
   */
  const clearMarkers = () => {
    console.log('清除所有标记');
    if (!map.value) return;

    // 调用插件的删除方法
    markers.value.forEach(marker => {
      if (marker.id) map.value.removeMarker(marker.id);
    });

    // 清空数组
    markers.value = [];
  };

  return {
    map,
    markers,
    currentLatitude,
    currentLongitude,
    addMarker,
    clearMarkers,
    initMap
  };
}
import { ref, onMounted } from 'vue';

export function useMap(containerId) {
  // 地图实例和标记管理
  const map = ref(null);
  const markers = ref([]);
  const userMarker = ref(null);

  // 预设位置
  const presetPositions = [
    {
      id: 1,
      latitude: 116.397428,
      longitude: 39.90923,
    },
    {
      id: 2,
      latitude: 116.410783,
      longitude: 39.911816,
    },
    {
      id: 3,
      latitude: 116.385457,
      longitude: 39.918223,
    },
    {
      id: 4,
      latitude: 116.397428,
      longitude: 39.898567,
    }
  ];

  // 初始化地图
  const initMap = () => {
    map.value = new AMap.Map(containerId, {
      zoom: 13,
      center: [116.397428, 39.90923]
    });

    // 获取定位并添加标记
    map.value.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,// 是否使用高精度定位，默认：true
        timeout: 10000,// 设置定位超时时间，默认：无穷大
        offset: [10, 20],  // 定位按钮的停靠位置的偏移量
        zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        position: 'RB' //  定位按钮的排放位置,  RB表示右下
      });
      map.value.addControl(geolocation);
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          map.value.setCenter(result.position);
          addUserPositionMarker(result.position);
        }
        addPresetMarkers();
      });
    });
  };

  // 添加用户标记
  const addUserPositionMarker = (position) => {
    userMarker.value = new AMap.Marker({
      position: position,
      title: '我的位置',
      content: `
        <div style="position: relative; width: 54px; height: 65px;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;">
            <img src="/static/map/avatar1.webp" style="width: 48px; height: 48px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);" />
          </div>
                <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid #000;z-index:2"></div>
            <img style="position: absolute;width: 90px;height: 68px;top: 27px;left: 11px;" src="/static/map/avatarBack.webp"/>
        </div>
      `,
      anchor: 'bottom-center'
    });

    userMarker.value.addTo(map.value);
    markers.value.push(userMarker.value);
  };

  // 添加预设标记
  const addPresetMarkers = () => {
    if (!map.value) return;
    presetPositions.forEach((item) => {
      addMarker(item);   
    });
  };

  // 添加新标记
  const addMarker = (item) => {
    if (!map.value) return;
    const marker = new AMap.Marker({
      position: [item.latitude, item.longitude],
      title: `标记 ${markers.value.length + 1}`,
      content: `
         <div style="position: relative; width: 54px; height: 60px;">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;">
              <img src="/static/map/avatar${item.id}.webp" style="width: 48px; height: 48px; border-radius: 50%;" />
            </div>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid #000;"></div>
          </div>
      `,
      anchor: 'bottom-center'
    });

    marker.addTo(map.value);
    markers.value.push(marker);
  };

  // 清除所有标记
  const clearMarkers = () => {
    markers.value.forEach(marker => marker.remove());
    markers.value = [];
    userMarker.value = null;
  };

  onMounted(() => {
    initMap();
  });

  return {
    map,
    markers,
    userMarker,
    addMarker,
    clearMarkers
  };
}
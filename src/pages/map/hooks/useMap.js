import { ref, onMounted } from 'vue';

export function useMap(containerId) {
  // 地图实例和标记管理
  const map = ref(null);
  const markers = ref([]);
  const userMarker = ref(null);

  // 预设位置
  const presetPositions = [
    [116.397428, 39.90923],
    [116.410783, 39.911816],
    [116.385457, 39.918223],
    [116.397428, 39.898567]
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
        enableHighAccuracy: true,
        timeout: 10000
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
          <div style="width: 54px; height: 54px; border-radius: 50%; background: #409EFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px rgba(64, 158, 255, 0.8);">
            <img src="/static/map/avatar1.webp" style="width: 48px; height: 48px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);" />
          </div>
          <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 11px solid #409EFF;"></div>
          <div style="position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 50%; background: #409EFF; border: 2px solid white;"></div>
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

    presetPositions.forEach((position, index) => {
      const avatarNum = index + 1;
      let markerContent = '';

      if (index === 0) {
        markerContent = `
          <div style="position: relative; width: 54px; height: 60px;">
            <div style="position: absolute; bottom: -13px; left: 50%; transform: translateX(-50%); width: 20px; height: 20px; border-radius: 50%; background: #16C5FF;border:3px solid #000;z-index:1"></div>
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;position: absolute;z-index:3;">
              <img src="/static/map/avatar${avatarNum}.webp" style="width: 48px; height: 48px; border-radius: 50%;" />
            </div>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid #000;z-index:2"></div>
            <img style="position: absolute;width: 90px;height: 68px;top: 26px;left: 11px;" src="/static/map/avatarBack.webp"/>
          </div>
        `;
      } else {
        markerContent = `
          <div style="position: relative; width: 54px; height: 60px;">
            <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;">
              <img src="/static/map/avatar${avatarNum}.webp" style="width: 48px; height: 48px; border-radius: 50%;" />
            </div>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 9px solid #000;"></div>
          </div>
        `;
      }

      const marker = new AMap.Marker({
        position: position,
        title: `标记 ${avatarNum}`,
        content: markerContent,
        anchor: 'bottom-center'
      });
      marker.addTo(map.value);
      markers.value.push(marker);
    });
  };

  // 添加新标记
  const addMarker = () => {
    if (!map.value) return;

    const center = map.value.getCenter();
    const marker = new AMap.Marker({
      position: center,
      title: `标记 ${markers.value.length + 1}`,
      content: `
        <div style="position: relative; width: 54px; height: 60px;">
          <div style="width: 54px; height: 54px; border-radius: 50%; background: #000; display: flex; align-items: center; justify-content: center;">
            <img src="/static/map/avatar1.webp" style="width: 48px; height: 48px; border-radius: 50%;" />
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
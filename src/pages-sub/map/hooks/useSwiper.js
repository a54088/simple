import { ref } from 'vue'

export default function useSwiper() {
  // 轮播数据
  const swiperList = ref([
    {
      label: '家附近新开了一家餐厅',
      path: '/static/map/restaurantSwiper1.png',
      key: 'restaurantSwiper1',
    },
    {
      label: '家附近新开了一家餐厅',
      path: '/static/map/restaurantSwiper2.png',
      key: 'restaurantSwiper2',
    },
    {
      label: '家附近新开了一家餐厅',
      path: '/static/map/restaurantSwiper1.png',
      key: 'restaurantSwiper3',
    },
  ])

  // 轮播当前索引(预留扩展)
  const currentSwiperIndex = ref(0)

  // 切换轮播索引(预留扩展)
  const setSwiperIndex = (index) => {
    currentSwiperIndex.value = index
  }

  return {
    swiperList,
    currentSwiperIndex,
    setSwiperIndex
  }
}
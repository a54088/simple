import { ref, computed } from 'vue'

export default function useDatePicker() {
  // 日期数据
  const date = ref('')

  // 开始日期计算
  const startDate = computed(() => {
    return getDate('start')
  })

  // 结束日期计算
  const endDate = computed(() => {
    return getDate('end')
  })

  // 日期格式化工具函数
  const getDate = (type) => {
    const date = new Date()
    let year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    // 根据类型调整年份
    if (type === 'start') {
      year = year - 10
    } else if (type === 'end') {
      year = year + 10
    }

    // 补零处理
    const formatMonth = month > 9 ? month : `0${month}`
    const formatDay = day > 9 ? day : `0${day}`
    return `${year}-${formatMonth}-${formatDay}`
  }

  // 日期变更处理
  const bindDateChange = (e) => {
    date.value = e.detail.value
  }

  // 初始化日期
  const initDate = () => {
    date.value = getDate()
  }

  return {
    date,
    startDate,
    endDate,
    bindDateChange,
    initDate
  }
}
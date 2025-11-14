<template>
    <!-- 骰子组件 -->
    <view class="dice-wrap">
        <!-- 筛子运动时候的展示的图片 -->
        <image v-if="isDicing" :src="diceAnimationImages[aniIndex]" class="dice-icon"></image>
        <!-- 筛子运动时候的展示的图片 -->

        <!-- 筛子静止时候的显示的对应点数的图片 -->
        <image v-else :src="diceImages[currentPoint]" class="dice-icon"></image>
        <!-- 筛子静止时候的显示的对应点数的图片 -->
    </view>
    <!-- 骰子组件 -->
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'

// 导入骰子动画图片
import diceA from '@/static/images/dice-tag/diceA.png'
import diceB from '@/static/images/dice-tag/diceB.png'
import diceC from '@/static/images/dice-tag/diceC.png'
import diceD from '@/static/images/dice-tag/diceD.png'

// 导入骰子点数图片
import dice1 from '@/static/images/dice-tag/dice1.png'
import dice2 from '@/static/images/dice-tag/dice2.png'
import dice3 from '@/static/images/dice-tag/dice3.png'
import dice4 from '@/static/images/dice-tag/dice4.png'
import dice5 from '@/static/images/dice-tag/dice5.png'
import dice6 from '@/static/images/dice-tag/dice6.png'

// 定义事件
const emit = defineEmits(['ok'])
const props = defineProps({
    currentValue: {
        type: Number,
        default: 1
    }
})

// 是否正在掷筛子
const isDicing = ref(false)
// 当前显示的动画图片索引
const aniIndex = ref(0)
// 当前掷筛子掷到的点数（默认1点）
const currentPoint = ref(props.currentValue)
// 定时器
let timer = null

// 掷筛子动画所用到的图片(4张骰子旋转过程中的图)
const diceAnimationImages = [
    diceA,
    diceB,
    diceC,
    diceD,
]

// 骰子每一个点的对应的图片
const diceImages = {
    //1点的图片
    1: dice1,
    //2点的图片
    2: dice2,
    //3点的图片
    3: dice3,
    //4点的图片
    4: dice4,
    //5点的图片
    5: dice5,
    //6点的图片
    6: dice6,
}

// 开启动画效果
async function startAnimation() {
    return new Promise((resolve) => {
        // 设置筛子开始运动
        isDicing.value = true
        // 记录动画次数
        let num = 0
        // 每隔200毫秒来回切换一张"动"图形成掷骰子的动画
        timer = setInterval(() => {
            let index = aniIndex.value
            index++
            if (index >= diceAnimationImages.length) {
                index = 0
            }
            aniIndex.value = index
            num++
            // 差不多执行1.6秒钟的时候可以停止了
            if (num > 8) {
                // 关闭定时器
                clearInterval(timer)
                // 设置骰子停止
                isDicing.value = false
                // 返回结果
                resolve(true)
            }
        }, 100)
    })
}
// 掷骰子
async function throwDice(num) {
    // 如果当前骰子正在滚动则不能掷骰子
    if (isDicing.value) {
        return
    }
    // 从1~6随机一个数
    currentPoint.value = num || props.currentValue
    // 开启骰子动画
    await startAnimation()
    // 动画完毕之后可以通知父组件当前掷到的点数
    emit('ok', currentPoint.value)
}
const setCurrentValue = (value) => {
    currentPoint.value = value
}

defineExpose({
    throwDice,
    setCurrentValue
})
// 组件销毁之前清除定时器
onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>

<style lang="scss">
.dice-wrap {
    .dice-icon {
        width: 160rpx;
        height: 160rpx;
    }
}
</style>
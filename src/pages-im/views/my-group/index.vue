<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'

const tabList = [
    {
        num: 2,
        label: '我创建的',
    },
    {
        num: 0,
        label: '我管理的',
    },
    {
        num: 0,
        label: '我加入的',
    }
]

const tabIndex = ref(0)
</script>

<template>
    <view class="my-group__layout">
        <CustomNavbar title="我的群组" bgColor="transparent" />
        <view class="my-group__content">
            <u-row>
                <u-col span="4" v-for="(item, index) in tabList" :key="item.label">
                    <view :class="{'new-friend__item--active': index === tabIndex}" class="new-friend__item" @tap="tabIndex = index">
                        <view class="new-friend__item__num">
                            {{ item.num }}
                        </view>
                        <view class="new-friend__item-content">
                            {{ item.label }}
                        </view>
                    </view>
                </u-col>

            </u-row>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.my-group__content {
    margin-top: 54rpx;
}

.new-friend__item--active {
    &:after {
        display: block !important;
    }
}
.new-friend__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &:after {
        display: none;
        bottom: -10rpx;
        content: '';
        position: absolute;
        width: 42rpx;
        height: 6rpx;
        border-radius: 216rpx;
        background: #FF194A;
    }

    .new-friend__item-content {
        font-size: 22rpx;
        color: #636363;
    }

    .new-friend__item__num {
        font-size: 32rpx;
        color: #000000;
    }
}
</style>

<script setup>
import SearchFriends from '../search-friends/index.vue'
import NewFriends from '../new-friends/index.vue'
const indexList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const itemArr = [
    ['列表A1', '列表A2', '列表A3'],
    ['列表B1', '列表B2', '列表B3'],
    ['列表C1', '列表C2', '列表C3'],
    ['列表D1', '列表D2', '列表D3'],
    ['列表E1', '列表E2', '列表E3'],
    ['列表F1', '列表F2', '列表F3'],
]
</script>

<template>
    <u-index-list :index-list="indexList">
         <view class="view__layout">
             <SearchFriends />
         </view>
         <view class="view__layout">
             <NewFriends />
         </view>
            <template v-for="(item, index) in itemArr">

                <u-index-item>
                    <view class="index-item__layout">
                        <view>{{ indexList[index] }}</view>
                        <view class="index-item__cell-layout">
                            <view class="list-cell" v-for="(cell, index) in item">
                                <u-avatar :src="''"></u-avatar>
                                <text class="list-cell__text">{{ cell }}</text>
                            </view>
                        </view>
                    </view>

                </u-index-item>
            </template>
        <view class="chat-list__safe__layout"></view>
    </u-index-list>
</template>

<style lang="scss" scoped>
.view__layout {
    padding: 32rpx 0;
}
.chat-list__safe__layout {
    height: calc(32rpx + 108rpx + 108rpx);
}
.index-item__layout {
    display: flex;

    .index-item__cell-layout {
        margin-left: 30rpx;

        .list-cell {
            display: flex;
            align-items: center;
            margin-bottom: 28rpx;

            .list-cell__text {
                margin-left: 24rpx;
                font-size: 32rpx;
                font-weight: 500;
                color: #000000;
            }
        }
    }
}
</style>
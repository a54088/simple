<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'
import SearchFriends from './components/search-friends/index.vue'
import NewFriends from './components/new-friends/index.vue'
import IndexList from './components/index-list/index.vue'
</script>
<template>
    <view class="chat-list__layout">
        <CustomNavbar :autoBack="false">
            <template v-slot:left>
                <text class="custom-navbar__title">通讯录</text>
            </template>
           
        </CustomNavbar>
        <view class="chat-list__content">
             <IndexList />
            <!-- <scroll-view scroll-y="true" class="chat-list__scroll">
                <view class="view__layout">
                    <SearchFriends />
                </view>
                <view class="view__layout">
                    <NewFriends />
                </view>
                <view class="view__layout">
                    <IndexList />
                </view>

            </scroll-view> -->
        </view>


    </view>
</template>
<style lang="scss" scoped>
.chat-list__content {
    flex-grow: 1;
    height: 100%;
    padding: 32rpx;
}

.search-friends__layout {
    padding: 32rpx;
}

.view__layout {
    padding: 32rpx;
}

.chat-list__layout {
    background-color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .chat-ai__layout {
        margin-bottom: 40rpx;
    }
}

.custom-navbar__title {
    font-size: 40rpx;
    font-weight: 500;
    color: #000000;
}
</style>
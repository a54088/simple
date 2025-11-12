<template>
    <view class="setting__layout">
        <CustomNavbar title="设置"/>

        <view class="setting__content" v-for="list in settingList" :key="list.title">
            <view class="setting__content-title">{{ list.label }}</view>
            <view class="setting__content-list">
                <view 
                    class="setting__content-item flex-between" 
                    v-for="item in list.list" 
                    :key="item.title"
                    @click="handleItemClick(item)" 
                >
                    <view class="flex-center gap">
                        <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
                        <view>{{ item.title }}</view>
                    </view>
                    <i class="iconfont icon-paizhao-jinru"></i>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'

const settingList = [
    { 
        label: '账号', 
        list: [
            {
                icon: 'icon-zhibo-renshu',
                title: '账号与安全',
                path: '/pages-sub/setting/account-security/index',
            },
            {
                icon: 'icon-paizhao-quanxian',
                title: '隐私设置',
                path: '/pages-sub/setting/privacy-setting',
            },
        ]
    },
    { 
        label: '通用', 
        list: [
            {
                title: '通用设置',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '聊天设置',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '播放设置',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '清理缓存',
                path: '/pages-sub/setting/general-setting',
            },
        ]
    },
    { 
        label: '隐私', 
        list: [
            {
                title: '反馈与帮助',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '个人信息收集清单',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '用户协议',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '关于啊圈',
                path: '/pages-sub/setting/general-setting',
            },
        ]
    },
    { 
        label: '关于', 
        list: [
            {
                title: '切换账号',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '退出登录',
                path: '/pages-sub/setting/general-setting',
            },
        ]
    },
]

const handleItemClick = (item) => {
    uni.navigateTo({
        url: item.path,
    })
}
</script>

<style lang="scss" scoped>
.setting__layout {
    background-color: #f7f7f7;
    padding-bottom: 30rpx;
    min-height: 100vh;
    .setting__content {
        padding: 0 32rpx;
        margin-top: 30rpx;

        .setting__content-title {
            font-size: 28rpx;
            color: #999999;
            margin-bottom: 10rpx;
        }

        .setting__content-list {
            padding: 10rpx 30rpx;
            border-radius: 16rpx;
            background: #fff;
            margin-bottom: 30rpx;
        }

        .setting__content-item {
            padding: 25rpx 0;
            border-bottom: 1px solid #F7F7F7;
            font-size: 32rpx;
            
            .gap {
                gap: 10rpx;
            }

            &:last-child {
                border-bottom: none;
            }

            .iconfont {
                font-weight: 400;
                font-size: 28rpx;
            }
        }
    }
}
</style>
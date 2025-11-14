<template>
    <view class="setting__layout">
        <CustomNavbar title="账号与安全"/>

        <view class="setting__header flex-column">
            <u-avatar :size="48" src="/src/static/images/map/avatar3.webp"></u-avatar>
            <view class="setting__header-name">不会捏蛋</view>
            <view class="setting__header-id">
                <text>啊圈号：aquan123</text>
                <i class="iconfont icon-denglu_shoujiquan"></i>
            </view>
        </view>

        <view class="setting__content" v-for="list in settingList" :key="list.title">
            <view class="setting__content-title">{{ list.label }}</view>
            <view class="setting__content-list">
                <view class="setting__content-item flex-between" v-for="item in list.list" :key="item.title">
                    <view class="flex-center gap">
                        <i v-if="item.icon" class="iconfont" :class="item.icon"></i>
                        <view>{{ item.title }}</view>
                    </view>
                    <view>
                        <u-switch v-if="item.type === 'switch'" v-model="item.value" @change="item.change" activeColor="#7DF48C"></u-switch>
                        <i v-else class="iconfont icon-paizhao-jinru"></i>
                    </view>
                </view>
            </view>
            <view class="setting__content-tips">{{ list.tips }}</view>
        </view>
    </view>
</template>

<script setup>
import CustomNavbar from '@/components/custom-navbar/index.vue'

const settingList = ref([
    { 
        label: '账号绑定', 
        tips: '绑定的信息可用于登录或身份验证，完善信息有助于保护账号安全',
        list: [
            {
                icon: 'icon-zhibo-renshu',
                title: '手机号绑定',
                path: '/pages-sub/setting/account-security',
            },
            {
                icon: 'icon-paizhao-quanxian',
                title: '实名认证',
                path: '/pages-sub/setting/privacy-setting',
            },
            {
                icon: 'icon-paizhao-quanxian',
                title: '第三方那个账号绑定',
                path: '/pages-sub/setting/privacy-setting',
            },
        ]
    },
    { 
        label: '设备管理', 
        list: [
            {
                title: '登录设备管理',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '保存登录信息',
                path: '/pages-sub/setting/general-setting',
                type: 'switch',
                value: true,
                change: () => {
                    console.log(value);
                },
            },
        ]
    },
    { 
        label: '账号管理', 
        list: [
            {
                title: '找回账号',
                path: '/pages-sub/setting/general-setting',
            },
            {
                title: '注销账号',
                path: '/pages-sub/setting/general-setting',
            },
        ]
    }
])

</script>

<style lang="scss" scoped>
.setting__layout {
    background-color: #f7f7f7;
    padding-bottom: 30rpx;
    min-height: 100vh;

    .setting__header {
        align-items: center;
        padding: 0 32rpx;
        margin-top: 30rpx;
        gap: 10rpx;

        .setting__header-left {
            display: flex;
        }

        .setting__header-name {
            font-size: 32rpx;
            color: #000;
            font-weight: 500;
        }

        .setting__header-id {
            font-size: 24rpx;
            color: #000;
            display: flex;
            align-items: center;
            gap: 10rpx;

            .iconfont {
                font-size: 28rpx;
            }
        }
    }

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

        .setting__content-tips {
            font-size: 24rpx;
            color: #999999;
            margin-top: 10rpx;
        }
    }
}
</style>
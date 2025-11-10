<template>
    <u-popup 
        :show="vm.showMenuPopup" 
        mode="left" 
        duration="200" 
        :overlayStyle="{
            'background': 'rgba(0, 0, 0, 0.5)',
            'backdrop-filter': 'blur(5px)'
        }"
        overlayOpacity="0.6"
        bgColor="#F7F7F7"
        :customStyle="{padding: '40rpx 32rpx 16rpx'}"
        width="550rpx"
        @close="close"
    >
        <view class="menu-popup__layout">
            <!-- 个人信息 -->
            <view class="layout-header">
                <view class="layout-header-left">
                    <u-avatar :size="34" src="/src/static/map/avatar3.webp"></u-avatar>
                    <text class="text-ellipsis">人生无常大肠包小肠1234</text>
                </view>
                <view class="layout-header-right">
                    <view></view>
                    <i class="iconfont icon-paizhao-jinru"></i>
                </view>
            </view>
            <!-- 分身对话 -->
            <view class="layout-module1">
                <view class="flex">
                    <view class="layout-module1-left">
                        <image src="/src/static/map/addFriendsImg.png" mode="widthFix"></image>
                    </view>
                    <view class="layout-module1-right">
                        <view class="layout-module1-right-top">
                            近一周有50人与你分身对话
                        </view>
                        <view class="layout-module1-right-bottom flex-between">
                            <AvatarStacking :avatarList="avatarList" :avatarSize="20" :translate="20" />
                            <view class="layout-module1-right-bottom-right flex-center">
                                <text>立即查看</text>
                                <i class="iconfont icon-paizhao-jinru"></i>
                            </view>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 消息通知 -->
            <view class="layout-massage">
                <view class="massage-top">
                    <view class="massage-top-title">消息通知</view>
                    <view class="massage-top-right">
                        <text>有新消息</text>
                        <i class="iconfont icon-paizhao-jinru"></i>
                    </view>
                </view>
                <view class="message-bottom">
                    <view class="message-bottom-left">
                        <image src="/src/static/map/avatar5.webp" mode="widthFix"></image>
                        <text class="text-ellipsis">系统通知：文案文案文案文案文案文案</text>
                    </view>
                    <view class="message-bottom-right">12:00</view>
                </view>
            </view>

            <!-- 邀请码 -->
            <view class="invite-code-box">
                <view class="invite-code-box-top flex-column">
                    <view>当前邀请码</view>
                    <view>5</view>
                    <view>分享给没有邀请码的朋友一起来玩吧</view>
                </view>
                <view class="invite-code-box-bottom flex-row">
                    <view>邀请码</view>
                    <view>
                        <text>AED12AJS32</text>
                        <text class="copy-text">复制</text>
                    </view>
                </view>
            </view>

            <!-- 记事本 -->
            <view class="notebook-box layout-massage">
                <view class="massage-top">
                    <view class="massage-top-title">记事本</view>
                    <view class="massage-top-right">
                        <i class="iconfont icon-paizhao-jinru"></i>
                    </view>
                </view>
                <view class="message-bottom">
                    <view class="message-bottom-left">
                        我会帮你记录下的事情
                    </view>
                </view>
            </view>

            <!-- 数据导入 -->
            <view class="data-import-box layout-massage">
                <view class="massage-top">
                    <view class="massage-top-title">数据导入</view>
                    <view class="massage-top-right">
                        <view>去导入</view>
                        <i class="iconfont icon-paizhao-jinru"></i>
                    </view>
                </view>
                <view class="message-bottom">
                    <view class="message-bottom-left">
                        完成数据导入后解锁更多权益
                    </view>
                </view>
            </view>

            <!-- 底部操作栏 -->
            <view class="layout-bottom-bar">
                <view class="layout-bottom-bar-item">
                    <i class="iconfont icon-paizhao-shezhi"></i>
                    <text>二维码</text>
                </view>
                <view class="layout-bottom-bar-item">
                    <i class="iconfont icon-paizhao-shezhi"></i>
                    <text>设置</text>
                </view>
                <view class="layout-bottom-bar-item">
                    <i class="iconfont icon-saoyisao-2"></i>
                    <text>扫一扫</text>
                </view>
            </view>
        </view>
    </u-popup>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
// components
import AvatarStacking from '@/components/avatar-stacking/index.vue';
// img
import icon1 from '@/static/map/avatar5.webp';
import icon2 from '@/static/map/avatar1.webp';
import icon3 from '@/static/map/avatar4.webp';

const vm = inject("homeVM");

const avatarList = ref([icon1, icon2, icon3]);

const close = () => {
    vm.toggleMenuPopup()
}
</script>

<style lang="scss" scoped>
.menu-popup__layout {
    color: #000;
    position: relative;
    min-height: 100%;
    .layout-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14rpx 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .layout-header-left {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 20rpx;
            font-size: 28rpx;
            font-weight: 500;
            text {
                width: 280rpx;
            }
        }
        .layout-header-right {
            .icon-paizhao-jinru {
                font-size: 32rpx;
            }
        }
    }

    .layout-module1 {
        margin-top: 30rpx;
        padding: 1px;
        background: #000000;
        border-radius: 20rpx;
        color: #fff;
        background-image: linear-gradient(#111, #111),
                    linear-gradient(90deg, #E6F069 0%, #C688D5 50%, #7DF48C 100%);
        background-clip: content-box, border-box;    /* 内容区 + 边框区 */
        background-origin: border-box;
        border: 1px solid transparent;

        >view {
            padding: 30rpx 20rpx 24rpx;
        }

        .layout-module1-left {
            image {
                width: 80rpx;
            }
        }
        .layout-module1-right {
            .layout-module1-right-top {
                font-size: 28rpx;
                font-weight: 500;
                border-bottom: 1px solid #353535;
                padding-bottom: 20rpx;
            }
            .layout-module1-right-bottom {
                padding-top: 20rpx;
                .layout-module1-right-bottom-right {
                    font-size: 24rpx;
                    color: #EDEDED;
                    gap: 10rpx;
                    .icon-paizhao-jinru {
                        font-size: 24rpx;
                    }
                }
            }
        }
    }

    .layout-massage {
        background-color: #fff;
        border-radius: 20rpx;
        margin-top: 30rpx;
        padding: 20rpx;
        color: #000;

        >view {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .massage-top {
            margin-bottom: 20rpx;
            .massage-top-title {
                font-size: 28rpx;
                font-weight: 500;
            }
            .massage-top-right {
                font-size: 24rpx;
                color: #999999;
                gap: 30rpx;
                display: flex;
                align-items: center;
                >text {
                    position: relative;
                    &::after {
                        content: '';
                        display: inline-block;
                        width: 10rpx;
                        height: 10rpx;
                        background-color: #FE3A39;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        right: -20rpx;
                        transform: translate(-50%, -50%);
                    }
                }
                .icon-paizhao-jinru {
                    font-size: 24rpx;
                    color: #000000;
                }
            }
        }

        .message-bottom-left {
            display: flex;
            align-items: center;
            gap: 16rpx;
            font-size: 24rpx;
            image {
                width: 36rpx;
                height: 36rpx;
            }
            text {
                width: 320rpx;
            }
        }
        .message-bottom-right {
            font-size: 24rpx;
            color: #999999;
        }
    }

    .invite-code-box {
        margin-top: 20rpx;
        .invite-code-box-top {
            padding: 20rpx;
            background-color: #fff;
            border-radius: 20rpx;
            text-align: center;
            gap: 15rpx;
            :nth-child(1) {
                font-size: 28rpx;
                color: #000;
                font-weight: 500;
            }
            :nth-child(2) {
                font-size: 40rpx;
                font-weight: 500;
                color: #000;
                position: relative;
                display: inline-block;
                min-width: 100rpx;
                margin: 0 auto;
                &::after,
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    display: inline-block;
                    width: 4rpx;
                    height: 100%;
                    background-color: #F7F7F7;
                    border-radius: 4rpx;
                }
                &::after {
                    right: 0;
                }
                &::before {
                    left: 0;
                }
            }
            :nth-child(3) {
                font-size: 24rpx;
                color: #9E9E9E;
            }
        }
        .invite-code-box-bottom {
            padding: 20rpx;
            background-color: #F5222D;
            border-radius: 20rpx;
            color: #fff;
            align-items: center;
            justify-content: space-between;
            :nth-child(1) {
                font-size: 24rpx;
                color: #fff;
            }
            :nth-child(2) {
                font-size: 24rpx;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 10rpx;
                .copy-text {
                    padding: 5rpx 10rpx;
                    border: 1px solid #fff;
                    color: #F5222D;
                    border-radius: 10rpx;
                }
            }
        }
    }

    .data-import-box,
    .notebook-box {
        .message-bottom-left {
            color: #9E9E9E;
        }
    }

    .layout-bottom-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30rpx;
        padding: 20rpx;
        border-radius: 20rpx;
        color: #999999;
        font-size: 28rpx;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        >view {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 10rpx;
            i {
                padding: 20rpx;
                background-color: #fff;
                border-radius: 50%;
            }
        }
    }
}
</style>
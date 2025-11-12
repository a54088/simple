
import { defineStore } from "pinia";

export const useCustomTabbarStore = defineStore("CustomTabbarStore", {
    state: () => {
        return {
            tabList: [
                {
                    label: '聊天',
                    icon: 'icon-a-24gf-bubble4',
                    key: 'chat-list',
                },
                {
                    label: '通讯录',
                    icon: 'icon-tongxunlu02-F',
                    key: 'contacts',
                },
                {
                    label: '圈子',
                    icon: 'icon-a-24gf-bubble4',
                    key: 'circle',
                },
                
            ],
            currentTabIndex: 0,
            swiperRef: null,
        };
    },

    getters: {
        currentTab(state) {
            return state.tabList[state.currentTabIndex]
        }
    },

    actions: {
        switchTab(index) {
            this.currentTabIndex = index
            if (this.swiperRef) {
                
                this.swiperRef.swiper.slideTo(index)
            }
        },
        setCurrentTabIndex(index) {
            // 获取当前页面栈
            const pages = getCurrentPages();
            // 获取当前页面实例（最后一个元素就是当前页面）
            const currentPage = pages[pages.length - 1];
            // 获取当前页面路由
            const currentRoute = currentPage.route;
            // 获取带斜杠前缀的完整路径
            const fullPath = `/${currentRoute}`;
            this.currentTabIndex = index
            if (!fullPath.includes('pages-im')) {
                uni.reLaunch({
                    url: this.currentTab.path,
                })
            }
        }
    },
});

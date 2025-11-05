
import { defineStore } from "pinia";

export const useCustomTabbarStore = defineStore("CustomTabbarStore", {
  state: () => {
    return {
      tabList:[
        {
            label: '聊天',
            icon: 'icon-a-24gf-bubble4',
        },
        {
            label: '圈子',
            icon: 'icon-a-24gf-bubble4',
        },
        {
            label: '通讯录',
            icon: 'icon-tongxunlu02-F',   
        },
      ],
      currentTabIndex: 0,
    };
  },

  getters: {
    currentTab(state) {
      return state.tabList[state.currentTabIndex]
    }
  },

  actions: {
    setCurrentTabIndex(index) {
      this.currentTabIndex = index
    }
  },
});

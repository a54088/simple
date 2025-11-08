import { ViewModel } from '@/shared/class/view-model.js'
import { useCustomTabbarStore } from '@/store/index.js'

export class CustomTabbarVM extends ViewModel {

    constructor() {
        super();
    }

    get tabList() {
        return useCustomTabbarStore().tabList;
    }

    get currentTab() {
        return useCustomTabbarStore().currentTab;
    }

    get currentTabIndex() {
        return useCustomTabbarStore().currentTabIndex;
    }

    setCurrentTabIndex(index) {
        useCustomTabbarStore().switchTab(index);
    }
}
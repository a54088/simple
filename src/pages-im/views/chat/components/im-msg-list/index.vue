<script setup>
import ImMsg from '../im-msg/index.vue'
import ImList from '../im-list/index.vue'
import { inject } from 'vue'
const imVM = inject('imVM')
const list = computed(() => imVM.currentConversation.msg.dataList)
</script>
<template>
      
        <ImList>
            <template v-for="(item, index) in list" :key="index">
                <view class="im-list-item">
          
                    <ImMsg :index="index" :msg="item" />
                </view>
            </template>
        </ImList>
</template>
<style lang="scss" scoped>
.im-list-item {
    transform: scale(1, -1);

    .uni-im-msg {
        width: 0;
        flex-grow: 1;
        margin-bottom: 10px;
    }
}
</style>
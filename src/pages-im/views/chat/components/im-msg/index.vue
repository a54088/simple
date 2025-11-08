<script setup>
import MsgContent from './components/msg-content/index.vue'

const props = defineProps({
    msg: {
        type: Object,
        default: () => ({
            type: 'text',
            body: '6666666'
        })
    },
    index: {
        type: Number
    }
})
</script>

<template>
    <msg-content class="msg-content" ref="msg-content" :msg="msg" @viewMsg="$emit('viewMsg', $event)" />
</template>

<style lang="scss" scoped></style>
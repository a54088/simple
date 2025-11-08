<script setup>
import Msgtext from '../types/text/index.vue'

const props = defineProps({
    msg: {
        type: Object,
        default: () => ({})
    },
    imgMaxWidth: {
        type: [String, Number],
        default: '200px'
    }
})

const componentMap = {
    text: Msgtext
}

const currentComponent = computed(() => {
    return componentMap[props.msg.type] || Msgtext
})
</script>
<template>
    <component :is="currentComponent" />
</template>
<style lang="scss" scoped></style>
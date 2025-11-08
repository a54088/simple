<script setup>
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
</script>
<template>
    <text>{{ msg.content }}</text>
</template>
<style lang="scss" scoped>

</style>
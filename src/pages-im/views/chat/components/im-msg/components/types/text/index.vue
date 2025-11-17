<script setup>
const props = defineProps({
    msg: {
        type: Object,
        default: () => ({
            content: ''
        })
    },
    imgMaxWidth: {
        type: [String, Number],
        default: '200px'
    }
})

const trText = (str) => {
        // TODO：临时方案，解决 \n 被转义的问题
        return str.replace(/\\n/g, "\\\\n")
      }
</script>
<template>
    <view class="msg-text-box">
        <text class="msg-text" :decode="true" space="ensp">{{msg.content}}</text>
    </view>
</template>
<style lang="scss" scoped></style>
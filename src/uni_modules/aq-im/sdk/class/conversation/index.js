import { computed } from 'vue'
import CloudData from './cloud-data'

export default class Conversation extends CloudData {
    dataList = []

    hasMore = true

    loading = false

    loadLimit = 100



    constructor () {
        this.conversation = computed(() => {
            return $state.conversation
        })
    }
}
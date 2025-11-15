<script setup>
import { computed, ref, onMounted } from 'vue'
import SearchFriends from '../search-friends/index.vue'
import NewFriends from '../new-friends/index.vue'
import ImApi from '@/api/im/index.js'
import { getChineseFirstLetter } from '@/utils/index.js'
const indexList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const itemArr = ref([])
const searchText = ref('')
const filteredItemArr = computed(() => {
    if (!searchText.value || searchText.value.trim() === '') {
        return itemArr.value;
    }
    const searchTerm = searchText.value.toLowerCase().trim();
    return itemArr.value
        .map((group, index) => {
            const filteredGroup = group.filter(item => 
                // 现在item是对象，需要访问nickname属性
                item.nickname && item.nickname.toLowerCase().includes(searchTerm)
            );
            return filteredGroup.length > 0 ? filteredGroup : null;
        })
        .filter(group => group !== null);
})
const filteredItemArrLength = computed(() => {
    return filteredItemArr.value.flat().length
})

// 创建过滤后的索引列表，只包含有内容的分组索引
const filteredIndexList = computed(() => {
    if (!searchText.value || searchText.value.trim() === '') {
        // 动态生成索引列表，确保只包含实际存在的分组
        return itemArr.value.map((group, index) => {
            if (group.length > 0 && group[0].nickname) {
                const firstLetter = getChineseFirstLetter(group[0].nickname);
                return firstLetter;
            }
            return '#';
        });
    }
    const searchTerm = searchText.value.toLowerCase().trim();
    return itemArr.value
        .map((group, index) => {
            const hasMatch = group.some(item => 
                item.nickname && item.nickname.toLowerCase().includes(searchTerm)
            );
            if (hasMatch && group.length > 0 && group[0].nickname) {
                const firstLetter = getChineseFirstLetter(group[0].nickname);
                return firstLetter;
            }
            return null;
        })
        .filter(index => index !== null);
})

const onConfirm = (e) => {
    searchText.value = e
    // itemArr.forEach((item, index) => {
    //     if (item.includes(e)) {
    //         console.log(index);
    //     }
    // })
}
onMounted(async() => {
    try {
        let {data} = await ImApi.getAppFriendList()
        let list = data.list || []
    //     let list = [
    //         {
    //     "id": 0,
    //     "friendId": 0,
    //     "nickname": "为",
    //     "avatar": "",
    //     "sex": 0,
    //     "personalizedSignature": "",
    //     "remark": "",
    //     "groupId": 0,
    //     "groupName": "",
    //     "onlineStatus": 0,
    //     "source": "",
    //     "createTime": ""
    //   }, {
    //     "id": 0,
    //     "friendId": 0,
    //     "nickname": "",
    //     "avatar": "",
    //     "sex": 0,
    //     "personalizedSignature": "",
    //     "remark": "",
    //     "groupId": 0,
    //     "groupName": "",
    //     "onlineStatus": 0,
    //     "source": "",
    //     "createTime": ""
    //   }, {
    //     "id": 0,
    //     "friendId": 0,
    //     "nickname": "啊",
    //     "avatar": "",
    //     "sex": 0,
    //     "personalizedSignature": "",
    //     "remark": "",
    //     "groupId": 0,
    //     "groupName": "",
    //     "onlineStatus": 0,
    //     "source": "",
    //     "createTime": ""
    //   }, 
    //     ]
        // 根据nickname首字母分类
        const groupedFriends = {}
        
        list.forEach(friend => {
            // 获取nickname首字母
            let firstLetter = friend.nickname && friend.nickname.trim() ? 
                getChineseFirstLetter(friend.nickname.trim()) : '#'
            
            if (!groupedFriends[firstLetter]) {
                groupedFriends[firstLetter] = []
            }
            groupedFriends[firstLetter].push(friend)
        })
        
        // 转换为itemArr需要的格式
        const newItemArr = []
        // 优先处理字母A-Z
        for (const letter of indexList) {
            if (groupedFriends[letter]) {
                newItemArr.push(groupedFriends[letter])
                delete groupedFriends[letter]
            }
        }
        
        // 处理其他字符（如#）
        for (const key in groupedFriends) {
            newItemArr.push(groupedFriends[key])
        }
        
        itemArr.value = newItemArr
    } catch (error) {
        console.error('获取好友列表失败:', error)
    }
})
</script>

<template>
    <u-index-list :index-list="filteredIndexList">
         <view class="view__layout">
             <SearchFriends @confirm="onConfirm" />
         </view>
         <view class="view__layout">
             <NewFriends />
         </view>
         <template v-if="filteredItemArrLength > 0">
         <view class="my-friends">
            我的好友 ({{ filteredItemArrLength }})
         </view>
            <template v-for="(item, index) in filteredItemArr">

                <u-index-item>
                    <view class="index-item__layout">
                        <!-- 显示正确的索引字母 -->
                        <view>{{ 
                            item.length > 0 && item[0].nickname 
                                ? (() => {
                                    const firstLetter = getChineseFirstLetter(item[0].nickname);
                                    return firstLetter
                                })() 
                                : '#' 
                        }}</view>
                        <view class="index-item__cell-layout">
                            <view class="list-cell" v-for="(cell, idx) in item" :key="cell.id || idx">
                                <u-avatar :src="cell.avatar || ''"></u-avatar>
                                <text class="list-cell__text">{{ cell.nickname || '未知用户' }}</text>
                            </view>
                        </view>
                    </view>

                </u-index-item>
            </template>
            </template>
            <template v-else>
                <view class="no-friends">
                    暂无好友
                </view>
            </template>
        <view class="chat-list__safe__layout"></view>
    </u-index-list>
</template>

<style lang="scss" scoped>
.view__layout {
    padding-bottom: 40rpx;
}
.my-friends{
font-size: 32rpx;
color: #000000;
margin-bottom: 32rpx;
}
.no-friends{
font-family: PingFang SC;
font-size: 28rpx;
text-align: center;
color: #9E9E9E;
	
}
.chat-list__safe__layout {
    height: calc(32rpx + 108rpx + 108rpx);
}
.index-item__layout {
    display: flex;

    .index-item__cell-layout {
        margin-left: 30rpx;

        .list-cell {
            display: flex;
            align-items: center;
            margin-bottom: 28rpx;

            .list-cell__text {
                margin-left: 24rpx;
                font-size: 32rpx;
                font-weight: 500;
                color: #000000;
            }
        }
    }
}
</style>
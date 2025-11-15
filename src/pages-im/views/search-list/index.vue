<script setup>
import CustomNavbar from "@/components/custom-navbar/index.vue";
import ImApi from "@/api/im/index.js";
import zhiboAvatar from "@/static/images/map/zhibo.png";
const keyword = ref("");
// const emit = defineEmits(["searchSuccess"]);
const friends = ref([
//   {
//     id: 0,
//     friendId: 0,
//     nickname: "233232",
//     avatar: "",
//     sex: 0,
//     personalizedSignature: "这个人很懒，什么都没写",
//     remark: "",
//     groupId: 0,
//     groupName: "",
//     onlineStatus: 0,
//     source: "",
//     createTime: "",
//   },
]);
const onSearch = async () => {
  console.log(keyword.value);
  if (!keyword.value) {
    uni.showToast({
      title: "请输入搜索关键词",
      icon: "none",
    });
    return;
  }
  const res = await ImApi.searchFriend({
    keyword: keyword.value,
  });
  console.log(res);
  if (res.code === 0) {
    // uni.showToast({
    //   title: "搜索成功",
    //   icon: "none",
    // });
    // emit("searchSuccess", res.data);
    friends.value = res.data || [];
  } else {
    uni.showToast({
      title: res.msg || "搜索失败",
      icon: "none",
    });
  }
};
</script>

<template>
  <view>
    <CustomNavbar title="搜索好友" />
    <view class="search-friends">
      <u-search
        @clickIcon="onSearch"
        @search="onSearch"
        inputStyle="{fontSize: '28rpx'}"
        searchIconColor="#666"
        color="#000"
        placeholderColor="#9E9E9E"
        :showAction="false"
        placeholder="请输入"
        v-model="keyword"
        class="search-friends__search"
      ></u-search>

    <view class="search-friends__list">
      <view v-for="item in friends" :key="item.id" class="search-friends-item">
        <view class="search-friends-item__left">
          <image
            :src="item.avatar || zhiboAvatar"
            class="search-friends__avatar"
          ></image>
          <view class="search-friends__left-name">
            <view class="name1">{{ item.nickname }}</view>
            <view class="name2">{{ item.personalizedSignature }}</view>
          </view>
        </view>
        <view class="search-friends__add">
          <text>加好友</text>
        </view>
      </view>
    </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.search-friends {
  padding: 54rpx 32rpx;
  background: #fff;
  .search-friends__search {
    height: 87rpx;
    background: #f4f4f4;
    border-radius: 43.5rpx;
    .u-search__content {
      height: 87rpx;
      background: gold;
    }
  }
}
.search-friends__list {
    padding-top: 40rpx;
  .search-friends-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search-friends__avatar {
    width: 87rpx;
    height: 87rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  .search-friends__left-name {
    .name1 {
      font-size: 32rpx;
      font-weight: 500;
      color: #000000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 330rpx;
    }
    .name2 {
      font-size: 28rpx;
      color: #999999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 330rpx;
    }
  }
  .search-friends__add {
    width: 116rpx;
    height: 58rpx;
    border-radius: 29rpx;
    background: #ff194a;
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    line-height: 58rpx;
  }
  .search-friends-item__left{
    display: flex;
    align-items: center;
  }
}
</style>

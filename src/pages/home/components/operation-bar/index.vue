<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:36:50
 * @Description: 
-->

<template>
  <view class="operation-bar">
    <view class="operation-bar-content animate__animated" :class="[!isShowMenu && 'animate__slideInDown']">
      <view class="top-btn-box">
        <view @click="handleCloneSpace" class="top-btn-box-title">分身空间</view>
        <view class="top-btn-box-icon">
          <i class="iconfont icon-shengyin"></i>
        </view>
      </view>

      <view class="input-box">
        <view class="icon-phone-box">
          <i class="iconfont icon-dianhua1"></i>
        </view>
        <view class="operation-bar-btn">
          <voice-button
            :duration="60000"
            :min-duration="1"
            :show-toast="true"
            @record-complete="handleRecordComplete"
            @record-error="handleRecordError"
          >
            <template #leftIcon>
              <text class="iconfont icon-jianpan iconfont__btn"></text>
            </template>
            <template #rightIcon>
              <text 
                @tap.stop="toggleMenuOpen" 
                class="iconfont icon-gengduo"
                :class="[isShowMenu && 'icon-rotated']"
              ></text>
            </template>
          </voice-button>
        </view>
      </view>
    </view>

    <view 
      v-if="isShowMenu" 
      class="menu-box animate__animated" 
      :class="[isShowMenu && 'animate__fadeInUp']"
    >
      <view
        v-for="item in menuList"
        :key="item.key"
        @tap="handleMenuClick(item.handle)"
        class="menu-item"
      >
        <text class="iconfont" :class="item.icon"></text>
        <text class="menu-item-text">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { inject, ref } from "vue";
import { chooseFile, uploadFile } from "@/utils/file.js";
import VoiceButton from "@/components/voice-button/index.vue";

const vm = inject("homeVM");
const isShowMenu = ref(false);

// 定义事件
const emit = defineEmits(['record-complete', 'record-error']);

const toggleMenuOpen = () => {
  isShowMenu.value = !isShowMenu.value;
};

// 菜单列表 - 需要在函数定义之后
const menuList = ref([
  {
    title: '相册',
    icon: "iconfont icon-xiangce",
    key: "album",
    handle: 'openAlbum'
  },
  {
    title: '相机',
    icon: "iconfont icon-xiangji",
    key: "camera",
    handle: 'openCamera'
  },
  {
    title: '文件',
    icon: "iconfont icon-wenjian",
    key: "file",
    handle: 'openFile'
  },
  {
    title: '数据导入',
    icon: "iconfont icon-shujudaoru",
    key: "dataExport",
    handle: 'openDataExport'
  },
]);
/* ====================== 上传文件 start ====================== */
const handleMenuClick = (handle) => {
  const map = {
    openAlbum: openAlbum,
    openCamera: openCamera,
    openFile: openFile,
    openDataExport: openDataExport
  }
  map[handle]();
};
const openAlbum = async () => {
  try {
    // 选择相册图片
    const files = await chooseFile({
      type: 'image',
      count: 9,
      sourceType: 'album'
    });
    
    if (files && files.length > 0) {
      // 这里可以处理选中的图片
      console.log('选中的图片:', files);
      
      // 如果需要上传，可以调用 uploadFile
      // const result = await uploadFile(files[0], {
      //   getPresignedUrlApi: '/api/oss/get-presigned-url',
      //   onProgress: (progress) => {
      //     console.log(`上传进度: ${progress}%`);
      //   }
      // });
    }
  } catch (error) {
    console.warn('打开相册失败:', error);
  }
};

const openCamera = async () => {
  try {
    // 选择相机拍照
    const files = await chooseFile({
      type: 'image',
      count: 1,
      sourceType: 'camera'
    });
    
    if (files && files.length > 0) {
      console.log('拍摄的照片:', files);
      
      // 如果需要上传，可以调用 uploadFile
      // const result = await uploadFile(files[0], {
      //   getPresignedUrlApi: '/api/oss/get-presigned-url',
      //   compress: true,
      //   quality: 80,
      //   onProgress: (progress) => {
      //     console.log(`上传进度: ${progress}%`);
      //   }
      // });
    }
  } catch (error) {
    console.warn('打开相机失败:', error);
  }
};

const openFile = async () => {
  try {
    // 选择文件
    const files = await chooseFile({
      type: 'file',
      count: 1
    });
    
    if (files && files.length > 0) {
      console.log('选中的文件:', files);
      
      // 如果需要上传，可以调用 uploadFile
      // const result = await uploadFile(files[0], {
      //   getPresignedUrlApi: '/api/oss/get-presigned-url',
      //   onProgress: (progress) => {
      //     console.log(`上传进度: ${progress}%`);
      //   }
      // });
    }
  } catch (error) {
    console.warn('选择文件失败:', error);
  }
};

const openDataExport = () => {
  console.log('数据导入');
  uni.showToast({
    title: '数据导入功能开发中',
    icon: 'none'
  });
};
/* ====================== 上传文件 end ====================== */

/* ====================== 按住说话 start ====================== */
// 处理录音完成
const handleRecordComplete = (data) => {
  console.log('录音完成:', data);
  // 触发事件通知父组件
  emit('record-complete', data);
  
  // 如果需要自动上传，可以在这里处理
  // uploadRecordFile(data.filePath);
};

// 处理录音错误
const handleRecordError = (err) => {
  console.error('录音错误:', err);
  // 触发错误事件
  emit('record-error', err);
};

// 上传录音文件（可选）
const uploadRecordFile = async (filePath) => {
  try {
    // 使用文件上传工具上传录音
    // const result = await uploadFile({
    //   tempFilePath: filePath,
    //   name: `voice_${Date.now()}.mp3`,
    //   type: 'audio/mp3'
    // }, {
    //   getPresignedUrlApi: '/api/oss/get-presigned-url',
    //   onProgress: (progress) => {
    //     console.log(`上传进度: ${progress}%`);
    //   }
    // });
    // console.log('录音上传成功:', result);
  } catch (error) {
    console.error('录音上传失败:', error);
    uni.showToast({
      title: '录音上传失败',
      icon: 'none'
    });
  }
};
/* ====================== 按住说话 end ====================== */

const handleCloneSpace = () => {
  uni.navigateTo({
    url: '/pages-sub/home/cloneSpace',
  })
}

</script>

<style lang="scss" scoped>
.operation-bar {
  padding: 0 32rpx;
  position: fixed;
  bottom: 32rpx;
  width: 100%;
}

.operation-bar-content {
  --animate-duration: .2s;
}

.icon-quxiao {
  transform: rotate(45deg);
  font-size: 60rpx;
  width: 60rpx;
  height: 60rpx;
  overflow: hidden;
  margin-right: -10rpx;
}
.icon-rotated {
  transform: rotate(45deg);
}

.top-btn-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  >view {
    padding: 20rpx 26rpx;
    border-radius: 100rpx;
    background: rgba(0, 0, 0, 0.8);
    height: 78rpx;
  }
  .top-btn-box-title {
    font-size: 28rpx;
    font-weight: 500;
  }
  .top-btn-box-icon {
    width: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-shengyin {
      font-size: 48rpx;
    }
  }
}

.input-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 20rpx;

  .icon-phone-box {
    width: 96rpx;
    height: 96rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 50%;
  }

  .icon-jianpan {
    font-size: 48rpx;
  }
  .operation-bar-btn {
    flex: 1;
    height: 96rpx;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 100rpx;
    color: #fff;
    padding: 24rpx 30rpx;
  }
  
  .icon-quxiao {
    font-size: 60rpx;
    width: 60rpx;
    height: 60rpx;
    overflow: hidden;
    margin-right: -10rpx;
    flex-shrink: 0;
  }
} 

.menu-box {
  display: flex;
  justify-content: space-between;
  gap: 18rpx;
  margin-top: 20rpx;
  opacity: 0;
  --animate-duration: .2s;

  .menu-item {
    flex: 1;
    background: rgba(0, 0, 0, 0.9);
    padding: 23rpx 31rpx;
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20rpx;

    .menu-item-text {
      color: #999999;
      font-size: 24rpx;
    }
  }
}
</style>

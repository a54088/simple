<template>
   <view class="publish-work-page">
      <!-- 状态栏 -->
      <u-status-bar></u-status-bar>

      <!-- 顶部导航栏 -->
      <view class="header">
         <view class="close-btn" @click="handleClose">
            <text class="iconfont icon-paizhao-cha-1" style="font-size: 48rpx;"></text>
         </view>
      </view>

      <!-- 内容区域 -->
      <scroll-view class="content-scroll" scroll-y>
         <!-- 内容预览区域 -->
         <view class="preview-section">
            <!-- 图片模式：多图 + 添加图片占位 -->
            <view v-if="isImageMode" class="image-grid">
               <view class="image-card" v-for="(img, idx) in imageList" :key="idx">
                  <image class="image-card__img" :src="img" mode="aspectFill"></image>
                  <view v-if="idx === 0" class="image-card__badge">封面</view>
                  <view class="image-card__close" @click="handleRemoveImage(idx)">
                     <text class="iconfont icon-quxiao" style="font-size: 64rpx; color: #fff;"></text>
                  </view>
               </view>
               <!-- 添加图片占位 -->
               <view class="image-card image-card__add" @click="handleAddImage">
                  <view class="image-card__add-plus">+</view>
                  <text class="image-card__add-text">添加图片</text>
               </view>
            </view>

            <!-- 视频模式：单缩略图 -->
            <view v-else class="thumbnail-wrapper">
               <image class="thumbnail-image" src="/static/images/circle/portrait.webp" mode="aspectFill"></image>
               <view class="thumbnail-close" @click="handleRemoveThumbnail">
                  <text class="iconfont icon-quxiao" style="font-size: 64rpx; color: #fff;"></text>
               </view>
            </view>

            <view class="preview-video-btn" @click="handlePreviewVideo">
               <view class="play-icon">▶</view>
               <text class="preview-text">{{ previewText }}</text>
            </view>

            <view class="description-input-wrapper">
               <textarea class="description-input" placeholder="添加作品描述" placeholder-style="color: #999;"
                  v-model="description" maxlength="500"></textarea>
            </view>
         </view>

         <!-- AI优化区域 -->
         <view class="ai-optimize-section">
            <view class="ai-banner" @click="handleAIOptimize">
               <view class="ai-banner-left">
                  <text class="ai-banner-text">让啊圈AI来帮你优化文案吧~</text>
                  <view class="ai-banner-tips">
                     <image class="sparkle-icon" src="/static/images/circle/optimizationTips.webp" mode="aspectFill"></image>
                     <text class="optimize-tips">优化Tips</text>
                  </view>
               </view>
               <image src="/static/images/circle/AIDigitalHuman.webp" mode="aspectFill" class="ai-banner-right"></image>
            </view>
            <!--                <image class="ai-character" src="/static/circle/ai.png" mode="aspectFit"></image>
 -->

            <view class="ai-actions" v-if="showAIActions">
               <view class="ai-action-btn" @click="handleUndo">
                  <text class="arrow-icon iconfont icon-paizhao-chehui"></text>
                  <text class="ai-action-text">撤回</text>
               </view>
               <view class="ai-action-btn" @click="handleRegenerate">
                  <text class="arrow-icon iconfont icon-paizhao-shuaxin"></text>
                  <text class="ai-action-text">重新生成</text>
               </view>
            </view>
         </view>

         <!-- 标签区域 -->
         <view class="tags-section">
            <view class="tag-buttons-row">
               <view class="tag-btn-large" @click="handleAddTopic">
                  <text class="tag-btn-text"># 话题</text>
               </view>
               <view class="tag-btn-large" @click="handleAddFriend">
                  <text class="tag-btn-text">@ 好友</text>
               </view>
            </view>

            <view class="tags-list">
               <view v-for="(tag, index) in selectedTags" :key="index" class="tag-item-wrapper">
                  <view class="tag-item" @click="handleRemoveTag(index)">
                     <text class="tag-text">{{ tag.text }}</text>
                     <text v-if="tag.recommended" class="tag-recommended-label">推荐</text>
                  </view>
               </view>
            </view>
         </view>

         <!-- 位置和可见性 -->
         <view class="settings-section">
            <view class="setting-item" @click="handleSelectLocation">
               <text class="iconfont icon-paizhao-dingwei"
                  style="font-size: 32rpx; color: #666; margin-right: 16rpx;"></text>
               <text class="setting-text">{{ location || '机场路一巷' }}</text>
               <text class="iconfont icon-paizhao-jinru" style="font-size: 24rpx; color: #999;"></text>
            </view>
            <view class="setting-item" @click="handleSelectVisibility">
               <text class="iconfont icon-paizhao-quanxian"
                  style="font-size: 32rpx; color: #666; margin-right: 16rpx;"></text>
               <text class="setting-text">{{ visibility }}</text>
               <text class="iconfont icon-paizhao-jinru" style="font-size: 24rpx; color: #999;"></text>
            </view>
         </view>
      </scroll-view>

      <!-- 底部操作栏 -->
      <view class="footer">
         <view class="footer-safe-area">
            <view class="save-draft-btn" @click="handleSaveDraft">
               <text class="iconfont icon-paizhao-cuncaogao caogao" style="font-size: 32rpx; color: #666;"></text>
               <text class="save-draft-text">存草稿</text>
            </view>
            <view class="publish-btn" @click="handlePublish">
               <text class="publish-text">发布作品</text>
            </view>
         </view>
      </view>

      <!-- 权限选择弹层 -->
      <PermissionSetPopup
         v-model:show="showPermissionPopup"
         :value="visibility"
         @confirm="(val) => (visibility = val)"
      />
   </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import PermissionSetPopup from './components/PermissionSetPopup.vue'

// 作品描述
const description = ref('')

// 位置
const location = ref('机场路一巷')

// 可见性
const visibility = ref('公开可见')
const showPermissionPopup = ref(false)

// 是否显示AI操作按钮
const showAIActions = ref(true)

// 媒体类型：video | image（通过路由传入）
const mediaType = ref('image')
const isImageMode = computed(() => mediaType.value === 'video')
const previewText = computed(() => (isImageMode.value ? '预览图片' : '预览视频'))

// 图片列表（静态占位）
const imageList = ref([
  '/static/images/circle/portrait.webp',
  '/static/images/circle/portrait.webp'
])

onLoad((options) => {
  if (options && (options.type === 'image' || options.type === 'video')) {
    mediaType.value = options.type
  }
})

// 选中的标签
const selectedTags = ref([
  { text: '#鬼知道我看了多少遍', recommended: true },
  { text: '#日常分享', recommended: false },
  { text: '#抽象艺术', recommended: false },
  { text: '#随便拍', recommended: false }
])

// 关闭页面
const handleClose = () => {
  uni.navigateBack()
}

// 移除缩略图（视频）
const handleRemoveThumbnail = () => {
  uni.showToast({
    title: '移除视频封面',
    icon: 'none'
  })
}

// 添加/移除图片（图片模式占位交互）
const handleAddImage = () => {
  uni.showToast({ title: '添加图片', icon: 'none' })
}
const handleRemoveImage = (index) => {
  imageList.value.splice(index, 1)
}

// 预览
const handlePreviewVideo = () => {
  uni.showToast({
    title: isImageMode.value ? '预览图片' : '预览视频',
    icon: 'none'
  })
}

// AI优化
const handleAIOptimize = () => {
   showAIActions.value = true
   uni.showToast({
      title: 'AI优化中...',
      icon: 'none'
   })
}

// 撤回
const handleUndo = () => {
   uni.showToast({
      title: '撤回',
      icon: 'none'
   })
}

// 重新生成
const handleRegenerate = () => {
   uni.showToast({
      title: '重新生成',
      icon: 'none'
   })
}

// 添加话题
const handleAddTopic = () => {
   uni.showToast({
      title: '添加话题',
      icon: 'none'
   })
}

// 添加好友
const handleAddFriend = () => {
   uni.showToast({
      title: '添加好友',
      icon: 'none'
   })
}

// 移除标签
const handleRemoveTag = (index) => {
   selectedTags.value.splice(index, 1)
}

// 选择位置
const handleSelectLocation = () => {
   uni.showToast({
      title: '选择位置',
      icon: 'none'
   })
}

// 选择可见性
const handleSelectVisibility = () => {
  showPermissionPopup.value = true
}

// 存草稿
const handleSaveDraft = () => {
   uni.showToast({
      title: '保存草稿',
      icon: 'success'
   })
}

// 发布作品
const handlePublish = () => {
   uni.showToast({
      title: '发布作品',
      icon: 'success'
   })
}
</script>

<style lang="scss" scoped>
.publish-work-page {
   width: 100vw;
   min-height: 100vh;
   background-color: #fff;
   display: flex;
   flex-direction: column;
}

/* 顶部导航栏 */
.header {
   padding: 20rpx 32rpx;
   display: flex;
   align-items: center;

   .close-btn {
      width: 60rpx;
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
   }
}

/* 内容区域 */
.content-scroll {
   flex: 1;
   padding: 0 32rpx;
   padding-bottom: 200rpx;
}

/* 内容预览区域 */
.preview-section {
   margin-bottom: 40rpx;

   /* 图片模式：图片网格 */
   .image-grid {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20rpx;
      margin-bottom: 24rpx;

      .image-card {
         position: relative;
         width: 226rpx;
         height: 400rpx;
         border-radius: 16rpx;
         overflow: hidden;
         background: #F5F5F5;

         &__img {
            width: 100%;
            height: 100%;
            border-radius: 16rpx;
         }

         &__badge {
            position: absolute;
            left: 12rpx;
            top: 12rpx;
            padding: 6rpx 14rpx;
            font-size: 20rpx;
            font-weight: 600;
            color: #fff;
            background: rgba(0, 0, 0, 0.65);
            border-radius: 12rpx;
         }

         &__close {
            position: absolute;
            right: 6rpx;
            top: 6rpx;
            width: 48rpx;
            height: 48rpx;
            display: flex;
            align-items: center;
            justify-content: center;
         }

         &__add {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #C7C7C7;
            border: 2rpx dashed #E6E6E6;

            .image-card__add-plus {
               font-size: 64rpx;
               line-height: 1;
               margin-bottom: 12rpx;
            }
            .image-card__add-text {
               font-size: 24rpx;
               color: #9C9C9C;
            }
         }
      }
   }

   /* 视频模式：单缩略图 */
   .thumbnail-wrapper {
      position: relative;
      width: 226rpx;
      margin-bottom: 24rpx;

      .thumbnail-image {
         width: 226rpx;
         height: 400rpx;
         border-radius: 16rpx;
         background-color: #f5f5f5;
      }

      .thumbnail-close {
         position: absolute;
         top: 6rpx;
         right: 6rpx;
         width: 48rpx;
         height: 48rpx;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   .preview-video-btn {
      display: flex;
      align-items: center;
      padding: 7rpx 14rpx;
      margin-bottom: 24rpx;
      background: #F5F5F5;
      border-radius: 8rpx;
      width: 178rpx;
      font-size: 22rpx;

      .play-icon {
         width: 32rpx;
         height: 32rpx;
         display: flex;
         align-items: center;
         justify-content: center;
         font-size: 20rpx;
         color: #000;
         border-radius: 50%;
         padding-left: 4rpx;
      }
   }

   .preview-text {
      font-size: 28rpx;
      color: #000;
      white-space: nowrap;
   }

   .description-input-wrapper {
      margin-top: 8rpx;

      .description-input {
         width: 100%;
         min-height: 120rpx;
         font-size: 28rpx;
         color: #333;
         line-height: 1.6;
         padding: 0;
      }
   }
}

/* AI优化区域 */
.ai-optimize-section {
   margin-bottom: 40rpx;

   .ai-banner {
      position: relative;
      height: 82rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;
      overflow: hidden;

      .ai-banner-left {
         flex: 1;
         width: 588rpx;
         height: 82rpx;
         line-height: 82rpx;
         background: url('../../static/images/circle/tipBg.webp');
         background-size: 100% 100%;
         padding: 0rpx 30rpx;
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-right: 16rpx;

         .ai-banner-text {
            font-size: 26rpx;
            color: #fff;
            font-weight: 400;
         }

         .ai-banner-tips {
            background: #FFFFFF;
            border-radius: 100px;
            padding: 0rpx 20rpx;
            height: 56rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .sparkle-icon {
               width: 32rpx;
               height: 32rpx;
               margin-right: 8rpx;
            }

            .optimize-tips {
               font-size: 22rpx;
               color: #000;
            }
         }
      }

      .ai-banner-right {
         flex-basis: 64rpx;
         width: 64rpx;
         height: 82rpx;
      }

      .ai-character {
         position: absolute;
         right: 0;
         top: 50%;
         transform: translateY(-50%);
         width: 100rpx;
         height: 100rpx;
         opacity: 0.9;
         z-index: 1;
      }
   }

   .ai-actions {
      display: flex;
      justify-content: flex-end;
      gap: 32rpx;
      padding-right: 16rpx;

      .ai-action-btn {
         display: flex;
         align-items: center;
         gap: 8rpx;

         .ai-action-text {
            font-size: 24rpx;
            color: #9C9C9C;
         }

         .arrow-icon {
            font-size: 32rpx;
            color: #9C9C9C;
         }
      }
   }
}

/* 标签区域 */
.tags-section {
   margin-bottom: 40rpx;

   .tag-buttons-row {
      display: flex;
      gap: 16rpx;
      margin-bottom: 24rpx;

      .tag-btn-large {
         height: 46rpx;
         border-radius: 12rpx;
         display: flex;
         align-items: center;
         justify-content: center;
         background: #F4F4F4;
         border-radius: 100px;
         padding: 0rpx 18rpx;

         .tag-btn-text {
            font-size: 22rpx;
            color: #000000;
            font-weight: 500;
         }
      }
   }

   .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx 16rpx;

      .tag-item-wrapper {
         position: relative;
         display: flex;
         align-items: center;

         .tag-item {
            position: relative;
            padding: 10rpx 18rpx;
            background-color: #F4F4F4;
            border-radius: 100rpx;
            display: flex;
            align-items: center;

            .tag-text {
               font-size: 22rpx;
               color: #999999;
            }

            .tag-recommended-label {
               position: absolute;
               top: -20rpx;
               right: -20rpx;
               padding: 4rpx 8rpx;
               background-color: #FF194A;
               border-radius: 100rpx 100rpx 100rpx 0rpx;
               font-size: 16rpx;
               color: #fff;
               white-space: nowrap;
               font-size: 16rpx;
            }
         }
      }
   }
}

/* 位置和可见性 */
.settings-section {
   margin-bottom: 40rpx;

   .setting-item {
      display: flex;
      align-items: center;
      padding: 24rpx 0;
      border-bottom: 1rpx solid #F0F0F0;

      &:last-child {
         border-bottom: none;
      }

      .setting-text {
         flex: 1;
         font-size: 28rpx;
         color: #3D3D3D;
      }
   }
}

/* 底部操作栏 */
.footer {
   width: 100%;
   background-color: #fff;
   padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 24rpx);

   .footer-safe-area {
      display: flex;
      align-items: center;
      padding: 24rpx 32rpx;
      gap: 24rpx;

      .save-draft-btn {
         width: 120rpx;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         gap: 8rpx;

         .caogao {
            background: #F4F4F4;
            width: 58rpx;
            height: 58rpx;
            box-sizing: border-box;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
         }

         .save-draft-text {
            font-size: 22rpx;
            color: #666;
            
         }
      }

      .publish-btn {
         flex: 1;
         height: 112rpx;
         background-color: #FF194A;
         border-radius: 473rpx;
         display: flex;
         align-items: center;
         justify-content: center;

         .publish-text {
            font-size: 32rpx;
            color: #fff;
            font-weight: 500;
         }
      }
   }
}
</style>

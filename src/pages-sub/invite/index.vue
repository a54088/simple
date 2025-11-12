<!--
 * @Author: 王硕
 * @Date: 2025-07-26 16:04:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:03:10
 * @Description: 
-->
.
<script setup>
import CustomNavbar from "@/components/custom-navbar/index.vue";
import { inject, ref } from "vue";
// import LoginApi from "@/api/auth/index.js";
import MemberApi from "@/api/member/index.js";
import DiceTag from "@/components/dice-tag/dice-tag.vue";
import { onLoad } from "@dcloudio/uni-app";
onLoad(() => {
    getRollConfig();
});

const diceTagLeft = ref();
const diceTagRight = ref();

const form = reactive({
  inviteCode: "",
  currentLeftValue: 6,
  currentRightValue: 6,
  targetSum: 6,
  dailyMaxTimes: 3,
  btnDisabled: false,
});

const getRollConfig = async() => {
    let {data} = await MemberApi.getRollConfig()
    if(data){
        // form.currentLeftValue = data.dice1Value
        // form.currentRightValue = data.dice2Value
        diceTagLeft.value.setCurrentValue(data.dice1Value || 6)
        diceTagRight.value.setCurrentValue(data.dice2Value || 6)
        if (data.inviteCode) {
        form.inviteCode = data.inviteCode
        form.btnDisabled = true
        }
        form.targetSum = data.targetSum || 6
        form.dailyMaxTimes = data.dailyMaxTimes || 3
    }
}

const onDiceTagLayoutClick = async() => {
    if (form.btnDisabled) {
        uni.showToast({
            title: "您已经摇中邀请码，不可再摇",
            icon: "none",
          });
        return
    }
    if(form.dailyMaxTimes <= 0){
        uni.showToast({
            title: "次数已用完",
            icon: "none",
          });
          return;
    }
    let {data} = await MemberApi.rollDice()
    form.currentLeftValue = data.dice1Value
    form.currentRightValue = data.dice2Value
    form.dailyMaxTimes = form.dailyMaxTimes - 1
    if(data.inviteCode){
        form.inviteCode = data.inviteCode
        form.btnDisabled = true
    }
  if (diceTagLeft.value && diceTagLeft.value.throwDice) {
    diceTagLeft.value.throwDice(data.dice1Value);
    // diceTagRight.value.setCurrentValue(data.dice1Value)
  }
  if (diceTagRight.value && diceTagRight.value.throwDice) {
    diceTagRight.value.throwDice(data.dice2Value);
    // diceTagLeft.value.setCurrentValue(data.dice2Value)
  }
};

const onClick = async () => {
  // await inviteFormRef.value.validate();
  if (!form.inviteCode) {
    uni.showToast({
      title: "请输入邀请码",
      icon: "none",
    });
    return;
  }
  MemberApi.useInviteCode({
    code: form.inviteCode,
  })
    .then((res) => {
      if (res.code === 0) {
        uni.showToast({
          title: "邀请码校验成功",
          icon: "success",
        });
        uni.switchTab({
          url: "/pages/home/index",
        });
      } else {
        uni.showToast({
          title: res.msg || "邀请码校验失败",
          icon: "none",
        });
      }
    })
    .catch((err) => {
      uni.showToast({
        title: err.msg || "邀请码校验失败",
        icon: "none",
      });
      console.log(err);
    });
};
</script>

<template>
  <view class="dice-form">
    <CustomNavbar
      leftIconColor="#000"
      title=""
      bgColor="transparent"
    />
    <img src="@/static/images/login/invite/yq.gif" class="invite-form__gif" />

    <view class="invite-form__form">
      <img
        src="@/static/images/login/invite/hyq.png"
        class="invite-form__hyq"
      />
    </view>
    <view class="invite-form__kp">
      <view class="invite-form__layout">
        <text class="invite-form__title">邀请码</text>
        <view class="invite-form__input">
          <u-input
            v-model="form.inviteCode"
            border="none"
            placeholder="请输入你的邀请码"
            :disabled="form.btnDisabled"
          >
          </u-input>
        </view>
      </view>
      <view class="login_button__layout" @tap="onClick">
        确 定
      </view>
    </view>
    <view class="invite-form__tips1">没有邀请码？</view>
    <view class="invite-form__tips2">可以点击骰子碰碰运气，</view>
    <view class="invite-form__tips2">我们会给相加为 {{ form.targetSum }} 的你发放邀请码</view>
    <view class="dice-tag__layout">
      <DiceTag ref="diceTagLeft" @tap="onDiceTagLayoutClick" :current-value="form.currentLeftValue" style="margin-right: 30rpx;"/>
      <DiceTag ref="diceTagRight" @tap="onDiceTagLayoutClick" :current-value="form.currentRightValue" />
    </view>
    <view class="invite-form__tips3">
        剩余次数：{{form.dailyMaxTimes}}次
    </view>
  </view>
</template>

<style lang="scss" scoped>
.dice-form {
  //   padding: 130rpx 0 0;
  height: 100%;
  width: 100%;
  position: relative;
  background: url("@/static/images/login/invite/yaoqingbeijing.png");
  //   background-size: cover;
  background-size: 100% 100%;
  padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
  .invite-form__gif {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 535rpx;
    z-index: 1;
  }

  .login_button__layout {
    // background: #1678ff;
    color: white;
    border-radius: 8rpx;
    font-size: 32rpx;
    height: 92rpx;
    line-height: 92rpx;
  }
  .dice-tag__layout {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 60rpx;
  }
  .invite-form__hyq {
    width: 408rpx;
    height: 135rpx;
    margin: 0 auto;
  }
  .invite-form__kp {
    width: 610rpx;
    height: 364rpx;
    margin: 0 auto;
    background: url("@/static/images/login/invite/kp.png");
    background-size: 100% 100%;
    display: flex;
    margin-bottom: 93rpx;
    // justify-content: center;
    // flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    .invite-form__layout {
      display: flex;
      justify-content: center;
    //   position: absolute;
      width: 530rpx;
      height: 96rpx;
      border-radius: 258rpx;
      padding: 26rpx 0rpx 26rpx 40rpx;
      background: rgba(0, 0, 0, 0.04);
      border: 1rpx solid rgba(255, 255, 255, 0.1);
      margin-top: 77rpx;
      margin-bottom: 103rpx;
    }
    .invite-form__title {
      font-size: 28rpx;
      color: #3d3d3d;
      margin-right: 20rpx;
    }
    .invite-form__input {
      width: 380rpx;
    }
  }
  .invite-form__form {
    display: flex;
    justify-content: center;
    margin-top: 500rpx;
    margin-bottom: 40rpx;
  }
  .invite-form__tips1 {
    
font-size: 32rpx;
color: #666666;
text-align: center;
margin-bottom: 16rpx;
  }
  .invite-form__tips2 {
    
font-size: 24rpx;
color: #9E9E9E;
text-align: center;
  }
  .invite-form__tips3 {
    
font-size: 24rpx;
color: #9E9E9E;
text-align: center;
width: 245rpx;
height: 57rpx;
border-radius: 80rpx;
// padding: 10px 30px;
background: #FFFFFF;
margin: 0 auto;
line-height: 57rpx;
  }
}
</style>

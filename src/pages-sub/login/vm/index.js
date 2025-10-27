/*
 * @Author: 王硕
 * @Date: 2025-07-26 15:40:46
 * @LastEditors: hch
 * @LastEditTime: 2025-10-22 13:22:48
 * @Description:
 */
import { ViewModel } from "@/shared/class/view-model.js";
import LoginApi from "@/api/auth/index.js";
import { useUserStore } from "@/store/index";
import tab1 from "@/static/images/login/tab1.png";
import tab2 from "@/static/images/login/tab2.png";
import userApi from "@/api/user/index";

import imApi from "@/api/im/index.js";
import { TUILogin } from "@tencentcloud/tui-core";
// #ifdef APP-PLUS || H5
import { TUIChatKit } from "../../../TUIKit";
// #endif

export class LoginVM extends ViewModel {
  tabIndex = 1;

  isSmsLogin = false;

  registerForm = {
    /** 推荐码 */
    recommenderCode: "",
    /** 手机号 */
    mobile: "",
    /** 密码 */
    password: "",
    /** 确认密码 */
    confirmPassword: "",
    /** 验证码 */
    mobileCode: "",
    invitMobile: "",
  };

  loginForm = {
    /** 手机号 */
    mobile: "",
    /** 密码 */
    password: "",
  };

  smsForm = {
    /** 手机号 */
    mobile: "",
    /** 验证码 */
    code: "",
  };

  isAgreement = false;

  smsFormRef = null;

  passwordFormRef = null;

  registerFormRef = null;

  smsCodeRef = null;

  smsLoginCodeRef = null;

  constructor() {
    super();
  }

  get tabList() {
    if (this.isSmsLogin) {
      return [
        {
          label: "新用户注册",
          backgroundImage: tab1,
          key: "register",
        },
        {
          label: "验证码登录",
          backgroundImage: tab2,
          key: "sms",
        },
      ];
    }
    return [
      {
        label: "新用户注册",
        backgroundImage: tab1,
        key: "register",
      },
      {
        label: "密码登录",
        backgroundImage: tab2,
        key: "password",
      },
    ];
  }

  get currentTab() {
    return this.tabList[this.tabIndex];
  }

  get loginButtonText() {
    if (this.tabIndex === 0) {
      return "注册";
    }
    if (this.tabIndex === 1) {
      return "登录";
    }
    return "登录";
  }
  setTab (index) {
    this.tabIndex = +index;
  }
  setInvitMobile (mobile) {
    const lastFourDigits = mobile.match(/\d{4}$/)[0];
    this.registerForm.invitMobile = lastFourDigits;
  }
  // 获取短信验证码
  getSmsLoginCode() {
    if (this.smsLoginCodeRef.canGetCode) {
      // 模拟向后端请求验证码
      uni.showLoading({
        title: "正在获取验证码",
      });
      this.sendSmsLoginCode();
    } else {
      // uni.$u.toast("倒计时结束后再发送");
    }
  }

  getCode() {
    if (this.smsCodeRef.canGetCode) {
      // 模拟向后端请求验证码
      uni.showLoading({
        title: "正在获取验证码",
      });
      this.sendSmsCode();
    } else {
      // uni.$u.toast("倒计时结束后再发送");
    }
  }

  submit() {
    if (this.tabIndex === 0) {
      this.registerPre();
    } else {
      if (this.isSmsLogin) {
        this.smsLoginPre();
      } else {
        this.loginPre();
      }
    }
  }
  setInviteCode(inviteCode) {
    this.registerForm.recommenderCode = inviteCode;
  }
  async registerPre() {
    try {
      await this.registerFormRef.validate();
      this.register();
    } catch (e) {
      console.log("校验不通过");
    }
  }

  async register() {
    try {
      const parameter = {
        registerCode: this.registerForm.recommenderCode,
        mobile: this.registerForm.mobile,
        password: this.registerForm.password,
        suerPassword: this.registerForm.confirmPassword,
        code: this.registerForm.mobileCode,
      };
      const { data } = await LoginApi.register(parameter);
      if (data) {
        uni.$u.toast("注册成功");
        this.tabIndex = 1;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async smsLoginPre() {
    try {
      await this.smsFormRef.validate();
      this.smsLogin();
    } catch (e) {
      console.log("校验不通过");
    }
  }

  async loginPre() {
    try {
      await this.passwordFormRef.validate();
      this.login();
    } catch (e) {
      console.log("校验不通过");
    }
  }

  async sendSmsLoginCode() {
    try {
      const parameter = {
        scene: 1,
        mobile: this.smsForm.mobile,
      };
      const { code, data } = await LoginApi.sendSmsCode(parameter);

      if (data) {
        uni.$u.toast("验证码已发送");
        // 通知验证码组件内部开始倒计时
        this.smsLoginCodeRef.start();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async sendSmsCode() {
    try {
      const parameter = {
        scene: 5,
        mobile: this.registerForm.mobile,
      };
      const { code, data } = await LoginApi.sendSmsCode(parameter);

      if (data) {
        uni.$u.toast("验证码已发送");
        // 通知验证码组件内部开始倒计时
        this.smsCodeRef.start();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async registerIm(userInfo) {
    console.log(userInfo);

    try {
      // #ifdef APP-PLUS || H5
      TUIChatKit.init();
      // #endif
      let vueVersion = 2;
      // #ifdef VUE3
      vueVersion = 3;
      // #endif
      let { data } = await imApi.getUserSig({ identifier: userInfo.mobile });
      TUILogin.login({
        SDKAppID: 1600101358,
        userID: `${userInfo.mobile}`,
        userSig: data,
        useUploadPlugin: true, // If you need to send rich media messages, please set to true.
        framework: `vue${vueVersion}`, // framework used vue2 / vue3
      });
    } catch (error) {
      console.log(error);
    }
  }

  async smsLogin() {
    try {
      uni.showLoading({
        title: "登录中...",
      });

      const parameter = {
        ...this.smsForm,
      };
      const { data, code } = await LoginApi.smsLogin(parameter);
      const { accessToken, refreshToken, userId } = data;
      useUserStore().setToken(accessToken);
      useUserStore().setUserId(userId);
      useUserStore().setRefreshToken(refreshToken);
      const { data: userData, code: userCode } = await userApi.getUserInfo();
      if (userCode == 0) {
        useUserStore().setUserInfo(userData);
      }
      // 登录im服务
      // this.registerIm(userData)
      if (getCurrentPages().length === 1) {
        uni.switchTab({
          url: "/pages/home/index",
        });
      } else {
        const pages = getCurrentPages(); // 当前页面
        const beforePage = pages[pages.length - 2]; // 上一页
        uni.navigateBack({
          delta: 1,
          success: () => {
            beforePage.onLoad(); // 执行上一页的onLoad方法
          },
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      uni.hideLoading();
    }
  }

  async login() {
    try {
      uni.showLoading({
        title: "登录中...",
      });

      const parameter = {
        ...this.loginForm,
      };
      const { data, code } = await LoginApi.login(parameter);
      const { accessToken, refreshToken, userId } = data;
      useUserStore().setToken(accessToken);
      useUserStore().setUserId(userId);
      useUserStore().setRefreshToken(refreshToken);
      const { data: userData, code: userCode } = await userApi.getUserInfo();
      if (userCode == 0) {
        useUserStore().setUserInfo(userData);
      }
      // 登录im服务
      // this.registerIm(userData)
      if (getCurrentPages().length === 1) {
        uni.switchTab({
          url: "/pages/home/index",
        });
      } else {
        const pages = getCurrentPages(); // 当前页面
        const beforePage = pages[pages.length - 2]; // 上一页
        uni.navigateBack({
          delta: 1,
          success: () => {
            beforePage.onLoad(); // 执行上一页的onLoad方法
          },
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      uni.hideLoading();
    }
  }
}

/*
 * @Author: 王硕
 * @Date: 2025-07-26 15:40:46
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:09:45
 * @Description:
 */
import { ViewModel } from "@/shared/class/view-model.js";
import LoginApi from "@/api/auth/index.js";
import memberApi from "@/api/member/index.js";
import { useUserStore } from "@/store/index";
import userApi from "@/api/user/index";
import { i18n } from '@/locale/index.js'
const { t } = i18n.global



export class LoginVM extends ViewModel {
  /**
   * 登录表单类型
   * password_login: 密码登录
   * sms_login: 短信登录(包括新用户注册)
   * forget_password: 忘记密码
   * mobile_auto_login: 手机号一键登录
   * invite_code: 邀请码
   * email_login: 邮箱登录
   */
  formType = "mobile_auto_login";

  // tabIndex = 1;

  isSmsLogin = false;

  forgetPasswordForm = {
    /** 手机号 */
    mobile: "",
    /** 密码 */
    password: "",
    /** 确认密码 */
    confirmPassword: "",
    /** 验证码 */
    mobileCode: "",
  };

  registerForm = {
    /** 手机号 */
    mobile: "",
    /** 密码 */
    password: "",
    /** 确认密码 */
    confirmPassword: "",
    /** 验证码 */
    mobileCode: "",
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
  emailForm = {
    /** 邮箱 */
    email: "",
    /** 验证码 */
    code: "",
  };

  isAgreement = false;

  smsFormRef = null;

  passwordFormRef = null;

  registerFormRef = null;

  smsCodeRef = null;

  smsLoginCodeRef = null;

  emailLoginCodeRef = null;

  emailFormRef = null;

  constructor() {
    super();
  }

  get loginButtonText() {
    if (this.formType === "register") {
      return t("login.confirm");
    }

    if (this.formType === "forget_password") {
      return t("confirm");
    }
    return t("login.button");
  }
  // setTab(index) {
  //   this.tabIndex = +index;
  // }
  
  // 获取短信验证码
  getSmsLoginCode() {
    if (this.smsLoginCodeRef.canGetCode) {
      // 模拟向后端请求验证码
      // uni.showLoading({
      //   title: t("login.getSmsLoginCode"),
      // });
      this.sendSmsLoginCode();
    } else {
      // uni.$u.toast("倒计时结束后再发送");
    }
  }

  getCode() {
    if (this.smsCodeRef.canGetCode) {
      // 模拟向后端请求验证码
      uni.showLoading({
        title: t("login.getSmsLoginCode"),
      });
      this.sendSmsCode();
    } else {
      // uni.$u.toast("倒计时结束后再发送");
    }
  }

  submit() {
    if (this.formType === "invite_code") {
      // this.useInviteCodePre();
      return;
    }
    if (this.formType === "mobile_auto_login") {
      // this.mobileAutoLoginPre();
      return;
    }
    if (this.formType === "password_login") {
      this.loginPre();
      return;
    }
    if (this.formType === "sms_login") {
      this.smsLoginPre();
      return;
    }
    if (this.formType === "email_login") {
      this.emailLoginPre();
      return;
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
  async getEmailLoginCode() {
    try {
      const parameter = {
        scene: 1,
        email: this.emailForm.email,
      };
      const { code, data } = await memberApi.sendEmailLoginCode(parameter);
      if (data) {
        uni.$u.toast(t("login.emailLoginCodeSent"));
        // 通知验证码组件内部开始倒计时
        this.emailFormRef.start();
      }
    } catch (e) {
      console.log(e);
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
        uni.$u.toast(t("registerSuccess"));
        this.tabIndex = 1;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async emailLoginPre() {
    try {
      await this.emailFormRef.validate();
      this.emailLogin();
    } catch (e) {
      console.log("校验不通过");
    }
  }
  async emailLogin() {
    try {
      uni.showLoading({
        title: t("login.loggingIn"),
      });

      const parameter = {
        // ...this.emailForm,
        mobile: this.emailForm.email,
        code: this.emailForm.code,
        // scene: 1,
      };
      const { data, code } = await memberApi.registerLogin(parameter);
      const { accessToken, refreshToken, userId } = data;
      useUserStore().setToken(accessToken);
      useUserStore().setUserId(userId);
      useUserStore().setRefreshToken(refreshToken);
      this.getUserInfo();
    } catch (e) {
      console.log(e);
    } finally {
      uni.hideLoading();
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
        uni.$u.toast(t("login.smsLoginCodeSent"));
        // 通知验证码组件内部开始倒计时
        this.emailLoginCodeRef.start();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async sendSmsCode() {
    try {
      const parameter = {
        scene: 1,
        mobile: this.registerForm.mobile,
      };
      const { code, data } = await LoginApi.sendSmsCode(parameter);

      if (data) {
        uni.$u.toast(t("login.smsLoginCodeSent"));
        // 通知验证码组件内部开始倒计时
        this.smsCodeRef.start();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async smsLogin() {
    try {
      uni.showLoading({
        title: t("login.loggingIn"),
      });

      const parameter = {
        ...this.smsForm,
        // scene: 1,
      };
      const { data, code } = await memberApi.registerLogin(parameter);
      const { accessToken, refreshToken, userId } = data;
      useUserStore().setToken(accessToken);
      useUserStore().setUserId(userId);
      useUserStore().setRefreshToken(refreshToken);
      this.getUserInfo();
    } catch (e) {
      console.log(e);
    } finally {
      uni.hideLoading();
    }
  }
  async getUserInfo() {
    try {
      const { data, code } = await memberApi.getUserInfo();
      if (code == 0) {
        useUserStore().setUserInfo(data);
      // 存在邀请码
      if (data.inviteFlag && !data.recommendUserId) {
        uni.navigateTo({
          url: "/pages-sub/invite/index",
        });
        // this.formType = "invite_code";
      } else {
        uni.switchTab({
          url: "/pages/home/index",
        });
        // uni.showToast({
        //   title: t("login.loginSuccess"),
        //   icon: "none",
        // });
      }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async login() {
    try {
      uni.showLoading({
        title: t("login.loggingIn"),
      });
      const parameter = {
        ...this.loginForm,
      };
      const { data, code } = await memberApi.authLogin(parameter);
      const { accessToken, refreshToken, userId } = data;
      useUserStore().setToken(accessToken);
      useUserStore().setUserId(userId);
      useUserStore().setRefreshToken(refreshToken);
      this.getUserInfo();
      // if (getCurrentPages().length === 1) {
      //   uni.switchTab({
      //     url: "/pages/home/index",
      //   });
      // } else {
      //   const pages = getCurrentPages(); // 当前页面
      //   const beforePage = pages[pages.length - 2]; // 上一页
      //   uni.navigateBack({
      //     delta: 1,
      //     success: () => {
      //       beforePage.onLoad(); // 执行上一页的onLoad方法
      //     },
      //   });
      // }
    } catch (e) {
      console.log(e);
    } finally {
      uni.hideLoading();
    }
  }
}

import Request from "../luch-request/index.js";
import { readFileToArrayBuffer } from "@/shared/utils/util.js";

const resHandler = (res, isRaw = false) => {
  return isRaw ? res : res.data;
};

class BasicClient {
  isRaw;
  httpClient;
  /**
   * @todo 增加双请求机制用于实现鉴权流程
   * @description http client 基类,你不应该直接用BasicClient创建client实例，
   * 应该继承BasicClient去使用
   * @classdesc 默认header是：{'Content-Type':'application/json'}
   *
   * baseURL默认使用的环境变量有VUE_APP_BASE_URL,VUE_APP_API_ROOT,API_ROOT,VUE_APP_BASE_URL
   *
   * @example
   * create a instance
   * const client = new BasicClient();
   * @param {object} [config={isRaw:false,service:""}] http client 的配置
   * @param {boolean} [config.isRaw=false] 是否直接返回HttpResponse实例
   * @param {string} [config.service=""] 默认服务名为空，可以指定服务名，会自动添加的client实例的baseURL中。
   * 如：service:"our-v1";baseURL会变成http://api.domain.com/our-v1
   * @param {object[]} [request_mws=[]]  请求中间件队列
   * @param {object[]} [response_mws=[]]  返回中间件队列
   */
  constructor(config, requestInterceptors = [], responseInterceptors = []) {
    this.isRaw = config.isRaw || false;
    const timeout = 30 * 1000;

    const options = {
      timeout,
      ...config,
    };
    // 创建实例 设置baseURL
    this.httpClient = new Request(options);
    // 切换环境拦截
    // this.httpClient.interceptors.request.use((config: HttpRequestConfig) => {
    //   if (appEnv.get() === 'test')
    //     config.baseURL = 'https://test-uaa.rys.cn'
    //   return config
    // })
    requestInterceptors.forEach((interceptor) => {
      this.httpClient.interceptors.request.use(
        interceptor.onFulfilled,
        interceptor.onRejected
      );
    });
    responseInterceptors.forEach((interceptor) => {
      this.httpClient.interceptors.response.use(
        interceptor.onFulfilled,
        interceptor.onRejected
      );
    });
  }

  /**
   * @description 创建get请求api
   * @param url
   * @param params
   * @param option 自定义头部
   * @returns {Promise<Object>}
   */
  async createGet(url, params = {}, option = {}) {
    const header = option.header || {};
    let config;
    try {
      config = {
        params,
        header,
      };
      const res = await this.httpClient.get(url, config);
      return resHandler(res, this.isRaw);
    } catch (e) {
      if (e && (e.isAccessInvalid || e.isLdapNeeded)) {
        // 第一次请求鉴权失败
        console.error("networking createGet 第一次请求鉴权失败");
        try {
          const res = await this.httpClient.get(url, config);
          return resHandler(res, this.isRaw);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  }

  /**
   * @description 创建post请求，header是application/json
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  async createPostJSON(url, params = {}, options = { timeout: 30000 }) {
    const header = options.header || { "Content-Type": "application/json" };
    const config = {
      header,
      timeout: options.timeout || 20000,
      params: options.params || {},
    };
    try {
      const res = await this.httpClient.post(url, params, config);
      return resHandler(res, this.isRaw);
    } catch (e) {
      if (e.isAccessInvalid || e.isLdapNeeded) {
        try {
          const res = await this.httpClient.post(url, params, config);
          return resHandler(res, this.isRaw);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  }
  async createUploadFile(file, presignedUrl) {
    try {
      // 读取文件为 ArrayBuffer
      const arrayBuffer = await readFileToArrayBuffer(file);
      // 使用 uni.request 发起 PUT 请求上传文件
      const response = await new Promise((resolve, reject) => {
        uni.request({
          url: presignedUrl,
          method: "PUT",
          data: arrayBuffer,
          header: {
            "Content-Type": file.type || "application/octet-stream",
          },
          success: (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              console.log("文件上传成功");
              resolve(res);
            } else {
              reject(new Error(`上传失败，状态码: ${res.statusCode}`));
            }
          },
          fail: (err) => {
            reject(new Error("网络请求失败: " + JSON.stringify(err)));
          },
        });
      });

      return response;
    } catch (error) {
      console.error("上传失败:", error);
      throw error;
    }
  }
  async uploadFileWithPresignedUrl(presignedUrl, file) {
    try {
      // 1. 读取文件为 ArrayBuffer
      const arrayBuffer = await readFileToArrayBuffer(file); // 实际返回的是 arraybuffer
      // 2. 使用 uni.request 发起 PUT 请求上传文件
      const response = await new Promise((resolve, reject) => {
        uni.request({
          url: presignedUrl,
          method: "PUT",
          data: arrayBuffer,
          header: {
            "Content-Type": file.type || "application/octet-stream",
          },
          success: (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(res);
            } else {
              reject(new Error(`上传失败，状态码: ${res.statusCode}`));
            }
          },
          fail: (err) => {
            reject(new Error("网络请求失败: " + JSON.stringify(err)));
          },
        });
      });

      console.log("文件上传成功:", response);
      return response;
    } catch (error) {
      console.error("上传失败:", error);
      throw error;
    }
  }
  /**
   * @description 创建put请求，header是application/json
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  async createPutJSON(url, params = {}, options = { timeout: 30000 }) {
    const header = options.header || { "Content-Type": "application/json" };
    const config = {
      header,
      timeout: options.timeout,
      params: options.params || {},
    };
    try {
      const res = await this.httpClient.put(url, params, config);
      return resHandler(res, this.isRaw);
    } catch (e) {
      if (e.isAccessInvalid || e.isLdapNeeded) {
        try {
          const res = await this.httpClient.put(url, params, config);
          return resHandler(res, this.isRaw);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  }

  /**
   * @description 创建delete请求
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  async createDelete(url, params = {}, options = { timeout: 30000 }) {
    const header = options.header || {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const config = {
      header,
      timeout: options.timeout || 20000,
      params: options.params || {},
    };
    try {
      const res = await this.httpClient.delete(url, params, config);
      return resHandler(res, this.isRaw);
    } catch (e) {
      if (e.isAccessInvalid || e.isLdapNeeded) {
        try {
          const res = await this.httpClient.delete(url, params, config);
          return resHandler(res, this.isRaw);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  }

  /**
   * @description 创建upload请求，
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  async createUpload(url, options = { timeout: 20000 }) {
    const header = options.header || { "Content-Type": "multipart/form-data" };
    const config = {
      ...options,
      header,
      timeout: options.timeout || 20000,
      params: options.params || {},
    };
    try {
      const res = await this.httpClient.upload(url, config);
      return resHandler(res, this.isRaw);
    } catch (e) {
      if (e.isAccessInvalid || e.isLdapNeeded) {
        try {
          const res = await this.httpClient.upload(url, config);
          return resHandler(res, this.isRaw);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  }

  // download
  /**
   * @description 创建upload请求，
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  async createDownload(url, options = { timeout: 20000 }) {
    const header = options.header || { "Content-Type": "multipart/form-data" };
    const config = {
      ...options,
      header,
      timeout: options.timeout || 20000,
      params: options.params || {},
    };
    try {
      const res = await this.httpClient.download(url, config);
      return resHandler(res, this.isRaw);
    } catch (e) {
      if (e.isAccessInvalid || e.isLdapNeeded) {
        try {
          const res = await this.httpClient.download(url, config);
          return resHandler(res, this.isRaw);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(e);
    }
  }
  async createDelete(endpoint, id) {
    try {
      const url = `${endpoint}?id=${id}`;
      const response = await this.httpClient.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(`DELETE request failed: ${error.message}`);
    }
  }
}

export default BasicClient;

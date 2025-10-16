/*
 * @Author: 王硕
 * @Date: 2025-06-27 14:49:55
 * @LastEditors: 王硕
 * @LastEditTime: 2025-07-28 11:17:27
 * @Description:
 */
import BasicClient from "@/shared/network/client/index";
import auth from "@/shared/network/request_auth";
import errorHandler from "@/shared/network/error_handler";
import reqAuth from "@/shared/network/req_pre_auth";
import resAuth from "@/shared/network/res_pre_auth";
import reqPre from "@/shared/network/res_pre.js";
import { baseUrl, apiPath } from "@/config";

const reqBasePath = `${baseUrl}${apiPath}`;
export const client = new BasicClient(
  { baseURL: reqBasePath, isRaw: false },
  [auth, reqPre],
  [errorHandler]
);

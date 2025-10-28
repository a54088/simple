/*
 * @ignore: 
 * @Date: 2025-07-31 10:56:03
 * @LastEditors: hch
 * @LastEditTime: 2025-08-11 13:47:50
 * @description: 
 * @FilePath: /aquan-action-app/src/shared/utils/util.js
 */
/**
* 将文件读取为 ArrayBuffer 对象（适配 uni-app 环境）
*
* @param file 文件对象
* @returns 返回一个 Promise 对象，resolve 时返回 ArrayBuffer 对象，reject 时返回错误对象
*/
export function readFileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        // #ifdef APP-PLUS
        plus.io.resolveLocalFileSystemURL(file.path, (entry) => {
            entry.file((fileEntry) => {
                const reader = new plus.io.FileReader();

                // 以 Data URL 格式读取文件，然后转换为 ArrayBuffer
                reader.readAsDataURL(fileEntry, 'utf-8');

                reader.onloadend = function (e) {
                    const result = {
                        base64: e.target.result.split(',')[1],
                        size: file.size,
                    }
                    resolve(uni.base64ToArrayBuffer(result.base64))
                };

                // 读取错误回调
                reader.onerror = function (e) {
                    reject(new Error('文件读取失败: ' + e.message));
                };

            }, (error) => {
                reject(new Error('获取文件对象失败: ' + error.message));
            });
        }, (error) => {
            reject(new Error('解析文件路径失败: ' + error.message));
        });
        // #endif

        // #ifdef H5
        const reader = new FileReader();

        // 当读取操作完成时触发
        reader.onload = function (event) {
            try {
                // 直接返回 ArrayBuffer
                resolve(event.target.result);
            } catch (error) {
                reject(error);
            }
        };

        // 当读取操作出错时触发
        reader.onerror = function (error) {
            reject(error);
        };

        // 以二进制形式读取文件内容
        reader.readAsArrayBuffer(file);
        // #endif
    });
}
export function extractTimeParts(timeStr) {
    // 查找第一个冒号的位置
    const firstColonIndex = timeStr.indexOf(':');
    // 查找第二个冒号的位置（如果存在）
    const secondColonIndex = timeStr.indexOf(':', firstColonIndex + 1);

    // 提取第一个冒号前的数字
    const firstPart = timeStr.substring(0, firstColonIndex);
    // 提取第一个冒号后，第二个冒号前的数字
    const secondPart = timeStr.substring(firstColonIndex + 1, secondColonIndex !== -1 ? secondColonIndex : timeStr.length);

    // 返回结果数组
    return `${firstPart}:${secondPart}`;
}

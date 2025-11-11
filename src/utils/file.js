/**
 * 文件上传工具
 * 支持上传文件到 OSS（通过 presigned URL）或直接上传到服务器
 * 
 * @example
 * // 1. 选择并上传图片到 OSS
 * import { chooseFile, uploadFile } from '@/utils/file'
 * 
 * const files = await chooseFile({ type: 'image', count: 1 })
 * const result = await uploadFile(files[0], {
 *   getPresignedUrlApi: '/api/oss/get-presigned-url',
 *   onProgress: (progress) => console.log(`上传进度: ${progress}%`)
 * })
 * 
 * @example
 * // 2. 直接上传到服务器
 * const result = await uploadFile(files[0], {
 *   uploadApi: '/api/upload',
 *   formData: { folder: 'images' },
 *   onProgress: (progress) => console.log(`上传进度: ${progress}%`)
 * })
 * 
 * @example
 * // 3. 批量上传文件
 * import { uploadFiles } from '@/utils/file'
 * const results = await uploadFiles(files, {
 *   getPresignedUrlApi: '/api/oss/get-presigned-url',
 *   onProgress: (progress, current, total) => {
 *     console.log(`总进度: ${progress}%, 当前: ${current}/${total}`)
 *   }
 * })
 */

import { readFileToArrayBuffer } from '@/shared/utils/util.js'
import { client } from '@/shared/network/index.js'
import { baseUrl, apiPath } from '@/config/index.js'

/**
 * 文件上传配置选项
 * @typedef {Object} UploadOptions
 * @property {string} [getPresignedUrlApi] - 获取 presigned URL 的 API 端点（如果使用 OSS 上传）
 * @property {string} [uploadApi] - 直接上传到服务器的 API 端点
 * @property {Function} [onProgress] - 上传进度回调函数 (progress) => void
 * @property {Object} [formData] - 额外的表单数据
 * @property {Object} [headers] - 额外的请求头
 * @property {number} [timeout] - 超时时间（毫秒），默认 60000
 * @property {boolean} [compress] - 是否压缩图片（仅图片），默认 false
 * @property {number} [quality] - 图片压缩质量（0-100），默认 80
 * @property {number} [maxSize] - 最大文件大小（字节），默认无限制
 * @property {string[]} [allowedTypes] - 允许的文件类型，如 ['image/jpeg', 'image/png']
 */

/**
 * 选择文件
 * @param {Object} options - 选择文件选项
 * @param {string} [options.sourceType='album'] - 选择文件来源 'album' | 'camera'
 * @param {number} [options.count=1] - 最多可以选择的文件个数
 * @param {string} [options.type='image'] - 文件类型 'image' | 'video' | 'file'
 * @param {string[]} [options.extension] - 根据文件扩展名筛选，仅 type 为 file 时有效
 * @returns {Promise<Array>} 返回选中的文件列表
 */
export function chooseFile(options = {}) {
  const {
    sourceType = 'album',
    count = 1,
    type = 'image',
    extension = []
  } = options

  return new Promise((resolve, reject) => {
    if (type === 'image') {
      // 选择图片
      uni.chooseImage({
        count,
        sourceType: [sourceType],
        success: (res) => {
          const files = res.tempFiles.map((file, index) => ({
            path: file.path,
            size: file.size,
            type: file.type || 'image',
            name: `image_${Date.now()}_${index}.${getFileExtension(file.path)}`,
            tempFilePath: file.path
          }))
          resolve(files)
        },
        fail: (err) => {
          reject(new Error('选择图片失败: ' + JSON.stringify(err)))
        }
      })
    } else if (type === 'video') {
      // 选择视频
      uni.chooseVideo({
        sourceType: [sourceType],
        maxDuration: 60,
        camera: 'back',
        success: (res) => {
          const files = [{
            path: res.tempFilePath,
            size: res.size || 0,
            type: 'video',
            name: `video_${Date.now()}.${getFileExtension(res.tempFilePath)}`,
            duration: res.duration,
            width: res.width,
            height: res.height,
            tempFilePath: res.tempFilePath
          }]
          resolve(files)
        },
        fail: (err) => {
          reject(new Error('选择视频失败: ' + JSON.stringify(err)))
        }
      })
    } else if (type === 'file') {
      // 选择文件（H5 和小程序支持不同）
      // #ifdef H5
      return new Promise((resolve, reject) => {
        try {
          const input = document.createElement('input')
          input.type = 'file'
          input.multiple = count > 1
          if (extension.length > 0) {
            input.accept = extension.map(ext => `.${ext}`).join(',')
          }
          input.onchange = (e) => {
            const selectedFiles = Array.from(e.target.files || [])
            if (selectedFiles.length === 0) {
              reject(new Error('未选择文件'))
              return
            }
            const files = selectedFiles.map((file, index) => ({
              file: file,
              path: file.name,
              size: file.size,
              type: file.type || 'file',
              name: file.name
            }))
            resolve(files)
            // 清理 input 元素
            document.body.removeChild(input)
          }
          input.oncancel = () => {
            reject(new Error('取消选择文件'))
            document.body.removeChild(input)
          }
          // 添加到 DOM 并触发点击（某些浏览器要求）
          input.style.display = 'none'
          document.body.appendChild(input)
          input.click()
        } catch (err) {
          reject(new Error('选择文件失败: ' + JSON.stringify(err)))
        }
      })
      // #endif

      // #ifdef MP-WEIXIN
      // 小程序使用 chooseMessageFile
      uni.chooseMessageFile({
        count,
        type: 'file',
        extension: extension.length > 0 ? extension : undefined,
        success: (res) => {
          const files = res.tempFiles.map((file, index) => ({
            path: file.path,
            size: file.size,
            type: file.type || 'file',
            name: file.name || `file_${Date.now()}_${index}.${getFileExtension(file.path)}`,
            tempFilePath: file.path
          }))
          resolve(files)
        },
        fail: (err) => {
          reject(new Error('选择文件失败: ' + JSON.stringify(err)))
        }
      })
      // #endif
    } else {
      reject(new Error('不支持的文件类型: ' + type))
    }
  })
}

/**
 * 压缩图片
 * @param {string} filePath - 图片文件路径
 * @param {number} quality - 压缩质量（0-100）
 * @returns {Promise<string>} 返回压缩后的图片路径
 */
export function compressImage(filePath, quality = 80) {
  return new Promise((resolve, reject) => {
    uni.compressImage({
      src: filePath,
      quality,
      success: (res) => {
        resolve(res.tempFilePath)
      },
      fail: (err) => {
        reject(new Error('图片压缩失败: ' + JSON.stringify(err)))
      }
    })
  })
}

/**
 * 上传文件到 OSS（通过 presigned URL）
 * @param {Object} file - 文件对象
 * @param {string} presignedUrl - presigned URL
 * @param {UploadOptions} options - 上传选项
 * @returns {Promise<Object>} 返回上传结果
 */
export async function uploadToOSS(file, presignedUrl, options = {}) {
  try {
    // 验证文件大小
    if (options.maxSize && file.size > options.maxSize) {
      throw new Error(`文件大小超过限制，最大 ${formatFileSize(options.maxSize)}`)
    }

    // 验证文件类型
    if (options.allowedTypes && file.type && !options.allowedTypes.includes(file.type)) {
      throw new Error(`不支持的文件类型: ${file.type}`)
    }

    // 读取文件为 ArrayBuffer
    const arrayBuffer = await readFileToArrayBuffer(file)

    // 使用 uni.request 发起 PUT 请求上传文件（OSS 通常使用 PUT 方法）
    return new Promise((resolve, reject) => {
      uni.request({
        url: presignedUrl,
        method: 'PUT',
        data: arrayBuffer,
        header: {
          'Content-Type': file.type || 'application/octet-stream',
          ...options.headers
        },
        timeout: options.timeout || 60000,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              success: true,
              statusCode: res.statusCode,
              data: res.data
            })
          } else {
            reject(new Error(`上传失败，状态码: ${res.statusCode}`))
          }
        },
        fail: (err) => {
          reject(new Error('网络请求失败: ' + JSON.stringify(err)))
        }
      })
    })
  } catch (error) {
    console.error('上传文件到 OSS 失败:', error)
    throw error
  }
}

/**
 * 直接上传文件到服务器
 * @param {Object} file - 文件对象
 * @param {string} uploadApi - 上传 API 端点
 * @param {UploadOptions} options - 上传选项
 * @returns {Promise<Object>} 返回上传结果
 */
export async function uploadToServer(file, uploadApi, options = {}) {
  try {
    // 验证文件大小
    if (options.maxSize && file.size > options.maxSize) {
      throw new Error(`文件大小超过限制，最大 ${formatFileSize(options.maxSize)}`)
    }

    // 验证文件类型
    if (options.allowedTypes && file.type && !options.allowedTypes.includes(file.type)) {
      throw new Error(`不支持的文件类型: ${file.type}`)
    }

    const filePath = file.tempFilePath || file.path || file.filePath
    if (!filePath) {
      throw new Error('文件路径不存在')
    }

    // 构建完整的上传 URL
    const fullUrl = uploadApi.startsWith('http') 
      ? uploadApi 
      : `${baseUrl}${apiPath}${uploadApi}`

    // 使用 uni.uploadFile 上传文件（支持进度回调）
    return new Promise((resolve, reject) => {
      const uploadTask = uni.uploadFile({
        url: fullUrl,
        filePath: filePath,
        name: options.name || 'file',
        formData: options.formData || {},
        header: {
          ...options.headers
        },
        timeout: options.timeout || 60000,
        success: (res) => {
          try {
            let data = res.data
            // 尝试解析 JSON 响应
            if (typeof data === 'string') {
              try {
                data = JSON.parse(data)
              } catch (e) {
                // 如果不是 JSON，保持原样
              }
            }
            
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve({
                success: true,
                statusCode: res.statusCode,
                data: data
              })
            } else {
              reject(new Error(`上传失败，状态码: ${res.statusCode}`))
            }
          } catch (error) {
            reject(error)
          }
        },
        fail: (err) => {
          reject(new Error('上传失败: ' + JSON.stringify(err)))
        }
      })

      // 监听上传进度
      if (uploadTask && uploadTask.onProgressUpdate && options.onProgress) {
        uploadTask.onProgressUpdate((progressEvent) => {
          if (options.onProgress) {
            const progress = progressEvent.progress || 0
            options.onProgress(progress)
          }
        })
      }
    })
  } catch (error) {
    console.error('上传文件到服务器失败:', error)
    throw error
  }
}

/**
 * 上传文件（自动选择上传方式）
 * @param {Object} file - 文件对象
 * @param {UploadOptions} options - 上传选项
 * @returns {Promise<Object>} 返回上传结果
 */
export async function uploadFile(file, options = {}) {
  try {
    // 判断是否为图片文件
    const isImage = file.type 
      ? file.type.startsWith('image/') 
      : /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(file.name || file.path || '')

    // 如果提供了压缩选项且是图片，先压缩
    if (options.compress && isImage && (file.tempFilePath || file.path)) {
      try {
        const compressedPath = await compressImage(
          file.tempFilePath || file.path,
          options.quality || 80
        )
        file.tempFilePath = compressedPath
        file.path = compressedPath
      } catch (err) {
        console.warn('图片压缩失败，使用原图:', err)
      }
    }

    // 如果提供了 getPresignedUrlApi，使用 OSS 上传
    if (options.getPresignedUrlApi) {
      // 1. 获取 presigned URL
      const presignedUrlResponse = await client.createPostJSON(
        options.getPresignedUrlApi,
        {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          ...options.formData
        }
      )

      const presignedUrl = presignedUrlResponse.data?.presignedUrl || presignedUrlResponse.presignedUrl

      if (!presignedUrl) {
        throw new Error('获取 presigned URL 失败')
      }

      // 2. 上传文件到 OSS
      const uploadResult = await uploadToOSS(file, presignedUrl, options)

      // 3. 返回结果（可能包含文件的访问 URL）
      return {
        success: true,
        url: presignedUrlResponse.data?.url || presignedUrlResponse.url,
        presignedUrl,
        ...uploadResult
      }
    }

    // 如果提供了 uploadApi，直接上传到服务器
    if (options.uploadApi) {
      return await uploadToServer(file, options.uploadApi, options)
    }

    throw new Error('请提供 getPresignedUrlApi 或 uploadApi')
  } catch (error) {
    console.error('上传文件失败:', error)
    throw error
  }
}

/**
 * 批量上传文件
 * @param {Array<Object>} files - 文件对象数组
 * @param {UploadOptions} options - 上传选项
 * @returns {Promise<Array>} 返回上传结果数组
 */
export async function uploadFiles(files, options = {}) {
  const results = []
  const total = files.length

  for (let i = 0; i < files.length; i++) {
    try {
      const file = files[i]
      
      // 更新进度回调，计算总体进度
      const fileOptions = {
        ...options,
        onProgress: (progress) => {
          if (options.onProgress) {
            const overallProgress = ((i + progress / 100) / total) * 100
            options.onProgress(overallProgress, i + 1, total)
          }
        }
      }

      const result = await uploadFile(file, fileOptions)
      results.push({
        success: true,
        file: file,
        data: result
      })
    } catch (error) {
      results.push({
        success: false,
        file: files[i],
        error: error.message || error
      })
    }
  }

  return results
}

/**
 * 预览图片
 * @param {string|Array<string>} urls - 图片 URL 或 URL 数组
 * @param {number} [current] - 当前显示的图片索引
 */
export function previewImage(urls, current = 0) {
  const urlArray = Array.isArray(urls) ? urls : [urls]
  
  uni.previewImage({
    urls: urlArray,
    current: typeof current === 'number' ? urlArray[current] : current,
    fail: (err) => {
      console.error('预览图片失败:', err)
      uni.showToast({
        title: '预览图片失败',
        icon: 'none'
      })
    }
  })
}

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名或路径
 * @returns {string} 文件扩展名
 */
export function getFileExtension(filename) {
  if (!filename) return ''
  const lastDot = filename.lastIndexOf('.')
  return lastDot !== -1 ? filename.substring(lastDot + 1).toLowerCase() : ''
}

/**
 * 格式化文件大小
 * @param {number} bytes - 文件大小（字节）
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * 验证文件类型
 * @param {string} filename - 文件名
 * @param {string[]} allowedExtensions - 允许的扩展名数组
 * @returns {boolean} 是否允许
 */
export function validateFileType(filename, allowedExtensions) {
  if (!allowedExtensions || allowedExtensions.length === 0) return true
  
  const extension = getFileExtension(filename)
  return allowedExtensions.includes(extension.toLowerCase())
}

/**
 * 验证文件大小
 * @param {number} fileSize - 文件大小（字节）
 * @param {number} maxSize - 最大文件大小（字节）
 * @returns {boolean} 是否允许
 */
export function validateFileSize(fileSize, maxSize) {
  if (!maxSize) return true
  return fileSize <= maxSize
}

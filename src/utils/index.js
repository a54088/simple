/**
 * 判断当前系统语言是否为国内语言
 * 国内语言定义：简体中文、繁体中文(台湾)、繁体中文(香港)
 * @returns {boolean} 返回true表示国内语言，false表示国外语言
 */
export function isChineseLocale() {
  // return false
  try {
    // 1. 首先尝试从navigator获取语言设置
    let lang = '';
    if (typeof navigator !== 'undefined') {
      lang = navigator.language || navigator.userLanguage || '';
    }
    
    // 2. 如果navigator不可用，尝试从uni-app API获取
    if (!lang && typeof uni !== 'undefined') {
      try {
        const systemInfo = uni.getSystemInfoSync();
        if (systemInfo && systemInfo.language) {
          lang = systemInfo.language;
        }
      } catch (e) {
        console.warn('获取系统信息失败:', e);
      }
    }
    
    // 3. 尝试从本地存储获取保存的语言设置
    if (!lang && typeof uni !== 'undefined') {
      try {
        lang = uni.getStorageSync('systemLanguage') || '';
      } catch (e) {
        console.warn('获取存储的语言设置失败:', e);
      }
    }
    
    // 转换为小写进行比较
    lang = lang.toLowerCase();
    
    // 判断是否为中文相关语言
    // zh-CN: 简体中文(中国大陆)
    // zh-TW: 繁体中文(台湾)
    // zh-HK: 繁体中文(香港)
    // zh-SG: 简体中文(新加坡)
    // zh: 通用中文
    const chineseLocales = [
      'zh',      // 通用中文
      'zh-cn',   // 简体中文(中国大陆)
      'zh-tw',   // 繁体中文(台湾)
      'zh-hk',   // 繁体中文(香港)
      'zh-sg',   // 简体中文(新加坡)
      'cn',      // 中国地区代码
      'tw',      // 台湾地区代码
      'hk'       // 香港地区代码
    ];
    
    // 检查语言代码是否包含中文标识
    if (lang && (chineseLocales.includes(lang) || lang.includes('zh') || lang.includes('cn'))) {
      return true;
    }
    
    // 默认返回false（国外语言）
    return false;
  } catch (e) {
    console.error('判断语言环境时出错:', e);
    // 出错时默认返回false（国外语言）
    return false;
  }
}

/**
 * 获取当前系统语言代码
 * @returns {string} 语言代码，如 'zh-CN', 'en-US' 等
 */
export function getSystemLanguage() {
  try {
    // 首先尝试从navigator获取
    if (typeof navigator !== 'undefined') {
      return navigator.language || navigator.userLanguage || '';
    }
    
    // 然后尝试从uni-app API获取
    if (typeof uni !== 'undefined') {
      try {
        const systemInfo = uni.getSystemInfoSync();
        if (systemInfo && systemInfo.language) {
          return systemInfo.language;
        }
      } catch (e) {
        console.warn('获取系统信息失败:', e);
      }
    }
    
    // 最后尝试从本地存储获取
    if (typeof uni !== 'undefined') {
      try {
        return uni.getStorageSync('systemLanguage') || '';
      } catch (e) {
        console.warn('获取存储的语言设置失败:', e);
      }
    }
    
    return '';
  } catch (e) {
    console.error('获取系统语言时出错:', e);
    return '';
  }
}

/**
 * 获取保存的语言设置
 * @returns {string|null} 保存的语言代码，如果没有则返回null
 */
export function getLanguageSetting() {
  try {
    if (typeof uni !== 'undefined') {
      return uni.getStorageSync('systemLanguage') || null;
    }
    return null;
  } catch (e) {
    console.error('获取语言设置失败:', e);
    return null;
  }
}

/**
 * 保存语言设置到本地存储
 * @param {string} language 语言代码
 */
export function saveLanguageSetting(language) {
  try {
    if (typeof uni !== 'undefined') {
      uni.setStorageSync('systemLanguage', language);
    }
  } catch (e) {
    console.error('保存语言设置失败:', e);
  }
}
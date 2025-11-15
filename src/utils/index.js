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

/**
 * 获取中文汉字的拼音首字母
 * @param {string} chinese 中文字符串
 * @returns {string} 拼音首字母（大写），非汉字返回原字符
 */
export function getChineseFirstLetter(chinese) {
  if (!chinese || typeof chinese !== 'string') {
    return '#';
  }
  
  // 简单的拼音首字母映射表（常用汉字）
  const pinyinMap = {
    // A
    '啊': 'A', '阿': 'A', '埃': 'A', '哀': 'A', '皑': 'A', '癌': 'A', '蔼': 'A', '矮': 'A', '艾': 'A', '碍': 'A',
    // B
    '八': 'B', '巴': 'B', '拔': 'B', '跋': 'B', '把': 'B', '靶': 'B', '坝': 'B', '霸': 'B', '罢': 'B', '爸': 'B',
    // C
    '擦': 'C', '猜': 'C', '裁': 'C', '材': 'C', '才': 'C', '财': 'C', '睬': 'C', '踩': 'C', '彩': 'C', '菜': 'C',
    // D
    '大': 'D', '呆': 'D', '歹': 'D', '傣': 'D', '戴': 'D', '带': 'D', '殆': 'D', '代': 'D', '贷': 'D', '袋': 'D',
    // E
    '峨': 'E', '鹅': 'E', '俄': 'E', '额': 'E', '厄': 'E', '扼': 'E', '遏': 'E', '鄂': 'E', '饿': 'E', '恩': 'E',
    // F
    '发': 'F', '罚': 'F', '筏': 'F', '伐': 'F', '乏': 'F', '法': 'F', '珐': 'F', '藩': 'F', '帆': 'F', '番': 'F',
    // G
    '噶': 'G', '改': 'G', '概': 'G', '钙': 'G', '盖': 'G', '溉': 'G', '干': 'G', '甘': 'G', '杆': 'G', '柑': 'G',
    // H
    '哈': 'H', '骸': 'H', '孩': 'H', '海': 'H', '氦': 'H', '亥': 'H', '害': 'H', '骇': 'H', '酣': 'H', '憨': 'H',
    // J
    '击': 'J', '圾': 'J', '基': 'J', '机': 'J', '畸': 'J', '稽': 'J', '积': 'J', '箕': 'J', '肌': 'J', '饥': 'J',
    // K
    '卡': 'K', '喀': 'K', '咖': 'K', '揩': 'K', '楷': 'K', '凯': 'K', '慨': 'K', '刊': 'K', '堪': 'K', '勘': 'K',
    // L
    '垃': 'L', '拉': 'L', '喇': 'L', '蜡': 'L', '腊': 'L', '辣': 'L', '啦': 'L', '莱': 'L', '来': 'L', '赖': 'L',
    // M
    '妈': 'M', '麻': 'M', '玛': 'M', '码': 'M', '蚂': 'M', '马': 'M', '骂': 'M', '嘛': 'M', '吗': 'M', '埋': 'M',
    // N
    '拿': 'N', '乃': 'N', '奶': 'N', '耐': 'N', '奈': 'N', '南': 'N', '男': 'N', '难': 'N', '囊': 'N', '挠': 'N',
    // O
    '哦': 'O', '欧': 'O', '殴': 'O', '鸥': 'O', '呕': 'O', '偶': 'O', '沤': 'O',
    // P
    '啪': 'P', '趴': 'P', '爬': 'P', '帕': 'P', '怕': 'P', '琶': 'P', '拍': 'P', '排': 'P', '牌': 'P', '徘': 'P',
    // Q
    '期': 'Q', '欺': 'Q', '栖': 'Q', '戚': 'Q', '妻': 'Q', '七': 'Q', '凄': 'Q', '漆': 'Q', '其': 'Q', '棋': 'Q',
    // R
    '然': 'R', '燃': 'R', '冉': 'R', '染': 'R', '瓤': 'R', '壤': 'R', '攘': 'R', '嚷': 'R', '让': 'R', '饶': 'R',
    // S
    '撒': 'S', '洒': 'S', '萨': 'S', '腮': 'S', '鳃': 'S', '塞': 'S', '赛': 'S', '三': 'S', '叁': 'S', '伞': 'S',
    // T
    '塌': 'T', '他': 'T', '它': 'T', '她': 'T', '塔': 'T', '獭': 'T', '挞': 'T', '蹋': 'T', '胎': 'T', '苔': 'T',
    // W
    '挖': 'W', '哇': 'W', '蛙': 'W', '洼': 'W', '娃': 'W', '瓦': 'W', '袜': 'W', '歪': 'W', '外': 'W', '豌': 'W',
    // X
    '昔': 'X', '析': 'X', '西': 'X', '硒': 'X', '矽': 'X', '晰': 'X', '嘻': 'X', '吸': 'X', '锡': 'X', '牺': 'X',
    // Y
    '压': 'Y', '押': 'Y', '鸦': 'Y', '鸭': 'Y', '牙': 'Y', '芽': 'Y', '蚜': 'Y', '崖': 'Y', '涯': 'Y', '雅': 'Y',
    // Z
    '扎': 'Z', '杂': 'Z', '砸': 'Z', '灾': 'Z', '哉': 'Z', '栽': 'Z', '宰': 'Z', '载': 'Z', '再': 'Z', '在': 'Z'
  };
  
  // 获取第一个字符
  const firstChar = chinese.charAt(0);
  
  // 如果是英文字母，直接返回大写
  if (/^[A-Za-z]$/.test(firstChar)) {
    return firstChar.toUpperCase();
  }
  
  // 检查是否在拼音映射表中
  if (pinyinMap[firstChar]) {
    return pinyinMap[firstChar];
  }
  
  // 对于不在映射表中的字符，使用字符编码范围判断
  const charCode = firstChar.charCodeAt(0);
  
  // 常见汉字的Unicode范围
  if (charCode >= 0x4e00 && charCode <= 0x9fff) {
    // 使用一个简化的拼音首字母判断算法
    const pinyinFirstLetter = [
      // 按照Unicode编码范围划分拼音首字母
      { start: 0x4e00, end: 0x513f, letter: 'A' },
      { start: 0x5140, end: 0x547f, letter: 'B' },
      { start: 0x5480, end: 0x57bf, letter: 'C' },
      { start: 0x57c0, end: 0x5af7, letter: 'D' },
      { start: 0x5af8, end: 0x5dff, letter: 'E' },
      { start: 0x5e00, end: 0x613f, letter: 'F' },
      { start: 0x6140, end: 0x647f, letter: 'G' },
      { start: 0x6480, end: 0x67bf, letter: 'H' },
      { start: 0x67c0, end: 0x6b7f, letter: 'J' },
      { start: 0x6b80, end: 0x6ebf, letter: 'K' },
      { start: 0x6ec0, end: 0x713f, letter: 'L' },
      { start: 0x7140, end: 0x747f, letter: 'M' },
      { start: 0x7480, end: 0x77bf, letter: 'N' },
      { start: 0x77c0, end: 0x7ab7, letter: 'O' },
      { start: 0x7ab8, end: 0x7ebf, letter: 'P' },
      { start: 0x7ec0, end: 0x813f, letter: 'Q' },
      { start: 0x8140, end: 0x847f, letter: 'R' },
      { start: 0x8480, end: 0x87bf, letter: 'S' },
      { start: 0x87c0, end: 0x8b3f, letter: 'T' },
      { start: 0x8b40, end: 0x8e7f, letter: 'W' },
      { start: 0x8e80, end: 0x91bf, letter: 'X' },
      { start: 0x91c0, end: 0x94ff, letter: 'Y' },
      { start: 0x9500, end: 0x9fff, letter: 'Z' }
    ];
    
    for (const item of pinyinFirstLetter) {
      if (charCode >= item.start && charCode <= item.end) {
        return item.letter;
      }
    }
  }
  
  // 其他字符返回#
  return '#';
}
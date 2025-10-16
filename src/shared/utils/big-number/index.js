import BigNumber from "bignumber.js";

export class AqBigNumber {
  constructor() {
    BigNumber.set({
      DECIMAL_PLACES: 20,
      ROUNDING_MODE: 4,
    });
  }

  evaluate(str) {
    return new BigNumber(str);
  }

  /**
   * 加法
   * a + b
   * @param a
   * @param b
   */
  add(a, b) {
    if (isNaN(a) || a === "") {
      a = 0;
    }
    if (isNaN(b) || b === "") {
      b = 0;
    }
    a = this.evaluate(a);
    b = this.evaluate(b);
    return a.plus(b);
  }

  /**
   * 减法
   * a - b
   * @param a
   * @param b
   */
  subtract(a, b) {
    if (isNaN(a) || a === "") {
      a = 0;
    }
    if (isNaN(b) || b === "") {
      b = 0;
    }
    a = this.evaluate(a);
    b = this.evaluate(b);
    return a.minus(b);
  }

  /**
   * 除法运算
   * a ÷ b
   * @param a
   * @param b
   * @returns
   */
  divide(a, b) {
    if (isNaN(a) || a === "") {
      a = 0;
    }
    if (isNaN(b) || b === "") {
      b = 0;
    }
    a = this.evaluate(a);
    b = this.evaluate(b);
    return a.dividedBy(b);
  }

  /**
   * 乘法
   * a * b
   * @param a
   * @param b
   * @returns
   */
  multiply(a, b) {
    if (a === "" || isNaN(a)) {
      a = 0;
    }
    if (b === "" || isNaN(b)) {
      b = 0;
    }
    a = this.evaluate(a);
    b = this.evaluate(b);
    return a.times(b);
  }

  /**
   * 格式化 bigNumber
   * @param str
   * @param decimalLength
   * @returns
   */
  transformToFixed(str, decimalLength = 2) {
    let numStr = "";
    try {
      const len = decimalLength > 0 ? +decimalLength : 0;
      if (isNaN(str)) {
        numStr = "";
      } else {
        numStr = this.evaluate(str).toFixed(len);
      }
    } catch (e) {
      console.error("transformToFixed", e);
    }
    return numStr;
  }

  /**
   * 格式化补 0
   * @param value
   * @param finalMinBit
   * @param k
   * @returns
   */
  formatZero(value, _finalMinBit, k = "") {
    value = value.toString();
    let _tmp = "";
    const arr = value.split(".");
    if (arr[1]) {
      _tmp = arr[1].replace(/(0+)$/, "");

      // 如果指定位数，则补零
      if (k && _tmp.length < Number(k)) {
        for (let i = _tmp.length; i < Number(k); i++) {
          _tmp += "0";
        }
      }
    }
    value = arr[0] + (_tmp ? `.${_tmp}` : "");
    return value;
  }
}

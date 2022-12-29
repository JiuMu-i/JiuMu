/**
 * @author JiuMu
 * @description 解析日期时间工具类
 * @function 类中所涵盖的方法有: [
 *   getCurrentDate,
 *   dateFormat,
 *   getWeek,
 *   getMonth,
 *   getDay,
 *   getHours,
 *   getMinutes,
 *   getSeconds,
 *   getSliceTime,
 *   getNextMonth,
 *   fallOnTimeInterval
 * ]
 */
export default class DateParsing {
  COMPLETION_ZERO = "0";

  /**
   * @function 获取当前时间
   * @returns 当前时间对象
   */
  getCurrentDate() {
    return new Date();
  }

  /**
   * @function 时间格式化
   * @param target 必需, 目标格式化
   * @param scheme 必需, 时间格式化依赖的解析规则
   * @description scheme: 可以使用的规则有: [
   *   yyyy-MM-dd HH:mm:ss sss
   *   yyyy-MM-dd HH:mm:ss
   *   yyyy-MM-dd HH:mm
   *   yyyy-MM-dd HH
   *   yyyy-MM-dd
   *   yyyy-MM
   *   yyyy
   * ]
   * @param separate 可选, 时间分隔符
   * @description separate: 分隔符是一个有两个元素的数组,分别指定前后两个时间格式的分隔方式.默认值为["-", ":"]
   * @return 解析完成的字符串
   */
  dateFormat(target, scheme, separate = ["-", ":", " "]) {
    switch (scheme) {
      case "yyyy-MM-dd HH:mm:ss SSS": {
        return (
          target.getFullYear() +
          separate[0] +
          this.getMonth(target) +
          separate[0] +
          this.getDay(target) +
          separate[2] +
          this.getHours(target) +
          separate[1] +
          this.getMinutes(target) +
          separate[1] +
          this.getSeconds(target) +
          separate[2] +
          target.getMilliseconds()
        );
      }
      case "yyyy-MM-dd HH:mm:ss": {
        return (
          target.getFullYear() +
          separate[0] +
          this.getMonth(target) +
          separate[0] +
          this.getDay(target) +
          separate[2] +
          this.getHours(target) +
          separate[1] +
          this.getMinutes(target) +
          separate[1] +
          this.getSeconds(target)
        );
      }
      case "yyyy-MM-dd HH:mm": {
        return (
          target.getFullYear() +
          separate[0] +
          this.getMonth(target) +
          separate[0] +
          this.getDay(target) +
          separate[2] +
          this.getHours(target) +
          separate[1] +
          this.getMinutes(target)
        );
      }
      case "yyyy-MM-dd HH": {
        return (
          target.getFullYear() +
          separate[0] +
          this.getMonth(target) +
          separate[0] +
          this.getDay(target) +
          separate[2] +
          this.getHours(target)
        );
      }
      case "yyyy-MM-dd": {
        return (
          target.getFullYear() +
          separate[0] +
          this.getMonth(target) +
          separate[0] +
          this.getDay(target)
        );
      }
      case "yyyy-MM": {
        return target.getFullYear() + separate[0] + this.getMonth(target);
      }
      case "yyyy": {
        return target.getFullYear().toString();
      }
      case "HH:mm:ss SSS": {
        return (
          this.getHours(target) +
          separate[1] +
          this.getMinutes(target) +
          separate[1] +
          this.getSeconds(target) +
          separate[2] +
          target.getMilliseconds()
        );
      }
      case "HH:mm:ss": {
        return (
          this.getHours(target) +
          separate[1] +
          this.getMinutes(target) +
          separate[1] +
          this.getSeconds(target)
        );
      }
      case "HH:mm": {
        return this.getHours(target) + separate[1] + this.getMinutes(target);
      }
      case "HH": {
        return this.getHours(target).toString();
      }
      default: {
        throw Error("时间解析规则错误");
      }
    }
  }

  /**
   * @function 获取日期周
   *
   */
  getWeek() {
    return "星期" + "日一二三四五六".charAt(new Date().getDay());
  }

  /**
   * @function 获取月份
   *
   */
  getMonth(target) {
    return target.getMonth() + 1 > 9
      ? target.getMonth() + 1
      : this.COMPLETION_ZERO + (target.getMonth() + 1);
  }

  /**
   * @function 获取天
   *
   */
  getDay(target) {
    return target.getDate() > 9 ? target.getDate() : this.COMPLETION_ZERO + target.getDate();
  }

  /**
   * @function 获取小时
   *
   */
  getHours(target) {
    return target.getHours() > 9 ? target.getHours() : this.COMPLETION_ZERO + target.getHours();
  }

  /**
   * @function 获取分钟
   *
   */
  getMinutes(target) {
    return target.getMinutes() > 9
      ? target.getMinutes()
      : this.COMPLETION_ZERO + target.getMinutes();
  }

  /**
   * @function 获取秒
   *
   */
  getSeconds(target) {
    return target.getSeconds() > 9
      ? target.getSeconds()
      : this.COMPLETION_ZERO + target.getSeconds();
  }

  /**
   * @function 获取时间字符串,截取到月份(该方法不够完善,有时间继续补充)
   */
  getSliceTime(target) {
    return target.split("-")[0] + "-" + target.split("-")[1];
  }

  /**
   * @function 获取当前指定月份的下一个月(该方法不够完善,有时间继续补充)
   */
  getNextMonth(target) {
    const year = target.split("-")[0];
    const month = target.split("-")[1];
    const nextMonth = new Date(`${year}-${month}`).getMonth() + 2;

    return nextMonth > 9 ? `${year}-${nextMonth}` : `${year}-${this.COMPLETION_ZERO}${nextMonth}`;
  }

  /**
   * @function 判断传入时间在目标区间内的索引值(不够完善)
   */
  fallOnTimeInterval(target) {
    if (new Date(target).getTime() >= new Date("2021-06-30").getTime()) {
      return 1;
    } else {
      return 0;
    }
  }
}

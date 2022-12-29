import { themes } from '../assets/data/themes.js'
/**
 * @author JiuMu
 * @description 加载主题样式工具类
 * @function 类中所涵盖的方法有: []
 */
export default class LoadThemes {
  /**
   * @function 根据key索引对应主题参数
   * @returns 主题对象
   */
  getThemes(key = '01') {
    // TODO 检查是否登录
    return themes[key]
  }
}
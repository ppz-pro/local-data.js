import { isFunction } from '@ppzp/utils/type'
import { BearLocalStorage } from './base'

/** local-data
 * + json
 * + checker
 */
export
class LocalData extends BearLocalStorage {
  #checker
  /**
   * @param {string} name localStorage key
   * @param {function} checker 检查数据是否合法的函数（如果不合法，应抛出异常，返回值没有任何作用）
   */
  constructor(name, checker) {
    super(name)
    if(!isFunction(checker))
      throw Error('checker must be a function')
    this.#checker = checker
  }

  get() {
    let data = super.get()
    if(data === null)
      return null
    data = JSON.parse(data)
    this.#checker(data)
    return data
  }

  setJSON(data) {
    super.set(JSON.stringify(data))
  }

  set(data) {
    this.#checker(data)
    this.setJSON(data)
  }
}

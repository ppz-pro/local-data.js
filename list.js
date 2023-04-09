import { isFunction } from '@ppzp/utils/type'
import { LocalData } from './basic'

export
class ListLocalData extends LocalData {
  #itemChecker
  /**
   * @param {string} name localStorage key
   * @param {function} itemChecker 检查 list 内元素是否合法的函数（如果不合法，应抛出异常，返回值没有任何作用）
   */
  constructor(name, itemChecker) {
    if(!isFunction(itemChecker))
      throw Error('itemChecker must be a function')
    super(name, list => list.forEach(itemChecker))
    this.#itemChecker = itemChecker
  }

  get(where) {
    const list = super.get() ?? []
    return where ? list.filter(where) : list
  }

  add(record) {
    this.#itemChecker(record)
    const list = this.get()
    list.push(record)
    this.setJSON(list)
  }
  addRecords(...records) {
    for(const record of records)
      this.#itemChecker(record)
    const list = this.get()
    list.push(...records)
    this.setJSON(list)
  }

  getOne(where) {
    return this.get(where)[0]
  }

  updateRecords(where, updater) {
    const list = this.get()
    for(const record of list) {
      if(where(record)) {
        updater(record)
        this.#itemChecker(record)
      }
    }
    this.setJSON(list)
  }
  
  removeRecords(where) {
    let list = this.get()
    const deleted = []
    list = list.filter(record => {
      if(where(record)) {
        deleted.push(record)
        return false
      }
      return true
    })
    this.setJSON(list)
    return deleted
  }
}
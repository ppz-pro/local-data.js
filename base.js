import { nonEmptyString } from '@ppzp/utils/type'

const nameSet = new Set()

/** 仅封装 localStorage 的基本操作，它还不算一个 LocalData 类 */
export
class BearLocalStorage {
  #name
  constructor(name) {
    if(!nonEmptyString(name))
      throw Error('name must be a non-empty string')
    if(nameSet.has(name))
      throw Error('name must be unique')
    nameSet.add(name)
    this.#name = name
  }
  get() {
    return localStorage.getItem(this.#name)
  }
  set(value) {
    localStorage.setItem(this.#name, value)
  }
  remove() {
    localStorage.removeItem(this.#name)
  }
}

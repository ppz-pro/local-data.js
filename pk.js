import { nonEmptyString } from '@ppzp/utils/type'
import { ListLocalData } from './list'

export
class ListLocalDataPK extends ListLocalData {
  #pk
  constructor(name, primaryKey, itemChecker) {
    if(!nonEmptyString(primaryKey))
      throw Error('primaryKey must be a non-empty string')
    
    const iChecker = function(item) {
      if(!nonEmptyString(item?.[primaryKey]))
        throw Error(`primary key [value: ${item[primaryKey]}] must be a non-empty string`)
      itemChecker(item)
    }
    super(name, iChecker)
    this.#pk = primaryKey
  }

  getByPK(pk) {
    return this.getOne(record => record[this.#pk] === pk)
  }
  updateByPK(pk, updater) {
    this.updateRecords(record => record[this.#pk] === pk, updater)
  }
  removeByPK(pk) {
    return this.removeRecords(record => record[this.#pk] === pk)[0]
  }

  setJSON(list) {
    const pkSet = new Set()
    for(const record of list) {
      if(pkSet.has(record[this.#pk]))
        throw Error(`duplicate primary key: ${record[this.#pk]}`)
      pkSet.add(record[this.#pk])
    }
    
    super.setJSON(list)
  }
}

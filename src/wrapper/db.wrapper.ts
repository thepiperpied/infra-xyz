const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

export default class DBSetup {
  static adapter = new FileSync('INFRA_XYZ_DB.json')

  static db = lowdb(DBSetup.adapter)

  static post(on: string, data: Record<string, any>, findBy: Record<string, any>) {
    if (this.db.get(on).find(findBy).value())
      this.db.get(on)
      .find(findBy)
      .assign(data)
      .write()
    else
      this.db.get(on)
      .push(data)
      .write()
  }
}

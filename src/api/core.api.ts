const os = require('os')

export default class coreAPI {
  getPlatform() {
    return os.platform()
  }
}

const os = require('os')

export default class CoreAPI {
  getPlatform() {
    return os.platform()
  }
}

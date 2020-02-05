const os = require('os')
const execa = require('execa')

export default class CoreAPI {
  getPlatform(): string {
    return os.platform()
  }

  isChocoExist() {
    try {
      execa.commandSync('choco --version')
      return true
    } catch (error) {
      return false
    }
  }

  isHyperVEnabled() {
    try {
      const output = execa.commandSync('systeminfo.exe')
      if (output.stdout.includes('Hyper-V Requirements:')) {
        return true
      }

      return false
    } catch (error) {
      return false
    }
  }
}

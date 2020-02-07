const os = require('os')
const execa = require('execa')
const {blue} = require('kleur')

export default class CoreAPI {
  ID = 0

  NAME = 'CORE'

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

  basicCheck() {
    let isFailed = false
    let isExist = true
    const message = 'Following prerequists failed:'

    switch (this.getPlatform()) {
    case 'win32':
      if (!this.isChocoExist()) {
        isFailed = true
        isExist = false
        message.concat(`\n 1. Chocolaty package manager doesn't exists. Please install ${blue('chocolaty package manager')} for windows first. (https://chocolatey.org/packages/chocolatey)`)
      }

      if (!this.isHyperVEnabled()) {
        isFailed = true
        isExist = false
        message.concat(`\n 2. Please enable ${blue('Hyper-V')} for windows first.`)
      }

      break
    case 'linux':
      isExist = false
      isFailed = true
      message.concat('This host is not supported yet!')
      break
    case 'freebsd':
      isExist = false
      isFailed = true
      message.concat('This host is not supported yet!')
      break
    case 'openbsd':
      isExist = false
      isFailed = true
      message.concat('This host is not supported yet!')
      break
    case 'sunos':
      isExist = false
      isFailed = true
      message.concat('This host is not supported yet!')
      break
    case 'darwin':
      isExist = false
      isFailed = true
      message.concat('This host is not supported yet!')
      break
    default:
      isExist = false
      isFailed = true
      message.concat('This host is not supported yet!')
    }

    return {
      id: this.ID,
      name: this.NAME,
      isExist: isExist,
      isFailed: isFailed,
      message: message,
    }
  }

  basicCheckTask() {
    return {
      text: 'Kubectl',
      task: async (ctx: any) => {
        ctx.text('Checking basic prerequisites...')
        await new Promise(resolve => setTimeout(resolve, 2000))
        const basicCheck = this.basicCheck()
        if (basicCheck.isFailed)
          throw new Error(basicCheck.message)
        ctx.text('Basic check complete')
      },
    }
  }
}

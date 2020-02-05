const chalk = require('chalk')
import CoreAPI from './core.api'
const execa = require('execa')

export default class KubectlAPI {
  ID = 1

  NAME = 'kubectl'

  CORE = new CoreAPI()

  isKubectlExist(): any {
    try {
      const output = execa.commandSync('kubectl version --client --output=json')

      const version = JSON.parse(output.stdout).clientVersion.gitVersion
      return {
        id: 1,
        name: this.NAME,
        version: version,
        isExist: true,
        isFailed: false,
        message: `${chalk.blue('kubectl')} is already installed on this machine`,
      }
    } catch (error) {
      return  {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('kubectl')} is not installed`,
      }
    }
  }

  async installKubectl() {
    let output
    let version
    switch (this.CORE.getPlatform()) {
    case 'win32':
      if (!this.CORE.isChocoExist()) {
        return {
          id: 1,
          name: this.NAME,
          version: '',
          isExist: false,
          isFailed: true,
          message: 'Please install chocolaty package manager for windows first. (https://chocolatey.org/packages/chocolatey)',
        }
      }
      if (!this.CORE.isHyperVEnabled()) {
        return {
          id: 1,
          name: this.NAME,
          version: '',
          isExist: false,
          isFailed: true,
          message: 'Please enable Hyper-V for windows first.',
        }
      }
      try {
        output = await execa.commandSync('choco install kubernetes-cli')
        output = await this.isKubectlExist()

        version = await JSON.parse(output.stdout).clientVersion.gitVersion

        return {
          id: 1,
          name: this.NAME,
          version: version,
          isExist: true,
          isFailed: false,
          message: `${chalk.blue('kubectl')} is installed on this machine`,
        }
      } catch (error) {
        return {
          id: 1,
          name: this.NAME,
          version: '',
          isExist: false,
          isFailed: true,
          message: `${chalk.blue('kubectl')} installation failed`,
        }
      }
    case 'linux':
      return {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('kubectl')} installation failed`,
      }
    case 'freebsd':
      return {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('kubectl')} installation failed`,
      }
    case 'openbsd':
      return {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('kubectl')} installation failed`,
      }
    case 'sunos':
      return {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('kubectl')} installation failed`,
      }
    case 'darwin':
      return {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('kubectl')} installation failed`,
      }
    default:
      return {
        id: 1,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${chalk.blue('host system')} not identified`,
      }
    }
  }

  kubectlTask() {
    return {
      text: 'Kubectl',
      task: async (ctx: any) => {
        ctx.text(`Checking if ${chalk.blue('kubectl')} is installed...`)
        await new Promise(resolve => setTimeout(resolve, 2000))
        const isKubectlExist = await this.isKubectlExist()
        if (isKubectlExist.isFailed) {
          ctx.text(isKubectlExist.message)
          const kubectlInstall = await this.installKubectl()
          if (kubectlInstall.isFailed)
            throw new Error(kubectlInstall.message)

          ctx.text(kubectlInstall.message)
        } else {
          ctx.isKubectlExist = true
          ctx.text(isKubectlExist.message)
        }
      },
    }
  }
}

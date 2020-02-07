const {blue} = require('kleur')
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
        id: this.ID,
        name: this.NAME,
        version: version,
        isExist: true,
        isFailed: false,
        message: `${blue('kubectl')} is already installed on this machine`,
      }
    } catch (error) {
      return  {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('kubectl')} is not installed`,
      }
    }
  }

  async installKubectl() {
    let output
    let version
    switch (this.CORE.getPlatform()) {
    case 'win32':
      try {
        output = await execa.commandSync('choco install kubernetes-cli')
        output = await this.isKubectlExist()

        version = await JSON.parse(output.stdout).clientVersion.gitVersion

        return {
          id: this.ID,
          name: this.NAME,
          version: version,
          isExist: true,
          isFailed: false,
          message: `${blue('kubectl')} is installed on this machine`,
        }
      } catch (error) {
        return {
          id: this.ID,
          name: this.NAME,
          version: '',
          isExist: false,
          isFailed: true,
          message: `${blue('kubectl')} installation failed`,
        }
      }
    case 'linux':
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('kubectl')} installation failed`,
      }
    case 'freebsd':
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('kubectl')} installation failed`,
      }
    case 'openbsd':
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('kubectl')} installation failed`,
      }
    case 'sunos':
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('kubectl')} installation failed`,
      }
    case 'darwin':
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('kubectl')} installation failed`,
      }
    default:
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: false,
        isFailed: true,
        message: `${blue('host system')} not identified`,
      }
    }
  }

  kubectlTask() {
    return {
      text: 'Kubectl',
      task: async (ctx: any) => {
        ctx.text(`Checking if ${blue('kubectl')} is installed...`)
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

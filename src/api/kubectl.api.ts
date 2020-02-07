const {blue} = require('kleur')
import CoreAPI from './core.api'
const execa = require('execa')

export default class KubectlAPI {
  ID = 1

  NAME = 'kubectl'

  CORE = new CoreAPI()

  isKubectlExist(): any {
    let isFailed = true
    let isExist = false
    try {
      const output = execa.commandSync('kubectl version --client --output=json')
      JSON.parse(output.stdout).clientVersion.gitVersion
      isFailed = false
      isExist = true
    } catch (error) {
    }

    if (isFailed)
      return  {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: isExist,
        isFailed: isFailed,
        message: `${blue('kubectl')} is not installed`,
      }
    return {
      id: this.ID,
      name: this.NAME,
      isExist: isExist,
      isFailed: isFailed,
      message: `${blue('kubectl')} is already installed on this machine`,
    }
  }

  async installKubectl() {
    let output
    let isExist = false
    let isFailed = true
    switch (this.CORE.getPlatform()) {
    case 'win32':
      try {
        await execa.commandSync('choco install kubernetes-cli')
        output = await this.isKubectlExist()
        isExist = output.isExist
        isFailed = output.isFailed

        if (isExist && !isFailed) {
          isExist = true
          isFailed = false
        }
      } catch (error) {

      }
      break
    case 'linux':
      break
    case 'freebsd':
      break
    case 'openbsd':
      break
    case 'sunos':
      break
    case 'darwin':
      break
    default:
      break
    }

    if (isFailed)
      return {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: isExist,
        isFailed: isFailed,
        message: `${blue('kubectl')} installation failed.`,
      }
    return {
      id: this.ID,
      name: this.NAME,
      version: '',
      isExist: isExist,
      isFailed: isFailed,
      message: `${blue('kubectl')} installation successed.`,
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

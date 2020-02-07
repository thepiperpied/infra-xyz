const {blue} = require('kleur')
import CoreAPI from './core.api'
const execa = require('execa')

export default class MinikubeAPI {
  ID = 1

  NAME = 'kubectl'

  CORE = new CoreAPI()

  isMinikubeExist(): any {
    let isFailed = true
    let isExist = false
    try {
      const output = execa.commandSync('minikube version')
      if (output.stdout.includes('version')) {
        isFailed = false
        isExist = true
      }
    } catch (error) {
    }

    if (isFailed)
      return  {
        id: this.ID,
        name: this.NAME,
        version: '',
        isExist: isExist,
        isFailed: isFailed,
        message: `${blue('minikube')} is not installed`,
      }
    return {
      id: this.ID,
      name: this.NAME,
      isExist: isExist,
      isFailed: isFailed,
      message: `${blue('minikube')} is already installed on this machine`,
    }
  }

  async installMinikube() {
    let output
    let isExist = false
    let isFailed = true
    switch (this.CORE.getPlatform()) {
    case 'win32':
      try {
        await execa.commandSync('choco install minikube')
        output = await this.isMinikubeExist()
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
        message: `${blue('minikube')} installation failed.`,
      }
    return {
      id: this.ID,
      name: this.NAME,
      version: '',
      isExist: isExist,
      isFailed: isFailed,
      message: `${blue('minikube')} installation successed.`,
    }
  }

  minikubeTask() {
    return {
      text: 'Kubectl',
      task: async (ctx: any) => {
        ctx.text(`Checking if ${blue('minikube')} is installed...`)
        await new Promise(resolve => setTimeout(resolve, 2000))
        const isKubectlExist = await this.isMinikubeExist()
        if (isKubectlExist.isFailed) {
          ctx.text(isKubectlExist.message)
          const minikubeInstall = await this.installMinikube()
          if (minikubeInstall.isFailed)
            throw new Error(minikubeInstall.message)

          ctx.text(minikubeInstall.message)
        } else {
          ctx.isMinikubeExist = true
          ctx.text(isKubectlExist.message)
        }
      },
    }
  }
}

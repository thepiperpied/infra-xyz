import KubectlAPI from '../api/kubectl.api'
import {Observable} from 'rxjs'
const chalk = require('chalk')
const Listr = require('listr')

const kubectlAPI = new KubectlAPI()

const INIT_TASK = new Listr([{
  title: 'Kubctl',
  task: async (ctx: any, task: any) => {
    return new Observable((observer: any) => {
      observer.next('Checking if kubectl installed')
      ctx.isKubeExist = kubectlAPI.isKubectlExist()
      if (ctx.isKubeExist) {
        task.title = `${chalk.blue('kubectl')} is already installed`
        observer.complete()
      } else {
        observer.complete()
        task.title = `${chalk.blue('kubectl')} is not installed`
      }
    })
  },
}], {
  collapse: false,
})

export default class InitTask {
  run() {
    INIT_TASK.run().catch((error: any) => {
      throw new Error(error)
    })
  }
}

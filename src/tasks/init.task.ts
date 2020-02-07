const taskz = require('taskz')
import KubectlAPI from '../api/kubectl.api'
import CoreAPI from '../api/core.api'

export default class InitTask {
  KUBECTL_API = new KubectlAPI()

  CORE = new CoreAPI()

  INIT_TASK: Array<any> = [this.CORE.basicCheckTask(), this.KUBECTL_API.kubectlTask()]

  run() {
    taskz(this.INIT_TASK).run()
  }
}

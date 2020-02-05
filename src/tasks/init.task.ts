const taskz = require('taskz')
import KubectlAPI from '../api/kubectl.api'

export default class InitTask {
  KUBECTL_API = new KubectlAPI()

  INIT_TASK: Array<any> = [this.KUBECTL_API.kubectlTask()]

  run() {
    taskz(this.INIT_TASK).run()
  }
}

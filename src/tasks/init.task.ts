const taskz = require('taskz')
import CoreAPI from '../api/core.api'
import KubectlAPI from '../api/kubectl.api'
import MinikubeAPI from '../api/minikbue.api'

export default class InitTask {
  CORE = new CoreAPI()

  KUBECTL_API = new KubectlAPI()

  MINIKUBE_API = new MinikubeAPI()

  INIT_TASK: Array<any> = [this.CORE.basicCheckTask(), this.KUBECTL_API.kubectlTask(), this.MINIKUBE_API.minikubeTask()]

  run() {
    taskz(this.INIT_TASK).run()
  }
}

const execa = require('execa')

export default class MinikubeAPI {
  static async checkMinikube() {
    try {
      let stdout = await execa('minikube', ['version'])
    } catch (error) {
      console.log(error)
    }
  }
}

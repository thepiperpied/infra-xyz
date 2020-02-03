import {Command, flags} from '@oclif/command'
import KubectlAPI from '../api/kubectl.api'
import InitTask from '../tasks/init.task'

export default class Init extends Command {
  static description = 'init - command prepares the host system by installing all dependencies.'

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = []

  async run() {
    const {flags} = this.parse(Init)
    const initTask = new InitTask();
    initTask.run()
  }
}

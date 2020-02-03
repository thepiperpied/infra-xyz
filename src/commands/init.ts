import {Command, flags} from '@oclif/command'
import InitTask from '../tasks/init.task'

export default class Init extends Command {
  static description = 'init - command prepares the host system by installing all dependencies.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const initTask = new InitTask()
    initTask.run()
  }
}

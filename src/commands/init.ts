import {Command, flags} from '@oclif/command'

export default class Init extends Command {
  static description = 'init - command prepares the host system by installing all dependencies.'

  static flags = {
    host: flags.string({char: 'o', description: 'Operating system - windows, linux or macos', required: true}),
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const {flags} = this.parse(Init)
    this.log(`hello ${flags.host} from C:\\Users\\I516427\\Documents\\Personal Projects\\infra-xyz\\src\\commands\\init.ts`)
  }
}

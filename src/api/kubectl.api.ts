import DBSetup from '../wrapper/db.wrapper';
import coreAPI from './core.api';

const execa = require('execa')

export default class KubectlAPI {

  ID = 1
  NAME = 'kubectl'
  CORE = new coreAPI()

  isKubectlExist(): Boolean {
    try {
      const output = execa.commandSync('kubectl version --client --output=json');
      const version = JSON.parse(output.stdout).clientVersion.gitVersion
      DBSetup.post('tools', {
        id: 1,
        name: this.NAME,
        version: version,
        status: 'Installed',
        message: 'Kubectl is installed'
      }, {
        id: this.ID
      })
      return true
    } catch(error) {
      DBSetup.post('tools', {
        id: 1,
        name: this.NAME,
        version: '--',
        status: 'Not Installed',
        message: 'Kubectl is not installed'
      }, {
        id: this.ID
      })
    }

    return false
  }

  installKubectl() {
    switch (this.CORE.getPlatform()) {
      case 'win32':
        console.log(this.CORE.getPlatform())
        break;
      case 'linux':
        break;
      case 'freebsd':
        break;
      case 'openbsd':
        break;
      case 'sunos':
        break;
      case 'darwin':
        break;
      default:
        throw new Error('Could not detect running host system')
    }
  }
}

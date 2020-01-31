infra-xyz
=========

infra-xyz is a tool for bootstraping the infra required to run the piper-pied in all deploys be it production, staging, testing, or development.

![Node.js Package](https://github.com/thepiperpied/infra-xyz/workflows/Node.js%20Package/badge.svg?event=release)
[![Version](https://img.shields.io/npm/v/@thepiedpiper/infra-xyz.svg)](https://www.npmjs.com/package/@thepiedpiper/infra-xyz)
[![Dependencies](https://img.shields.io/david/thepiperpied/infra-xyz)](https://www.npmjs.com/package/@thepiedpiper/infra-xyz)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/thepiperpied/infra-xyz/blob/master/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @thepiedpiper/infra-xyz
$ xyz COMMAND
running command...
$ xyz (-v|--version|version)
@thepiedpiper/infra-xyz/1.0.1 win32-x64 node-v13.1.0
$ xyz --help [COMMAND]
USAGE
  $ xyz COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`xyz help [COMMAND]`](#xyz-help-command)
* [`xyz init`](#xyz-init)

## `xyz help [COMMAND]`

display help for xyz

```
USAGE
  $ xyz help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src\commands\help.ts)_

## `xyz init`

init - command prepares the host system by installing all dependencies.

```
USAGE
  $ xyz init

OPTIONS
  -h, --help       show CLI help
  -o, --host=host  (required) Operating system - windows, linux or macos
```

_See code: [src\commands\init.ts](https://github.com/thepiperpied/infra-xyz/blob/v1.0.1/src\commands\init.ts)_
<!-- commandsstop -->

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/thepiperpied/octo/issues).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2019 [shreyansh-zazz](https://github.com/thepiperpied).

This project is [GLPv3.0](https://github.com/thepiperpied/octo/blob/master/LICENSE) licensed.
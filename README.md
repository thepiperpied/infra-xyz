infra-xyz
=========

infra-xyz is a tool for bootstraping the infra required to run the piper-pied in all deploys be it production, staging, testing, or development.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/infra-xyz.svg)](https://npmjs.org/package/infra-xyz)
[![Downloads/week](https://img.shields.io/npm/dw/infra-xyz.svg)](https://npmjs.org/package/infra-xyz)
[![License](https://img.shields.io/npm/l/infra-xyz.svg)](https://github.com/[object Object]/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @thepiperpied/infra-xyz
$ xyz COMMAND
running command...
$ xyz (-v|--version|version)
@thepiperpied/infra-xyz/1.0.0 win32-x64 node-v13.1.0
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

_See code: [src\commands\init.ts](https://github.com/thepiperpied/infra-xyz/blob/v1.0.0/src\commands\init.ts)_
<!-- commandsstop -->

import {expect, test} from '@oclif/test'

describe('init', () => {
  test
  .stdout()
  .command(['init'])
  .it(ctx => {
    expect(ctx.stdout).to.include('kubectl')
  })
})

import {expect, jest, test} from '@jest/globals'
import {login, logout} from '../src/login'
import * as path from 'path'
import * as exec from '@actions/exec'

process.env['RUNNER_TEMP'] = path.join(__dirname, 'runner')

test('loginStandard calls exec', async () => {
  // @ts-ignore
  const execSpy = jest
    .spyOn(exec, 'getExecOutput')
    .mockImplementation(async () => {
      // @ts-ignore
      return {
        exitCode: expect.any(Number),
        stdout: expect.any(Function),
        stderr: expect.any(Function)
      } as exec.ExecOutput
    })

  const email = 'hello'
  const password = 'world'

  await login(email, password)

  expect(execSpy).toHaveBeenCalledWith(
    `localstack`,
    ['login', '--password-stdin', '--username', email],
    {
      input: Buffer.from(password),
      silent: true,
      ignoreReturnCode: true
    }
  )
})

test('logout calls exec', async () => {
  // @ts-ignore
  const execSpy = jest
    .spyOn(exec, 'getExecOutput')
    .mockImplementation(async () => {
      // @ts-ignore
      return {
        exitCode: expect.any(Number),
        stdout: expect.any(Function),
        stderr: expect.any(Function)
      } as exec.ExecOutput
    })

  await logout()

  expect(execSpy).toHaveBeenCalledWith(`localstack`, ['logout'], {
    ignoreReturnCode: true
  })
})

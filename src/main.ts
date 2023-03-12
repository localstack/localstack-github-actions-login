import * as core from '@actions/core'
import {login, logout} from './login'

async function setup(): Promise<void> {
  const email = core.getInput('email')
  const password = core.getInput('password')

  core.saveState('email', email)
  await login(email, password)
}

async function teardown(): Promise<void> {
  await logout()
}

async function run(): Promise<void> {
  try {
    if (core.getState('isPost')) {
      await teardown()
    } else {
      core.saveState('isPost', 'true')
      await setup()
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()

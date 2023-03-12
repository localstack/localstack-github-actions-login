import * as core from '@actions/core'
import * as exec from '@actions/exec'

export async function login(email: string, password: string): Promise<void> {
  if (!email || !password) {
    throw new Error('Email and password required')
  }

  const args = ['login', '--password-stdin', '--username', email]

  core.info(`Logging in`)

  const res = await exec.getExecOutput('localstack', args, {
    ignoreReturnCode: true,
    silent: true,
    input: Buffer.from(password)
  })

  if (res.stderr.length > 0 && res.exitCode !== 0) {
    throw new Error(res.stderr.trim())
  }

  core.info(`Login Succeeded!`)
}

export async function logout(): Promise<void> {
  const res = await exec.getExecOutput('localstack', ['logout'], {
    ignoreReturnCode: true
  })

  if (res.stderr.length > 0 && res.exitCode !== 0) {
    core.warning(res.stderr.trim())
  }
}

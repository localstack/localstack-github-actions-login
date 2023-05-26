# LocalStack GitHub Actions Login

[![Test LocalStack GitHub Actions Login](https://github.com/localstack/localstack-github-actions-login/actions/workflows/test.yml/badge.svg)](https://github.com/localstack/localstack-github-actions-login/actions/workflows/test.yml)
[![tag badge](https://img.shields.io/github/v/tag/localstack/localstack-github-actions-login)](https://github.com/localstack/localstack-github-actions-login/tags)
[![license badge](https://img.shields.io/github/license/localstack/localstack-github-actions-login)](./LICENSE)
[![size badge](https://img.shields.io/github/size/localstack/localstack-github-actions-login/dist/index.js)](./dist)

A GitHub Action to log-in into your [LocalStack account](https://app.localstack.cloud) on your GitHub Actions runner workflow by specifying your Email Address and Password. See the [LocalStack Documentation](https://docs.localstack.cloud/references/localstack-cli-manual/#login) for an explanation of a log in using `localstack` CLI, which this action wraps.

## Usage

To get started, you can use this minimal example:

```yaml
- name: 🤔 Login to LocalStack
  uses: LocalStack/localstack-github-actions-login@v0.1.0
  with:
    email: ${{ secrets.LOCALSTACK_USERNAME }}
    password: ${{ secrets.LOCALSTACK_PASSWORD }}
```

### Inputs

| Input      | Description                                                          | Default |
| ---------- | -------------------------------------------------------------------- | ------- |
| `email`    | Email address with which you have configured your LocalStack account | None    |
| `password` | Password with which you authenticate your LocalStack account         | None    |

### Example Workflow

This example workflow will pull the latest version of [LocalStack Pro](https://hub.docker.com/r/localstack/localstack-pro) image with an API key configured in the `LOCALSTACK_API_KEY` secret. It will then pull a log-in using the `LOCALSTACK_USERNAME` and `LOCALSTACK_PASSWORD` secrets. Finally, it will pull a [Cloud Pod](https://docs.localstack.cloud/user-guide/tools/cloud-pods/) available in your [LocalStack account](https://app.localstack.cloud).

```yaml
name: 'Test your AWS infrastructure with LocalStack'

on: [ push, pull_request ]

jobs:
  test:
    name: 🌐 Pull a Cloud Pod
    runs-on: ubuntu-latest
    steps:
      - name: ⚡️ Checkout the repository
        uses: actions/checkout@v3

      - name: ☁️ Start LocalStack
        run: |
          pip install pyopenssl -U
          docker pull localstack/localstack-pro:1.4
          pip install localstack
          DNS_ADDRESS=0 localstack start -d
          localstack wait -t 30
          pip install awscli-local[ver1]
        env:
          LOCALSTACK_API_KEY: ${{ secrets.LOCALSTACK_API_KEY }}

      - name: 🤔 Login to LocalStack
        uses: LocalStack/localstack-github-actions-login@v0.1.0
        with:
          email: ${{ secrets.LOCALSTACK_USERNAME }}
          password: ${{ secrets.LOCALSTACK_PASSWORD }}

      - name: 🤩 Pull a Cloud Pod
        run: |
          localstack pod load <pod-name> # Add the name of the Cloud Pod you want to pull
          localstack pod list

     - name: Run our tests
       run: |
         awslocal ... # Do your testing here
```

## License

[Apache License 2.0](./LICENSE)

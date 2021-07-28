# Ledger 1inch Plugin

This is a plugin for the Ethereum application which helps parsing and displaying relevant information when signing a 1inch transaction.

## Prerequisite

Be sure to have your environment correctly set up (see [Getting Started](https://ledger.readthedocs.io/en/latest/userspace/getting_started.html)) and [ledgerblue](https://pypi.org/project/ledgerblue/) and installed.

If you want to benefit from [vscode](https://code.visualstudio.com/) integration, it's recommended to move the toolchain in `/opt` and set `BOLOS_ENV` environment variable as follows

```
BOLOS_ENV=/opt/bolos-devenv
```

and do the same with `BOLOS_SDK` environment variable

```
BOLOS_SDK=/opt/nanos-secure-sdk
```

## Documentation

Need more information about the interface, the architecture, or general stuff about ethereum plugins? You can find more about them in the [ethereum-app documentation](https://github.com/LedgerHQ/app-ethereum/blob/master/doc/ethapp_plugins.asc).

## Compilation

```
make SPECULOS=1  # compile optionally with PRINTF
make load     # load the app on the Nano using ledgerblue
```

This plugin uses the [ethereum-plugin-sdk](https://github.com/LedgerHQ/ethereum-plugin-sdk/). If there's an error while building, try running `git pull --recurse-submodules` in order to update the sdk. If this fixes your bug, please file an issue or create a PR to add the new sdk version :)

If you need to update the sdk, you will need to do it locally and create a PR on the [ethereum-plugin-sdk repo](https://github.com/LedgerHQ/ethereum-plugin-sdk/).

## Tests & Continuous Integration

The flow processed in [GitHub Actions](https://github.com/features/actions) is the following:

- Code formatting with [clang-format](http://clang.llvm.org/docs/ClangFormat.html)
- Compilation of the application for Ledger Nano S in [ledger-app-builder](https://github.com/LedgerHQ/ledger-app-builder)

## Local development

How to Make:
1) Clone app-builder docker image: https://github.com/LedgerHQ/ledger-app-builder
2) Go to repo dir that you just clone `cd ledger-app-builder`
3) Build it, with specific image name `docker build . -t ledger-app-builder`
4) Launch ledger-app-builder container
```
docker run --rm -it -v ~/path-to/app-plugin-1inch:/app ledger-app-builder
```
5) Call `make SPECULOS=1` with in container

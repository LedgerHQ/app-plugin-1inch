# Badges
[![Code style check](https://github.com/blooo-io/app-plugin-1inch/actions/workflows/lint-workflow.yml/badge.svg)](https://github.com/blooo-io/app-plugin-1inch/actions/workflows/lint-workflow.yml)
[![Compilation & tests](https://github.com/blooo-io/app-plugin-1inch/actions/workflows/ci-workflow.yml/badge.svg)](https://github.com/blooo-io/app-plugin-1inch/actions/workflows/ci-workflow.yml)

# Ledger 1inch Plugin

This is a plugin for the Ethereum application which helps parsing and displaying relevant information when signing a 1inch transaction.

## Prerequisite

Clone the plugin to a new folder.

```shell
git clone https://github.com/blooo-io/app-plugin-1inch.git
```

Then in the same folder clone two more repositories, which is the plugin-tools and app-ethereum.

```shell
git clone https://github.com/LedgerHQ/plugin-tools.git                          #plugin-tools
git clone --recurse-submodules https://github.com/LedgerHQ/app-ethereum.git     #app-ethereum
```
## Documentation

Need more information about the interface, the architecture, or general stuff about ethereum plugins? You can find more about them in the [ethereum-app documentation](https://github.com/LedgerHQ/app-ethereum/blob/master/doc/ethapp_plugins.asc).

## Smart Contracts

Smart contracts covered by this plugin are:

| Network | Version | Smart Contract |
| ---       | --- | --- |
| Ethereum  | V3  | `0x11111112542D85B3EF69AE05771c2dCCff4fAa26`|
| Ethereum  | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Ethereum  | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| Polygon   | V3  | `0x11111112542D85B3EF69AE05771c2dCCff4fAa26`|
| Polygon   | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Polygon   | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|


## Build

Go to the plugin-tools folder and run the "./start" script.
```shell
cd plugin-tools  # go to plugin folder
./start.sh       # run the script start.sh
```
The script will build a docker image and attach a console.
When the docker image is running go to the "app-plugin-1inch" folder and build the ".elf" files.
```shell
cd app-plugin-1inch/tests       # go to the tests folder in app-plugin-1inch
./build_local_test_elfs.sh      # run the script build_local_test_elfs.sh
```

## Tests

To test the plugin go to the tests folder from the "app-plugin-1inch" and run the script "test"
```shell
cd app-plugin-1inch/tests       # go to the tests folder in app-plugin-1inch
yarn test                       # run the script test
```
## Continuous Integration


The flow processed in [GitHub Actions](https://github.com/features/actions) is the following:

- Code formatting with [clang-format](http://clang.llvm.org/docs/ClangFormat.html)
- Compilation of the application for Ledger Nano S in [ledger-app-builder](https://github.com/LedgerHQ/ledger-app-builder)

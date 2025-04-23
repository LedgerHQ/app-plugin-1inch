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
| Arbitrum  | V3  | `0x11111112542D85B3EF69AE05771c2dCCff4fAa26`|
| Arbitrum  | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Arbitrum  | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| Base      | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| Ethereum  | V3  | `0x11111112542D85B3EF69AE05771c2dCCff4fAa26`|
| Ethereum  | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Ethereum  | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| Fantom    | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Fantom    | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| Optimism  | V3  | `0x11111112542D85B3EF69AE05771c2dCCff4fAa26`|
| Optimism  | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Optimism  | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| Polygon   | V3  | `0x11111112542D85B3EF69AE05771c2dCCff4fAa26`|
| Polygon   | V4  | `0x1111111254fb6c44bAC0beD2854e76F90643097d`|
| Polygon   | V5  | `0x1111111254eeb25477b68fb85ed929f73a960582`|
| ZkSync    | V5  | `0x6e2b76966cbd9cf4cc2fa0d76d24d5241e0abc2f`|


## Functions implemented:


|    Function   | Selector  | Displayed Parameters |
| ---           | ---       | --- |
|Swap | 0x7c025200| <table>  <tbody>  <tr> <td><code>address desc.srcToken</code></td></tr> <tr><td><code>address desc.dstToken</code></td></tr> <tr><td><code>address desc.dstReceiver</code></td></tr> <tr><td><code>uint256 desc.amount</code></td></tr> <tr><td><code>uint256 desc.minReturnAmount</code></td></tr> <tr><td><code>uint256 desc.flags</code></td></tr> </tbody> </table> |
|Swap (v5)| 0x12aa3caf| <table>  <tbody>  <tr> <td><code>address desc.srcToken</code></td></tr> <tr><td><code>address desc.dstToken</code></td></tr> <tr><td><code>address desc.dstReceiver</code></td></tr> <tr><td><code>uint256 desc.amount</code></td></tr> <tr><td><code>uint256 desc.minReturnAmount</code></td></tr> <tr><td><code>uint256 desc.flags</code></td></tr> </tbody> </table> |
|Unoswap  | 0x2e95b6c8| <table>  <tbody>  <tr><td><code>address srcToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|Unoswap (v5) | 0x0502b1c5| <table>  <tbody>  <tr><td><code>address srcToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|unoswapWithPermit  | 0xa1251d75| <table>  <tbody>  <tr><td><code>address srcToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|unoswapToWithPermit (v5) | 0x3c15fd91| <table>  <tbody> <tr><td><code>address recipient</code></td></tr> <tr><td><code>address srcToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|uniswapV3Swap  | 0xe449022e| <table>  <tbody> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|uniswapV3SwapTo  | 0xbc80f1a8| <table>  <tbody> <tr><td><code>address recipient</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|uniswapV3SwapToWithPermit  | 0x2521b930| <table>  <tbody> <tr><td><code>address recipient</code></td></tr> <tr><td><code>address srcToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table>|
|clipperSwap  | 0xb0431182| <table>  <tbody>  <tr> <td><code>address srcToken</code></td></tr> <tr><td><code>address dstToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table> |
|clipperSwap (v5)  | 0x84bd6d29| <table>  <tbody>  <tr> <td><code>address srcToken</code></td></tr> <tr><td><code>address dstToken</code></td></tr> <tr><td><code>uint256 inputAmount</code></td></tr> <tr><td><code>uint256 outputAmount</code></td></tr> </tbody> </table> |
|clipperSwapToWithPermit  | 0xd6a92a5d| <table>  <tbody>  <tr><td><code>address recipient</code></td></tr> <tr><td><code>address srcToken</code></td></tr> <tr><td><code>address dstToken</code></td></tr> <tr><td><code>uint256 amount</code></td></tr> <tr><td><code>uint256 minReturn</code></td></tr> </tbody> </table> |
|clipperSwapToWithPermit (v5)  | 0xc805a666| <table>  <tbody>  <tr><td><code>address recipient</code></td></tr> <tr><td><code>address srcToken</code></td></tr> <tr><td><code>address dstToken</code></td></tr> <tr><td><code>uint256 inputAmount</code></td></tr> <tr><td><code>uint256 outputAmount</code></td></tr> </tbody> </table> |
|fillOrderRFQ  | 0xd0a3b665| <table>  <tbody>  <tr><td><code>address order.makerAsset</code></td></tr> <tr><td><code>address order.takerAsset</code></td></tr> <tr><td><code>address order.maker</code></td></tr> <tr><td><code>uint256 order.makingAmount</code></td></tr> <tr><td><code>uint256 order.takingAmount</code></td></tr> </tbody> </table>|
|fillOrderRFQ (v5)  | 0x3eca9c0a| <table>  <tbody>  <tr><td><code>address order.makerAsset</code></td></tr> <tr><td><code>address order.takerAsset</code></td></tr> <tr><td><code>address order.maker</code></td></tr> <tr><td><code>uint256 order.makingAmount</code></td></tr> <tr><td><code>uint256 order.takingAmount</code></td></tr> </tbody> </table>|
|fillOrderRFQToWithPermit  | 0x4cc4a27b| <table>  <tbody>  <tr><td><code>address order.makerAsset</code></td></tr> <tr><td><code>address order.takerAsset</code></td></tr> <tr><td><code>address order.maker</code></td></tr> <tr><td><code>uint256 order.makingAmount</code></td></tr> <tr><td><code>uint256 order.takingAmount</code></td></tr> </tbody> </table>|
|fillOrderRFQToWithPermit (v5)  | 0x70ccbd31| <table>  <tbody>  <tr><td><code>address order.makerAsset</code></td></tr> <tr><td><code>address order.takerAsset</code></td></tr> <tr><td><code>address order.maker</code></td></tr> <tr><td><code>uint256 order.makingAmount</code></td></tr> <tr><td><code>uint256 order.takingAmount</code></td></tr> </tbody> </table>|



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

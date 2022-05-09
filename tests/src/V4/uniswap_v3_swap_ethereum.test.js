import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3Swap"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x70253ff84d45e3451c0f6d9a4f2a5ef0076d1e5dd3d4364cc865edc5b214e025
const chainID = 1;
const inputData = "0xe449022e000000000000000000000000000000000000000000000000000000008c122780000000000000000000000000000000000000000000000000059b45d03583ddc90000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000280000000000000000000000011b815efb8f581194ae79006d24e0d814b7697f68000000000000000000000009a3b86971cdae2555e1a2a616293dbdfdec48a48e26b9977";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 7, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
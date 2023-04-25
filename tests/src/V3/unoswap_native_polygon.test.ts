import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "unoswapNativeTokenSwapV3"; // <= Name of the test
const testDirSuffix = "unoswap_native_v3"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x11111112542d85b3ef69ae05771c2dccff4faa26";
const chainID = 137;

// From : https://polygonscan.com/tx/0xbf0bcced72e9a7d3827ff4466bd653d986cfa1d8893ab2c4780523b22a2982bc
const inputData = "0x2e95b6c80000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000001f7a15b31aeaf0516a00000000000000000000000000000000000000000000001f7a15b31aeaf0516a0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000200000000000000003b6d0340289cf2b63c5edeeeab89663639674d9233e8668e00000000000000003b6d03409e2fbb31fbd68472f6cd54a1635b8cd64d78fc1c";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 10, // <= Define the number of steps for this test case and this device
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

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
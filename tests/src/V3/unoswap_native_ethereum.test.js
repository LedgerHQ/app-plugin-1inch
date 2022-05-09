import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "unoswapNativeTokenSwapV3"; // <= Name of the test
const testDirSuffix = "unoswap_native_v3"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x11111112542d85b3ef69ae05771c2dccff4faa26";
const chainID = 1;

// From : https://etherscan.io/tx/0x778a4ec7e8203c2a339136e3a2565d49f53114860d88dd44a2c1ade80754a898
const inputData = "0x2e95b6c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008e1bc9bf040000000000000000000000000000000000000000000000000000ecb3122e1ede5cde0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000180000000000000003b6d03409cbfb60a09a9a33a10312da0f39977cbdb7fde230bd34b36";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 6, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
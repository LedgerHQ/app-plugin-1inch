import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "unoswapUnknowTokenSwapV3"; // <= Name of the test
const testDirSuffix = "unoswap_unknown_v3"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x11111112542d85b3ef69ae05771c2dccff4faa26";
const chainID = 1;

// From : https://etherscan.io/tx/0x4c0f96df7eea94239b86c0844278b9fd71f9ca025adc96027403487d58fb56d7
const inputData = "0x2e95b6c80000000000000000000000003f1421cb90d26b28e7495cb952f6f4eb1b8681fa0000000000000000000000000000000000002c60bba58d87e26180f29000000000000000000000000000000000000000000000000000000000590893da0b06bf0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d034001ff7b1932a70997726e4be1fb34a9fbc3cdc4c5";

// Create serializedTx and remove the "0x" prefix
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

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
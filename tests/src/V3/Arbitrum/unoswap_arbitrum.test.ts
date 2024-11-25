import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "unoswap"; // <= Name of the test
const testDirSuffix = "unoswap"; // <= directory to compare device snapshots to
const testNetwork = "arbitrum";
const signedPlugin = false;

const contractAddr = "0x11111112542d85b3ef69ae05771c2dccff4faa26";
const chainID = 42161;

// From : https://etherscan.io/tx/0x28f440290bb6fb4f1b55af9f8de546acc165e208850a372062751f13f0505577
const inputData = "0x2e95b6c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009184e72a00000000000000000000000000000000000000000000000000000384aaf3cb76a140000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000180000000000000003b6d0340f1f85b2c54a2bd284b1cf4141d64fd171bd85539";

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

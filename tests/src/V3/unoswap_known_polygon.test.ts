import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "unoswapKnowTokenSwapV3"; // <= Name of the test
const testDirSuffix = "unoswap_known_v3"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x11111112542d85b3ef69ae05771c2dccff4faa26";
const chainID = 137;

// From : https://polygonscan.com/tx/0xdbc7c46bb0ef3f312d28f7e4b0ff06a89dfba7a0a41ede5d7ee7b7c9d0dfe006
const inputData = "0x2e95b6c80000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000000000000000000000000000319f0d23587ff690000000000000000000000000000000000000000000000000319f0d23587ff690000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000300000000000000003b6d0340fc2fc983a411c4b1e238f7eb949308cf0218c75080000000000000003b6d0340addc9c73f3cbad4e647eaff691715898825ac20c00000000000000003b8b87c0173e90f2a94af3b075deec7e64df4d70efb4ac3d";

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

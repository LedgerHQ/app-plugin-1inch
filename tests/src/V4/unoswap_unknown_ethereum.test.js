import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapUnknowTokenSwapV4"; // <= Name of the test
const testDirSuffix = "unoswap_unknown_v4"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 1;

// From : https://etherscan.io/tx/0x14556c2ff2bdceb8866a2149d66c8c6b4532477633b8baed95eb0d0e79f48173
const inputData = "0x2e95b6c80000000000000000000000003f1421cb90d26b28e7495cb952f6f4eb1b8681fa00000000000000000000000000000000000000000000000000b1a2bc2ec5000000000000000000000000000000000000000000000000048c48c63f09446067810000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000180000000000000003b6d0340c06dadbfde48c0bdeb4608ddc7f232fd07a02da1cfee7c08";
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
import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapKnowTokenSwapV4"; // <= Name of the test
const testDirSuffix = "unoswap_known_v4"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 137;

const selector = "0x2e95b6c8";
const srcToken = "0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
const amount = "00000000000000000000000000000000000000000000001f7a15b31aeaf0516a";
const minReturn = "00000000000000000000000000000000000000000000001f7a15b31aeaf0516a";
const pools = "0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000280000000000000003b6d034006da0fd433c1a5d7a4faa01111c044910a18455380000000000000003b6d0340336ef4e633b1117dca08c1a57f4139c62c32c935e26b9977";

const inputData = selector + srcToken + amount + minReturn + pools;
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
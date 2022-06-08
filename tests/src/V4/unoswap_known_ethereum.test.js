import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapKnowTokenSwapV4"; // <= Name of the test
const testDirSuffix = "unoswap_known_v4"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 1;

// From : https://etherscan.io/tx/0xd3a8ccb5abcddf1f282a1b0b6fab7b21583cd080032bc5518e13d6d06f1f5d9e
const inputData = "0x2e95b6c8000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000b27aeb0000000000000000000000000000000000000000000000119801b9944132fc21d30000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000280000000000000003b6d034006da0fd433c1a5d7a4faa01111c044910a18455380000000000000003b6d0340336ef4e633b1117dca08c1a57f4139c62c32c935e26b9977";
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
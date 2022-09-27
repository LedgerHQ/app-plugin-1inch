import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "clipperSwapNativeToKnown"; // <= Name of the test
const testDirSuffix = "clipper_swap_native_to_known"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x20a1be8e7693912b0a0b38dd8e8fac199ef97c4cc170c723c1ffa5cc6ef575a1
const chainID = 1;
const inputData = "0xb04311820000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000001a3385ff37f000000000000000000000000000000000000000000000000000000000000186c7f978e26b9977";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 5, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 5, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 5, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
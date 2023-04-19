import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "clipperSwapKnownToKnown"; // <= Name of the test
const testDirSuffix = "clipper_swap_known_to_known"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x408c22de9ea5e54f0936f14198c6a6e094603b278c5bb1c6881df149b4f7103c
const chainID = 1;
const inputData = "0xb04311820000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c5990000000000000000000000000000000000000000000000bf70b6ef254be8c00000000000000000000000000000000000000000000000000000000000008018fae26b9977";
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
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testLabel = "unoswapV5"; // <= Name of the test
const testDirSuffix = "unoswap_v5"; // <= directory to compare device snapshots to
const testNetwork = "fantom";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 250;

// From : https://ftmscan.com/tx/0x09f9f70ff8e55755619513a64a0bc3df1dec91ed0b1cae95e997275bd32c448c
const inputData = "0x0502b1c50000000000000000000000002f733095b80a04b38b0d10cc884524a3d09b836a000000000000000000000000000000000000000000000000000000004bdcc083000000000000000000000000000000000000000000000062c1b2bd559b4d44a400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001c0000000000000003b7dcc202d0ed226891e256d94f1071e2f94fbcdc9060e14f012a792";

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

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testLabel = "unoswapV5"; // <= Name of the test
const testDirSuffix = "unoswap_v5"; // <= directory to compare device snapshots to
const testNetwork = "base";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 8453;

// From : https://base.thesuperscan.io/tx/0x6fe387a529a33fb0456bc3ddeac1cb4b2b59eba17187a888ea07191270269f3c
const inputData = "0x0502b1c500000000000000000000000018a8bd1fe17a1bb9ffb39ecd83e9489cfd17a022000000000000000000000000000000000000000000000030b7bed59a4fc838f90000000000000000000000000000000000000000000000000015fcf51bfd7baa0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d0340ff5375bd65056dbe6119256fc3be2eb0ffa8a840f012a792";

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

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
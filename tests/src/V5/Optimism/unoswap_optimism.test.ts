import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testLabel = "unoswapV5"; // <= Name of the test
const testDirSuffix = "unoswap_v5"; // <= directory to compare device snapshots to
const testNetwork = "optimism";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 10;

// From : https://optimistic.etherscan.io/tx/0xab4ebfe09707dac8c3243a8a853785d2db58cc86fbe5cc679e2567a15c70c976
const inputData = "0x0502b1c500000000000000000000000042000000000000000000000000000000000000420000000000000000000000000000000000000000000000000429d069189e00000000000000000000000000000000000000000000000000000000bbe5cd31ed120000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000200000000000000003b6d034053582f104708878056f21cbff142a982b29f7232c0000000000000003b6d03402f7708fd509d7a60ace6ab22e1e19b3d60e4f77a5459d708";

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
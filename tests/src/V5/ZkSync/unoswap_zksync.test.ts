import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testLabel = "unoswapV5"; // <= Name of the test
const testDirSuffix = "unoswap_v5"; // <= directory to compare device snapshots to
const testNetwork = "zksync_era";
const signedPlugin = false;

const contractAddr = "0x6e2b76966cbd9cf4cc2fa0d76d24d5241e0abc2f";
const chainID = 324;

// From : https://era.zksync.network/tx/0xc36f16cae415ff4d8a41ec64330304461f662cd48c812e04e95001b23c7b0c01
const inputData = "0x0502b1c50000000000000000000000008290333cef9e6d528dd5618fb97a76f268f3edd40000000000000000000000000000000000000000000000d594f29bebfe68000000000000000000000000000000000000000000000000000000cea8372d441a190000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d03405201883feeb05822ce25c9af8ab41fc78ca73fa9583175d8";

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
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 8, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
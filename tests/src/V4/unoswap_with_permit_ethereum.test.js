import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "unoswapWithPermit"; // <= Name of the test
const testDirSuffix = "unoswap_with_permit"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0xed9ee640466e2f49a6eb6d0470d33efe9a6f01ecb45913ff473f46059167e957
const chainID = 1;
const inputData = "0xa1251d75000000000000000000000000949d48eca67b17269629c7194f4b727d4ef9e5d6000000000000000000000000000000000000000000000d312bfbe670f5ccb8fc0000000000000000000000000000000000000000000000024f0c831ca08c507b00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d0340ccb63225a7b19dcf66717e4d40c9a72b39331d6100000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000531516ca59544bf8ab2451a072b6fa94adf5a88c0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000062615a6f000000000000000000000000000000000000000000000000000000000000001c5af1afdeb28be04bc7012d6f63f7fbdcf9dada199d257f43854814d67047a109736ed2cfe2c9857276f6bf9140ce6cb58cd7cfcd42264338bd62140b64abc39de26b9977";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 9, // <= Define the number of steps for this test case and this device
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

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
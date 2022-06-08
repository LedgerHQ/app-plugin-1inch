import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "fillOrderRFQ"; // <= Name of the test
const testDirSuffix = "fill_order_rfq"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork= "polygon";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 137;

// From : https://polygonscan.com/tx/0x3c166f349d710af7d4c1e32a94feae7e5cb4a1117398ea65e5189e16908a9fbf
const inputData = "0xd0a3b665000000000000000000000000000000000000000062739fdb67095ce5f81c1fdf000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619000000000000000000000000b398ffef80144095b8712c70a0c09886c8151feb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e137f60000000000000000000000000000000000000000000000000011f4d047db2400000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011f4d047db240000000000000000000000000000000000000000000000000000000000000000417056a093672addbb776efa70c9418943e3b8ee9d95fa804e2c0aa3f82d43995213a13188ad19d67caa794ea4cf59d4e041e4dd0d5cc83a69c014a94c38f0abd11b00000000000000000000000000000000000000000000000000000000000000e26b9977";
// Create serializedTx and remove the "0x" prefix
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
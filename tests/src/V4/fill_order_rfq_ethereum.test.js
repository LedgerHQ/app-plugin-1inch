import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "fillOrderRFQ"; // <= Name of the test
const testDirSuffix = "fill_order_rfq"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 1;

// // From : https://etherscan.io/tx/0x384d3265e101249d91ebe97bf76f15e16ccc7779f1b26de017651663a7aa34ac
const inputData = "0xd0a3b665800000000000000000000000000000000000000062739df3000000000002d085000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000b3c839dbde6b96d37c56ee4f9dad3390d49310aa000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004beb82204416940000000000000000000000000000000000000000000000000000000003baa0c4000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003b9aca0000000000000000000000000000000000000000000000000000000000000000451c33d2f4ab40499da64da1075e76f61f5b7164f787bbe854902125bd09794cc09f09c64ae8c8ea0c03f7be8aa4befe109f511845560ae9e2b2c0ba3037975982ff62739d7b000000000000000000000000000000000000000000000000000000e26b9977";

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
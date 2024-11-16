
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "fillorder_rfq_v5"; // <= directory to compare device snapshots to
const testNetwork = "optimism";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 10;

// From : https://optimistic.etherscan.io/tx/0xb377731dc5fdc7451c21ce40a2622d0ab32da376e0d637d22135cdfa06daf8e5
const inputData = "0x3eca9c0a000000000000000000000000000000000000000066818c300000000000b2afbf000000000000000000000000420000000000000000000000000000000000000600000000000000000000000094b008aa00579c1307b0ef2c499ad98a8ce58e580000000000000000000000002c6bea966e83dff8619e54fd819da727ed5102e1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009cc153809f49000000000000000000000000000000000000000000000000000000000008f09b0000000000000000000000000000000000000000000000000000000000000120700000000000000000000000000000000000000000000000000000000008f09b00000000000000000000000000000000000000000000000000000000000000411b2c2ffebb61e50ee145dc86103c81e3ccf0dbeced3f54f934a7755c6fa0c66a84576d8c714d244f47379a0c0dbc772514306d38f52645a85c9413b29714bdf75900000000000000000000000000000000000000000000000000000000000000ab000294e26b9977";

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 11, // <= Define the number of steps for this test case and this device
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
        processTest(device, contractName, testDirSuffix, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
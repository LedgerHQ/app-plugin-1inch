import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "unoswap_to_with_permit_v5"; // <= directory to compare device snapshots to
const testNetwork = "arbitrum";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 42161;

// From : https://arbiscan.io/tx/0x78f2eaf94035e217b43e62df95a422856ea7a25cf4294b62e02cf97bf6d5cc06
const inputData = "0x3c15fd91000000000000000000000000bda520a094968b21c7db1ddc9fdb426d21afae50000000000000000000000000ff970a61a04b1ca14834a43f5de4533ebddb5cc800000000000000000000000000000000000000000000000000000000019df439000000000000000000000000000000000000000000000000001c5f5ddbc0eb8d00000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000001c0000000000000003b6d0340905dfcd5649217c42684f23958568e533c711aa300000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000bda520a094968b21c7db1ddc9fdb426d21afae500000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000006682be3b000000000000000000000000000000000000000000000000000000000000001c39495774b11c3ec6ad88727970f6b9edb7efaa5570963c3868ceeb157c91d9b11c98350260323621f1420aa42a50e25edd1ba25d7a14ba5b2803b3a1ddae447d8ca0d64c";

const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 12, // <= Define the number of steps for this test case and this device
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
        processTest(device, contractName, testDirSuffix, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
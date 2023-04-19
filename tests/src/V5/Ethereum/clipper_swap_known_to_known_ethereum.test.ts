
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "clipper_swap_known_to_known_v5"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 1;

// From : https://etherscan.io/tx/0xcdb71dab1e1191d34a218ed97f7b1382655fbee99474c342ecb7cd75e4fafdd4
const inputData = "0x84bd6d29000000000000000000000000e7b0ce0526fbe3969035a145c9e9691d4d9d216c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000278d3be669dd000000000000000000000000000000000000000000000000000000000000cec8bdaa0000001c50548a0c0000000005f5e10000b1a2bc2ec50000006400bc63a24b6259e4ba38515f9e6c08ed074664db2ed5cd3a200035f37b4cdc383a53bcd5067839a64d48becd57147963215ae4bf7721657952a098a176ad603a47165f05aa7ce26b9977";

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
        processTest(device, contractName, testDirSuffix, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
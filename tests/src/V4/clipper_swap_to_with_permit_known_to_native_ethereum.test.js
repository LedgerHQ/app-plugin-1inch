import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "clipperSwapToWithPermitKnownToNative"; // <= Name of the test
const testDirSuffix = "clipper_swap_to_with_permit_known_to_native"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x0023bf9c5bc31b8f0298346e719a8714dc8c6c35b96c0f28e7f7d1eb3682d145
const chainID = 1;
const inputData = "0xd6a92a5d000000000000000000000000a2e0e046bc732613464ecff416f8ecaf2cc7f1400000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001431b1efb45ce9a6725000000000000000000000000000000000000000000000000196e7c6125d153e200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000a2e0e046bc732613464ecff416f8ecaf2cc7f1400000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062528d170000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001c3c5b945efdc7bf8dc88970900b8d0487359c00f8c7797942721369cce052f6cd09d65ffb273950e687aefbf87d3f2e4f03f06b7922bbcc2d1fea2008fcd2535de26b9977";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 13, // <= Define the number of steps for this test case and this device
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
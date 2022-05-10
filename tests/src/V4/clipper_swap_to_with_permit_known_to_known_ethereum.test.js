import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "clipperSwapToWithPermitKnownToKnown"; // <= Name of the test
const testDirSuffix = "clipper_swap_to_with_permit_known_to_known"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork = "ethereum";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";

// // From : https://etherscan.io/tx/0x48c8ff7868de767beb6167489d606d0d30384508dbc1e91e92e3ff4bf8cbae19
const chainID = 1;
const inputData = "0xd6a92a5d000000000000000000000000dec2b9ba91c2daf554482d42143906f382b0283b0000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c5990000000000000000000000000000000000000000000003cf83e4149a3893892b00000000000000000000000000000000000000000000000000000000027e305d00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000dec2b9ba91c2daf554482d42143906f382b0283b0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062521c700000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000001b50641b693bd5f7be049b8f2cc81a5fc9615cca6f37e6928b59346f98b60111e973994a7150ad59e83627a69ab01df9c7622321ac84872b7a1c7c04b36948fe1be26b9977";
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
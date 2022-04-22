import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3Swap"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

// // From : https://etherscan.io/tx/0x27137b638bb97aa52c9c9a53eebc4ba6da2717fb59f6c41fce0a9b8f884187cc
// const rawTx = "0xf9010e59850c33a2f63d830339a4941111111254fb6c44bac0bed2854e76f90643097d80b8a8e449022e000000000000000000000000000000000000000000000001ef7dba4430610ca30000000000000000000000000000000000000000000000000000000b97e7770f00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e859041c9c6d70177f83de991b9d757e13cea26ee26b997725a00115f6c1a0d7681f4a1bd50aced1acca8c3f684ad50c80e0fe05fc8c73163a81a01f724b5fd9f850f93a5d708df22a29d33b6e847b1335426d55eb10d81a06736a";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 137;

const inputData = "0xe449022e00000000000000000000000000000000000000000000000000000000000791550000000000000000000000000000000000000000000000000d772e161e5b20fd00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c1dc5605b242a658adfc7d6e693a50aefb49bbaee26b9977";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);



const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 10, // <= Define the number of steps for this test case and this device
    },
    // {
    //     name: "nanox",
    //     label: "Nano X",
    //     steps: 6, // <= Define the number of steps for this test case and this device
    // }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
import { processTest, populateTransaction } from "../../test.fixture";

const contractName = "AggregationRouterV5";

const testDirSuffix = "clipper_swap_to_with_permit_known_to_known_v5"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x1111111254eeb25477b68fb85ed929f73a960582";
const chainID = 137;

// From : https://polygonscan.com/tx/0xb48bbf9a15f1a6c89f426858fff9836ba89a2db9a61a5cce59aaf3e8a85f507c
const inputData = "0xc805a6660000000000000000000000006bfce69d1df30fd2b2c8e478edec9daa643ae3b800000000000000000000000004bfcb7b6bc81361f14c1e2c7592d712e3b9f4560000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007a12000000000000000000000000000000000000000000000000008c508d81fc96c0000000000005f5e1000000000004b6e8c0011c37937e08000000b2006463a345351449164e3eb5093b78e03d192f2eee0c250ddd3900d93e63512498b8a1b05f95cd2ecb3aa708798f61877ec52dc0dfb44ffc820f84c587f9e2486ea1400b7765000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000004bfcb7b6bc81361f14c1e2c7592d712e3b9f4560000000000000000000000001111111254eeb25477b68fb85ed929f73a960582ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000063a3f4a4000000000000000000000000000000000000000000000000000000000000001b7685b2055e837c9896a13a8fca127e8c57feddfdc67e952e961db5f7f6720296718116230ea4765e9de3035001c6f54729d471a60f5070c8ba0bb767d12a9b41e26b9977";

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
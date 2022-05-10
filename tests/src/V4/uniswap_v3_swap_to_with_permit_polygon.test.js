import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "uniswapV3SwapToWithPermit"; // <= Name of the test
const testDirSuffix = "uniswap_v3_swap_to_with_permit"; // <= directory to compare device snapshots to
const signedPlugin = false;
const testNetwork= "polygon";

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 137;

// From : https://polygonscan.com/tx/0xc9b8c8eb739e62e5d43e4476a2dd6818bbf7d7afe07d0d5688cfa63edff0c5c6
const inputData = "0x2521b930000000000000000000000000b208e76dfc3ae677a4c046296dd646a69a9d345700000000000000000000000045c32fa6df82ead1e2ef74d17b76547eddfaff89000000000000000000000000000000000000000000000000162e12fc1e5653a70000000000000000000000000000000000000000000000023ec5e528aaa13e9d00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000085efec4ee18a06ce1685abf93e434751c3cb9ba900000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000b208e76dfc3ae677a4c046296dd646a69a9d34570000000000000000000000001111111254fb6c44bac0bed2854e76f90643097dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000062686e1a000000000000000000000000000000000000000000000000000000000000001b83bf60ab98f32bdeff78ae352b0e18ca4b691d471e55fe2ebbd6170772c83407476a671afdd6e9cc21465418803527b41b62ff8b44244e27857ed7c0af6c1975e26b9977";
// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);



const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 14, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 9, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 9, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
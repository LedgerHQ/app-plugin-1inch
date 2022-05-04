import { processTest, populateTransaction } from "../test.fixture";

const contractName = "AggregationRouterV4";

const testLabel = "swapKnownToNativeV4"; // <= Name of the test
const testDirSuffix = "swap_known_to_native_v4"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x1111111254fb6c44bac0bed2854e76f90643097d";
const chainID = 137;

// From : https://polygonscan.com/tx/0x366708f5380da4e04b4ea7a6087091f654aad603a3f0c878ee579e168ab0b91f
const inputData = "0x7c025200000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001800000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000036b446cdf4c3cfb1c9e40514ef4ab88a539fde950000000000000000000000000000000000000000000000000000000011e1a30000000000000000000000000000000000000000000000000e848c5f58a9f3800000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000019c00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000a800000000000000000000000000000000000000000000000000000000000001760000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000098414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000240000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000020000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000864aade5c4900000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000010000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000036b446cdf4c3cfb1c9e40514ef4ab88a539fde95000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000002e75f7a25a2cb604200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000620800000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064eb5625d90000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c8000000000000000000000000000000000000000000000000000000000393870000000000000000000000000000000000000000000000000000000000800000000000000000000000ba12222222228d8ba445958a75a0704d566bf2c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001e452bbbe2900000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000006273a68f0d34e5dd4d8f043557145598e4e2dc286b35fd4f00000000000000000000006800000000000000000000000000000000000000000000000000000000000000000000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a063000000000000000000000000000000000000000000000000000000000393870000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000440000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a0630000000000000000000000000000003200000000000000000000000000000032000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064d1660f990000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a063000000000000000000000000eef611894ceae652979c9d0dae1deb597790c6ee00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a4b757fed6000000000000000000000000eef611894ceae652979c9d0dae1deb597790c6ee0000000000000000000000008f3cf7ad23cd3cadbd9735aff958023239c6a0630000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000002dc6c0521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c4414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000240000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000008000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000b24aade5c4900000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000010000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000036b446cdf4c3cfb1c9e40514ef4ab88a539fde95000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000b9cdbb0eae9b3e180000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000006200000000000000000000000000000000000000000000000000000000000000760000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000440000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000003000000000000000000000000000000190000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064d1660f990000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000008a4ceb4dffa238539c5d62ce424980e8fdb21ebc00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a4b757fed60000000000000000000000008a4ceb4dffa238539c5d62ce424980e8fdb21ebc0000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000249f00521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000440000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000003800000000000000000000000000000160000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064d1660f990000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000005e58e0ced3a272caeb8ba00f4a4c2805df6be49500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a4b757fed60000000000000000000000005e58e0ced3a272caeb8ba00f4a4c2805df6be4950000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000f4240521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000022414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000440000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000012800000000000000000000000000000128800000000000000000000000c3c4074fbc2d504fb8ccd28e3ae46914a1ecc5ed000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000104128acb08000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000fffd8963efd1fc6a506488495d951d5263988d2500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018414284aab000000000000000000000000000000000000000000000000000000000000008080000000000000000000000000000000000000000000000000000000000000440000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000100000000000000000000000000000001000000000000000000000000521709b3cd7f07e29722be0ba28a8ce0e806dbc3000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064d1660f990000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cfee7c08";

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
    }
];

devices.forEach((device) =>{
        processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork);
    }
);
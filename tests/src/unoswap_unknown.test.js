import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { waitForAppScreen, zemu } from './test.fixture';

test('Unoswap unknown token swap', zemu(async (sim, eth) => {
    // Unknown token to something (900,090,000,000,000 DOGESHLD to 0.02 ETH)
    // https://etherscan.io/tx/0x4c0f96df7eea94239b86c0844278b9fd71f9ca025adc96027403487d58fb56d7
    const tx = eth.signTransaction(
        "44'/60'/0'/0/0",
        'f8ea178507aef40a0083024d1a9411111112542d85b3ef69ae05771c2dccff4faa2680b8c42e95b6c80000000000000000000000003f1421cb90d26b28e7495cb952f6f4eb1b8681fa0000000000000000000000000000000000002c60bba58d87e26180f29000000000000000000000000000000000000000000000000000000000590893da0b06bf0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000140000000000000003b6d034001ff7b1932a70997726e4be1fb34a9fbc3cdc4c5018080'
    );
    await waitForAppScreen(sim);
    await sim.navigateAndCompareSnapshots('.', 'unoswap_unknown', [4, 0]);

    await tx;
}));

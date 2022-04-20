import Zemu from '@zondax/zemu';
import Eth from '@ledgerhq/hw-app-eth';

const transactionUploadDelay = 60000;

export async function waitForAppScreen(sim) {
    await sim.waitUntilScreenIsNot(sim.getMainMenuSnapshot(), transactionUploadDelay);
}

const simOptions = {
    model: 'nanos',
    logging: true,
    X11: false,
    startDelay: 10000,
    startText: 'is ready',
    custom: '',
};

const Resolve = require('path').resolve;

const APP_PATH_NANOS = Resolve('elfs/ethereum_nanos.elf');

const PLUGIN_LIB_NANOS = { '1inch': Resolve('elfs/1inch_nanos.elf') };

export function zemu(func) {
    return async () => {
        jest.setTimeout(100000);
        const sim = new Zemu(APP_PATH_NANOS, PLUGIN_LIB_NANOS);
        try {
            await sim.start(simOptions);
            const transport = await sim.getTransport();
            await func(sim, new Eth(transport));
        } finally {
            await sim.close();
        }
    };
}

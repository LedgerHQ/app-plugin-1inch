#include "one_inch_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check 1inch swap methods here
// https://etherscan.io/address/0x11111112542d85b3ef69ae05771c2dccff4faa26#writeContract
//
// swap 0x7c025200
static const uint8_t ONE_INCH_SWAP_SELECTOR[SELECTOR_SIZE] = {0x7c, 0x02, 0x52, 0x00};
// unoswap 0x2e95b6c8
static const uint8_t ONE_INCH_UNOSWAP_SELECTOR[SELECTOR_SIZE] = {0x2e, 0x95, 0xb6, 0xc8};

// Array of all the different 1inch selectors.
const uint8_t *const ONE_INCH_SELECTORS[NUM_ONE_INCH_SELECTORS] = {
    ONE_INCH_SWAP_SELECTOR,
    ONE_INCH_UNOSWAP_SELECTOR,
};

// 1inch uses `0xeeeee` as a dummy address to represent ETH.
const uint8_t ONE_INCH_ETH_ADDRESS[ADDRESS_LENGTH] = {0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                      0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                      0xee, 0xee, 0xee, 0xee, 0xee, 0xee};

// Used to indicate that the beneficiary should be the sender.
const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

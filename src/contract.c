#include "one_inch_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check 1inch swap methods here
// https://etherscan.io/address/0x11111112542d85b3ef69ae05771c2dccff4faa26#writeContract
//
// swap 0x7c025200
static const uint8_t ONE_INCH_SWAP_SELECTOR[SELECTOR_SIZE] = {0x7c, 0x02, 0x52, 0x00};
// unoswap 0x2e95b6c8
static const uint8_t ONE_INCH_UNOSWAP_SELECTOR[SELECTOR_SIZE] = {0x2e, 0x95, 0xb6, 0xc8};
// uniswapV3Swap 0xe449022e
static const uint8_t ONE_INCH_UNISWAP_V3_SWAP_SELECTOR[SELECTOR_SIZE] = {0xe4, 0x49, 0x02, 0x2e};
// uniswapV3SwapTo 0xbc80f1a8
static const uint8_t ONE_INCH_UNISWAP_V3_SWAP_TO_SELECTOR[SELECTOR_SIZE] = {0xbc, 0x80, 0xf1, 0xa8};
// uniswapV3SwapToWithPermit 0x2521b930
static const uint8_t ONE_INCH_UNISWAP_V3_SWAP_TO_WITH_PERMIT_SELECTOR[SELECTOR_SIZE] = {0x25,
                                                                                        0x21,
                                                                                        0xb9,
                                                                                        0x30};
// unoswapWithPermit 0xa1251d75
static const uint8_t ONE_INCH_UNOSWAP_WITH_PERMIT_SELECTOR[SELECTOR_SIZE] = {0xa1,
                                                                             0x25,
                                                                             0x1d,
                                                                             0x75};
// clipperSwap 0xb0431182
static const uint8_t ONE_INCH_CLIPPER_SWAP_SELECTOR[SELECTOR_SIZE] = {0xb0, 0x43, 0x11, 0x82};
// clipperSwapToWithPermit 0xd6a92a5d
static const uint8_t ONE_INCH_CLIPPER_SWAP_TO_WITH_PERMIT_SELECTOR[SELECTOR_SIZE] = {0xd6,
                                                                                     0xa9,
                                                                                     0x2a,
                                                                                     0x5d};
// fillOrderRFQ 0xd0a3b665
static const uint8_t ONE_INCH_FILL_ORDER_RFQ_SELECTOR[SELECTOR_SIZE] = {0xd0, 0xa3, 0xb6, 0x65};
// fillOrderRFQ 0x4cc4a27b
static const uint8_t ONE_INCH_FILL_ORDER_RFQ_TO_WITH_PERMIT_SELECTOR[SELECTOR_SIZE] = {0x4c,
                                                                                       0xc4,
                                                                                       0xa2,
                                                                                       0x7b};

// swap 0x12aa3caf
static const uint8_t ONE_INCH_SWAP_SELECTOR_V5[SELECTOR_SIZE] = {0x12, 0xaa, 0x3c, 0xaf};

// unoswap 0x0502b1c5
static const uint8_t ONE_INCH_UNOSWAP_SELECTOR_V5[SELECTOR_SIZE] = {0x05, 0x02, 0xb1, 0xc5};

// unoswapToWithPermit 0x3c15fd91
static const uint8_t ONE_INCH_UNOSWAP_TO_WITH_PERMIT_SELECTOR_V5[SELECTOR_SIZE] = {0x3c,
                                                                                   0x15,
                                                                                   0xfd,
                                                                                   0x91};

// clipperSwap 0x84bd6d29
static const uint8_t ONE_INCH_CLIPPER_SWAP_SELECTOR_V5[SELECTOR_SIZE] = {0x84, 0xbd, 0x6d, 0x29};

// clipperSwapWithPermit 0xc805a666
static const uint8_t ONE_INCH_CLIPPER_SWAP_TO_WITH_PERMIT_SELECTOR_V5[SELECTOR_SIZE] = {0xc8,
                                                                                        0x05,
                                                                                        0xa6,
                                                                                        0x66};

// fillOrderRFQToWithPermit 0x70ccbd31
static const uint8_t ONE_INCH_FILL_ORDER_RFQ_TO_WITH_PERMIT_SELECTOR_V5[SELECTOR_SIZE] = {0x70,
                                                                                          0xcc,
                                                                                          0xbd,
                                                                                          0x31};
// fillOrderRFQ 0x3eca9c0a
static const uint8_t ONE_INCH_FILL_ORDER_RFQ__SELECTOR_V5[SELECTOR_SIZE] = {0x3e, 0xca, 0x9c, 0x0a};

// Array of all the different 1inch selectors.
const uint8_t *const ONE_INCH_SELECTORS[NUM_ONE_INCH_SELECTORS] = {
    ONE_INCH_SWAP_SELECTOR,
    ONE_INCH_UNOSWAP_SELECTOR,
    ONE_INCH_UNISWAP_V3_SWAP_SELECTOR,
    ONE_INCH_UNISWAP_V3_SWAP_TO_SELECTOR,
    ONE_INCH_UNISWAP_V3_SWAP_TO_WITH_PERMIT_SELECTOR,
    ONE_INCH_UNOSWAP_WITH_PERMIT_SELECTOR,
    ONE_INCH_CLIPPER_SWAP_SELECTOR,
    ONE_INCH_CLIPPER_SWAP_TO_WITH_PERMIT_SELECTOR,
    ONE_INCH_FILL_ORDER_RFQ_SELECTOR,
    ONE_INCH_FILL_ORDER_RFQ_TO_WITH_PERMIT_SELECTOR,
    ONE_INCH_SWAP_SELECTOR_V5,
    ONE_INCH_UNOSWAP_SELECTOR_V5,
    ONE_INCH_UNOSWAP_TO_WITH_PERMIT_SELECTOR_V5,
    ONE_INCH_CLIPPER_SWAP_SELECTOR_V5,
    ONE_INCH_CLIPPER_SWAP_TO_WITH_PERMIT_SELECTOR_V5,
    ONE_INCH_FILL_ORDER_RFQ__SELECTOR_V5,
    ONE_INCH_FILL_ORDER_RFQ_TO_WITH_PERMIT_SELECTOR_V5,
};

// 1inch uses `0xeeeee` as a dummy address to represent ETH.
const uint8_t ONE_INCH_ETH_ADDRESS[ADDRESS_LENGTH] = {0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                      0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                      0xee, 0xee, 0xee, 0xee, 0xee, 0xee};

// Used to indicate that the beneficiary should be the sender.
const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

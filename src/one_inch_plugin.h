#pragma once

#include <string.h>
#include "eth_internals.h"
#include "eth_plugin_interface.h"
#include "debug_write.h"

#define PARAMETER_LENGTH 32
#define SELECTOR_SIZE    4

#define RUN_APPLICATION 1

#define NUM_ONE_INCH_SELECTORS 10
#define SELECTOR_SIZE          4

#define PLUGIN_NAME "1inch"

#define TOKEN_SENT_FOUND     1
#define TOKEN_RECEIVED_FOUND 1 << 1

// 1inch uses `0xeeeee` as a dummy address to represent ETH in Swap.
extern const uint8_t ONE_INCH_ETH_ADDRESS[ADDRESS_LENGTH];

// 1inch uses 0x00000 as a dummy address to reprecent ETH in Unmoswap.
extern const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH];

// Returns 1 if corresponding address is the 1inch address for the chain token (ETH, BNB, MATIC,
// etc.. are 0xeeeee...).
#define ADDRESS_IS_NETWORK_TOKEN(_addr)                      \
    (!memcmp(_addr, ONE_INCH_ETH_ADDRESS, ADDRESS_LENGTH) || \
     !memcmp(_addr, NULL_ETH_ADDRESS, ADDRESS_LENGTH))

typedef enum {
    SWAP,
    UNOSWAP,
    UNISWAP_V3_SWAP,
    UNISWAP_V3_SWAP_TO,
    UNISWAP_V3_SWAP_TO_WITH_PERMIT,
    UNOSWAP_WITH_PERMIT,
    CLIPPER_SWAP,
    CLIPPER_SWAP_TO_WITH_PERMIT,
    FILL_ORDER_RFQ,
    FILL_ORDER_RFQ_TO_WITH_PERMIT,
} oneInchSelector_t;

#define PARTIAL_FILL 1
extern const uint8_t *const ONE_INCH_SELECTORS[NUM_ONE_INCH_SELECTORS];

typedef enum {
    SEND_SCREEN,
    RECEIVE_SCREEN,
    BENEFICIARY_SCREEN,
    PARTIAL_FILL_SCREEN,
    WARN_SCREEN,
    ERROR,
} screens_t;

// Would've loved to make this an enum but we don't have enough room because enums are `int` and not
// `uint8_t`.
#define AMOUNT_SENT     0  // Amount sent by the user to the contract.
#define AMOUNT_RECEIVED 1  // Amount sent by the contract to the user.
#define TOKEN_SENT      2  // Address of the token the user is sending.
#define TOKEN_RECEIVED  3  // Address of the token sent to the user.
// #define PATH \
//     4  // Path of the different asseths that will get swapped during the trade. First and last
//        // tokens are the ones we care about.
#define SRC_RECEIVER 5  // Address to which the contract will send the tokens.
#define DST_RECEIVER 6
#define FLAGS_PARAM  7
// #define PATHS_LEN             8
// #define MEGA_PATHS_OFFSET     9
// #define MEGA_PATHS_LEN        10
// #define FIRST_MEGAPATH_OFFSET 11
// #define FIRST_MEGAPATH        12
#define NONE 13  // Placeholder variant to be set when parsing is done but data is still being sent.

// Number of decimals used when the token wasn't found in the CAL.
#define DEFAULT_DECIMAL WEI_TO_ETHER

// Ticker used when the token wasn't found in the CAL.
#define DEFAULT_TICKER ""

// Shared global memory with Ethereum app. Must be at most 5 * 32 bytes.
typedef struct one_inch_parameters_t {
    uint8_t amount_sent[INT256_LENGTH];
    uint8_t amount_received[INT256_LENGTH];
    uint8_t beneficiary[ADDRESS_LENGTH];
    uint8_t contract_address_sent[ADDRESS_LENGTH];
    uint8_t contract_address_received[ADDRESS_LENGTH];
    char ticker_sent[MAX_TICKER_LEN];
    char ticker_received[MAX_TICKER_LEN];

    // 32 * 2 + 20 * 3 + 12 * 2 == 64 + 60 + 24 == 144
    // 32 * 5 == 160 bytes so there are 160 - 144 == 16 bytes left.

    uint16_t offset;
    uint16_t checkpoint;
    uint8_t next_param;
    uint8_t tokens_found;
    uint8_t valid;
    uint8_t decimals_sent;
    uint8_t decimals_received;
    uint8_t selectorIndex;
    uint8_t flags;
    uint8_t skip;
    // 4 * 1 + 2 * 2 + 7 * 1 == 8 + 7 == 15 bytes. There are 16 - 15 == 1 byte left.
} one_inch_parameters_t;

void handle_provide_parameter(void *parameters);
void handle_query_contract_ui(void *parameters);
void one_inch_plugin_call(int message, void *parameters);
void handle_finalize(void *parameters);
void handle_init_contract(void *parameters);
void handle_provide_token(void *parameters);
void handle_query_contract_id(void *parameters);

static inline void printf_hex_array(const char *title __attribute__((unused)),
                                    size_t len __attribute__((unused)),
                                    const uint8_t *data __attribute__((unused))) {
    PRINTF(title);
    for (size_t i = 0; i < len; ++i) {
        PRINTF("%02x", data[i]);
    };
    PRINTF("\n");
}

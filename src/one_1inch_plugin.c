#include "one_inch_plugin.h"
#include <string.h>

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

// Called once to init.
static void handle_init_contract(void *parameters) {
    ethPluginInitContract_t *msg = (ethPluginInitContract_t *) parameters;

    if (msg->interfaceVersion != ETH_PLUGIN_INTERFACE_VERSION_1) {
        msg->result = ETH_PLUGIN_RESULT_UNAVAILABLE;
        return;
    }

    if (msg->pluginContextLength < sizeof(one_inch_parameters_t)) {
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    memset(context, 0, sizeof(*context));
    context->valid = 1;

    // Determine a function to call
    size_t i;
    for (i = 0; i < NUM_ONE_INCH_SELECTORS; i++) {
        if (memcmp((uint8_t *) PIC(ONE_INCH_SELECTORS[i]), msg->selector, SELECTOR_SIZE) == 0) {
            context->selectorIndex = i;
            break;
        }
    }

    // Set `next_param` to be the first field we expect to parse.
    switch (context->selectorIndex) {
        case SWAP:
            // Skip caller, structure offset and data offset
            context->skip = 3;
            context->next_param = TOKEN_SENT;
            break;
        case UNOSWAP:
            context->next_param = TOKEN_SENT;
            break;
        default:
            PRINTF("Missing selectorIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}

static void sent_token_eth(one_inch_parameters_t* context){
    context->decimals_sent = WEI_TO_ETHER;
    strncpy(context->ticker_sent, "ETH", sizeof(context->ticker_sent));
    context->tokens_found |= TOKEN_SENT_FOUND;
}

static void received_token_eth(one_inch_parameters_t* context){
    context->decimals_received = WEI_TO_ETHER;
    strncpy(context->ticker_received, "ETH", sizeof(context->ticker_received));
    context->tokens_found |= TOKEN_RECEIVED_FOUND;
}

static void handle_finalize(void *parameters) {
    ethPluginFinalize_t *msg = (ethPluginFinalize_t *) parameters;
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    PRINTF("eth2 plugin finalize\n");
    if (context->valid) {
        msg->numScreens = 1;
        if (context->selectorIndex == SWAP) {
            // An addiitonal screen is required to display the receive and beneficiary field.
            msg->numScreens += 2;
            if (context->flags & PARTIAL_FILL)
                msg->numScreens += 1;
        }

        if (!ADDRESS_IS_ETH(context->contract_address_sent)) {
            // Address is not ETH so we will need to look up the token in the CAL.
            printf_hex_array("Setting address sent to: ", ADDRESS_LENGTH, context->contract_address_sent);
            msg->tokenLookup1 = context->contract_address_sent;
        } else {
            sent_token_eth(context);
            msg->tokenLookup1 = NULL;
        }
        if (!ADDRESS_IS_ETH(context->contract_address_received)) {
            // Address is not ETH so we will need to look up the token in the CAL.
            printf_hex_array("Setting address received to: ", ADDRESS_LENGTH, context->contract_address_received);
            msg->tokenLookup2 = context->contract_address_received;
        } else {
            received_token_eth(context);
            msg->tokenLookup2 = NULL;
        }

        msg->uiType = ETH_UI_TYPE_GENERIC;
        msg->result = ETH_PLUGIN_RESULT_OK;
    } else {
        PRINTF("Context not valid\n");
        msg->result = ETH_PLUGIN_RESULT_FALLBACK;
    }
}

static void handle_provide_token(void *parameters) {
    ethPluginProvideToken_t *msg = (ethPluginProvideToken_t *) parameters;
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    PRINTF("1INCH plugin provide token: 0x%p, 0x%p\n", msg->token1, msg->token2);

    if (ADDRESS_IS_ETH(context->contract_address_sent)) {
        sent_token_eth(context);
    } else if (msg->token1 != NULL) {
        context->decimals_sent = msg->token1->decimals;
        strncpy(context->ticker_sent, (char *) msg->token1->ticker, sizeof(context->ticker_sent));
        context->tokens_found |= TOKEN_SENT_FOUND;
    } else {
        // CAL did not find the token and token is not ETH.
        context->decimals_sent = DEFAULT_DECIMAL;
        strncpy(context->ticker_sent, DEFAULT_TICKER, sizeof(context->ticker_sent));
        // // We will need an additional screen to display a warning message.
        // msg->additionalScreens++;
    }

    if (ADDRESS_IS_ETH(context->contract_address_received)) {
        received_token_eth(context);
    } else if (msg->token2 != NULL) {
        context->decimals_received = msg->token2->decimals;
        strncpy(context->ticker_received,
                (char *) msg->token2->ticker,
                sizeof(context->ticker_received));
        context->tokens_found |= TOKEN_RECEIVED_FOUND;
    } else {
        // CAL did not find the token and token is not ETH.
        context->decimals_received = DEFAULT_DECIMAL;
        strncpy(context->ticker_received, DEFAULT_TICKER, sizeof(context->ticker_sent));
        // // We will need an additional screen to display a warning message.
        // msg->additionalScreens++;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}

static void handle_query_contract_id(void *parameters) {
    ethQueryContractID_t *msg = (ethQueryContractID_t *) parameters;
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;

    strncpy(msg->name, PLUGIN_NAME, msg->nameLength);

    switch (context->selectorIndex) {
        case SWAP:
            strncpy(msg->version, "Swap", msg->versionLength);
            break;
        case UNOSWAP:
            strncpy(msg->version, "Unoswap", msg->versionLength);
            break;
        default:
            PRINTF("Selector Index :%d not supported\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}

void one_inch_plugin_call(int message, void *parameters) {
    PRINTF("Handling message %d\n", message);
    switch (message) {
        case ETH_PLUGIN_INIT_CONTRACT:
            handle_init_contract(parameters);
            break;
        case ETH_PLUGIN_PROVIDE_PARAMETER:
            handle_provide_parameter(parameters);
            break;
        case ETH_PLUGIN_FINALIZE:
            handle_finalize(parameters);
            break;
        case ETH_PLUGIN_PROVIDE_TOKEN:
            handle_provide_token(parameters);
            break;
        case ETH_PLUGIN_QUERY_CONTRACT_ID:
            handle_query_contract_id(parameters);
            break;
        case ETH_PLUGIN_QUERY_CONTRACT_UI:
            handle_query_contract_ui(parameters);
            break;
        default:
            PRINTF("Unhandled message %d\n", message);
            break;
    }
}

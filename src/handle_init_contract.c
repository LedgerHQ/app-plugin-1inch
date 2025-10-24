#include "plugin.h"

// Called once to init.
void handle_init_contract(ethPluginInitContract_t *msg) {
    if (msg->interfaceVersion != ETH_PLUGIN_INTERFACE_VERSION_LATEST) {
        msg->result = ETH_PLUGIN_RESULT_UNAVAILABLE;
        return;
    }

    if (msg->pluginContextLength < sizeof(one_inch_parameters_t)) {
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    memset(context, 0, sizeof(*context));

    // Determine a function to call
    size_t i;
    for (i = 0; i < NUM_ONE_INCH_SELECTORS; i++) {
        if (memcmp((uint8_t *) PIC(ONE_INCH_SELECTORS[i]), msg->selector, SELECTOR_SIZE) == 0) {
            context->selectorIndex = i;
            break;
        }
    }

    if (i == NUM_ONE_INCH_SELECTORS) {
        // Selector was not found
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    // Set `next_param` to be the first field we expect to parse.
    switch (context->selectorIndex) {
        case SWAP:
            // Skip caller, structure offset and data offset
            context->skip = 3;
            context->next_param = TOKEN_SENT;
            break;
        case UNOSWAP:
        case UNOSWAP_V5:
        case CLIPPER_SWAP:
        case UNOSWAP_WITH_PERMIT:
            context->next_param = TOKEN_SENT;
            break;
        case UNISWAP_V3_SWAP:
            context->next_param = AMOUNT_SENT;
            break;
        case UNISWAP_V3_SWAP_TO:
        case UNISWAP_V3_SWAP_TO_WITH_PERMIT:
        case UNOSWAP_TO_WITH_PERMIT_V5:
        case CLIPPER_SWAP_TO_WITH_PERMIT:
            context->next_param = DST_RECEIVER;
            break;
        case FILL_ORDER_RFQ:
        case FILL_ORDER_RFQ_TO_WITH_PERMIT:
            context->skip = 5;
            context->next_param = AMOUNT_SENT;
            break;
        case SWAP_V5:
        case CLIPPER_SWAP_V5:
        case FILL_ORDER_RFQ_V5:
        case FILL_ORDER_RFQ_TO_WITH_PERMIT_V5:
            context->skip = 1;
            context->next_param = TOKEN_SENT;
            break;
        case CLIPPER_SWAP_TO_WITH_PERMIT_V5:
            context->skip = 1;
            context->next_param = DST_RECEIVER;
            break;
        default:
            PRINTF("Missing selectorIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}

#include <stdbool.h>
#include "one_inch_plugin.h"

// Set UI for the "Send" screen.
static bool set_send_ui(ethQueryContractUI_t *msg, one_inch_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP:
        case SWAP_V5:
        case UNOSWAP:
        case UNOSWAP_V5:
        case UNISWAP_V3_SWAP:
        case UNISWAP_V3_SWAP_TO:
        case UNISWAP_V3_SWAP_TO_WITH_PERMIT:
        case UNOSWAP_TO_WITH_PERMIT_V5:
        case UNOSWAP_WITH_PERMIT:
        case CLIPPER_SWAP:
        case CLIPPER_SWAP_V5:
        case CLIPPER_SWAP_TO_WITH_PERMIT:
        case CLIPPER_SWAP_TO_WITH_PERMIT_V5:
            strlcpy(msg->title, "Send", msg->titleLength);
            break;
        case FILL_ORDER_RFQ:
        case FILL_ORDER_RFQ_V5:
        case FILL_ORDER_RFQ_TO_WITH_PERMIT:
        case FILL_ORDER_RFQ_TO_WITH_PERMIT_V5:
            strlcpy(msg->title, "Making", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            return false;
    }

    // set network ticker (ETH, BNB, etc) if needed
    if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_sent)) {
        strlcpy(context->ticker_sent, msg->network_ticker, sizeof(context->ticker_sent));
    }

    // Convert to string.
    if (!amountToString(context->amount_sent,
                        INT256_LENGTH,
                        context->decimals_sent,
                        context->ticker_sent,
                        msg->msg,
                        msg->msgLength)) {
        return false;
    }
    PRINTF("AMOUNT SENT: %s\n", msg->msg);
    return true;
}

// Set UI for "Receive" screen.
static bool set_receive_ui(ethQueryContractUI_t *msg, one_inch_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP:
        case SWAP_V5:
        case UNOSWAP:
        case UNOSWAP_V5:
        case UNISWAP_V3_SWAP:
        case UNISWAP_V3_SWAP_TO:
        case UNISWAP_V3_SWAP_TO_WITH_PERMIT:
        case UNOSWAP_TO_WITH_PERMIT_V5:
        case UNOSWAP_WITH_PERMIT:
        case CLIPPER_SWAP:
        case CLIPPER_SWAP_V5:
        case CLIPPER_SWAP_TO_WITH_PERMIT:
        case CLIPPER_SWAP_TO_WITH_PERMIT_V5:
            strlcpy(msg->title, "Receive Min", msg->titleLength);
            break;
        case FILL_ORDER_RFQ:
        case FILL_ORDER_RFQ_V5:
        case FILL_ORDER_RFQ_TO_WITH_PERMIT:
        case FILL_ORDER_RFQ_TO_WITH_PERMIT_V5:
            strlcpy(msg->title, "Taking", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            return false;
    }

    // set network ticker (ETH, BNB, etc) if needed
    if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_received)) {
        strlcpy(context->ticker_received, msg->network_ticker, sizeof(context->ticker_received));
    }

    // Convert to string.
    if (!amountToString(context->amount_received,
                        INT256_LENGTH,
                        context->decimals_received,
                        context->ticker_received,
                        msg->msg,
                        msg->msgLength)) {
        return false;
    }
    PRINTF("AMOUNT RECEIVED: %s\n", msg->msg);
    return true;
}

// Set UI for "Beneficiary" screen.
static bool set_beneficiary_ui(ethQueryContractUI_t *msg, one_inch_parameters_t *context) {
    strlcpy(msg->title, "Beneficiary", msg->titleLength);

    msg->msg[0] = '0';
    msg->msg[1] = 'x';

    return getEthAddressStringFromBinary((uint8_t *) context->beneficiary, msg->msg + 2, 0);
}

// Set UI for "Partial fill" screen.
static bool set_partial_fill_ui(ethQueryContractUI_t *msg,
                                one_inch_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "Partial fill", msg->titleLength);
    strlcpy(msg->msg, "Enabled", msg->msgLength);
    return true;
}

// Set UI for "Warning" screen.
static bool set_warning_ui(ethQueryContractUI_t *msg,
                           const one_inch_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "WARNING", msg->titleLength);
    strlcpy(msg->msg, "Unknown token", msg->msgLength);
    return true;
}

// Helper function that returns the enum corresponding to the screen that should be displayed.
static screens_t get_screen(ethQueryContractUI_t *msg,
                            one_inch_parameters_t *context __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    bool token_sent_found = context->tokens_found & TOKEN_SENT_FOUND;
    bool token_received_found = context->tokens_found & TOKEN_RECEIVED_FOUND;

    bool both_tokens_found = token_received_found && token_sent_found;
    bool both_tokens_not_found = !token_received_found && !token_sent_found;

    switch (index) {
        case 0:
            if (both_tokens_found) {
                return SEND_SCREEN;
            } else if (both_tokens_not_found) {
                return WARN_SCREEN;
            } else if (token_sent_found) {
                return SEND_SCREEN;
            } else if (token_received_found) {
                return WARN_SCREEN;
            }
            break;
        case 1:
            if (both_tokens_found) {
                return RECEIVE_SCREEN;
            } else if (both_tokens_not_found) {
                return SEND_SCREEN;
            } else if (token_sent_found) {
                return WARN_SCREEN;
            } else if (token_received_found) {
                return SEND_SCREEN;
            }
            break;
        case 2:
            if (both_tokens_found) {
                return BENEFICIARY_SCREEN;
            } else if (both_tokens_not_found) {
                return WARN_SCREEN;
            } else {
                return RECEIVE_SCREEN;
            }
            break;
        case 3:
            if (both_tokens_found) {
                return PARTIAL_FILL_SCREEN;
            } else if (both_tokens_not_found) {
                return RECEIVE_SCREEN;
            } else {
                return BENEFICIARY_SCREEN;
            }
            break;
        case 4:
            if (both_tokens_found) {
                return ERROR;
            } else if (both_tokens_not_found) {
                return BENEFICIARY_SCREEN;
            } else {
                return PARTIAL_FILL_SCREEN;
            }
            break;
        case 5:
            if (both_tokens_not_found) {
                return PARTIAL_FILL_SCREEN;
            } else {
                return ERROR;
            }
            break;
        default:
            return ERROR;
    }
    return ERROR;
}

void handle_query_contract_ui(ethQueryContractUI_t *msg) {
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    bool ret = false;

    memset(msg->title, 0, msg->titleLength);
    memset(msg->msg, 0, msg->msgLength);
    screens_t screen = get_screen(msg, context);
    switch (screen) {
        case SEND_SCREEN:
            ret = set_send_ui(msg, context);
            break;
        case RECEIVE_SCREEN:
            ret = set_receive_ui(msg, context);
            break;
        case BENEFICIARY_SCREEN:
            ret = set_beneficiary_ui(msg, context);
            break;
        case PARTIAL_FILL_SCREEN:
            ret = set_partial_fill_ui(msg, context);
            break;
        case WARN_SCREEN:
            ret = set_warning_ui(msg, context);
            break;
        default:
            PRINTF("Received an invalid screenIndex\n");
    }
    msg->result = ret ? ETH_PLUGIN_RESULT_OK : ETH_PLUGIN_RESULT_ERROR;
}

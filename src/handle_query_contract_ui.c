#include "one_inch_plugin.h"


// Set UI for the "Send" screen.
static void set_send_ui(ethQueryContractUI_t *msg, one_inch_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP:
        case UNOSWAP:
            strlcpy(msg->title, "Send", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    if (!(context->tokens_found & TOKEN_SENT_FOUND)) {
        strlcpy(msg->msg, "Unknown token", msg->msgLength);
        return;
    }

    // set network ticker (ETH, BNB, etc) if needed
    if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_sent)) {
        strlcpy(context->ticker_sent, msg->network_ticker, sizeof(context->ticker_sent));
    }

    // Convert to string.
    amountToString(context->amount_sent,
                   INT256_LENGTH,
                   context->decimals_sent,
                   context->ticker_sent,
                   msg->msg,
                   msg->msgLength);
    PRINTF("AMOUNT SENT: %s\n", msg->msg);
}

// Set UI for "Receive" screen.
static void set_receive_ui(ethQueryContractUI_t *msg, one_inch_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP:
        case UNOSWAP:
            strlcpy(msg->title, "Receive Min", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    if (!(context->tokens_found & TOKEN_RECEIVED_FOUND)) {
        strlcpy(msg->msg, "Unknown token", msg->msgLength);
        return;
    }

    // set network ticker (ETH, BNB, etc) if needed
    if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_received)) {
        strlcpy(context->ticker_received, msg->network_ticker, sizeof(context->ticker_received));
    }

    // Convert to string.
    amountToString(context->amount_received,
                   INT256_LENGTH,
                   context->decimals_received,
                   context->ticker_received,
                   msg->msg,
                   msg->msgLength);
    PRINTF("AMOUNT RECEIVED: %s\n", msg->msg);
}

// Set UI for "Beneficiary" screen.
static void set_beneficiary_ui(ethQueryContractUI_t *msg, one_inch_parameters_t *context) {
    strlcpy(msg->title, "Beneficiary", msg->titleLength);

    msg->msg[0] = '0';
    msg->msg[1] = 'x';

    getEthAddressStringFromBinary((uint8_t *) context->beneficiary,
                                  msg->msg + 2,
                                  msg->pluginSharedRW->sha3,
                                  0);
}

// Set UI for "Partial fill" screen.
static void set_partial_fill_ui(ethQueryContractUI_t *msg,
                                one_inch_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "Partial fill", msg->titleLength);
    strlcpy(msg->msg, "Enabled", msg->msgLength);
}

// Helper function that returns the enum corresponding to the screen that should be displayed.
static screens_t get_screen(ethQueryContractUI_t *msg,
                            one_inch_parameters_t *context __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    if (index == 0) {
        return SEND_SCREEN;
    } else if (index == 1) {
        return RECEIVE_SCREEN;
    } else if (index == 2) {
        return BENEFICIARY_SCREEN;
    } else if (index == 3) {
        return PARTIAL_FILL_SCREEN;
    }

    return ERROR;
}

void handle_query_contract_ui(void *parameters) {
    ethQueryContractUI_t *msg = (ethQueryContractUI_t *) parameters;
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;

    memset(msg->title, 0, msg->titleLength);
    memset(msg->msg, 0, msg->msgLength);
    msg->result = ETH_PLUGIN_RESULT_OK;

    screens_t screen = get_screen(msg, context);
    switch (screen) {
        case SEND_SCREEN:
            set_send_ui(msg, context);
            break;
        case RECEIVE_SCREEN:
            set_receive_ui(msg, context);
            break;
        case BENEFICIARY_SCREEN:
            set_beneficiary_ui(msg, context);
            break;
        case PARTIAL_FILL_SCREEN:
            set_partial_fill_ui(msg, context);
            break;
        default:
            PRINTF("Received an invalid screenIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

#include "one_inch_plugin.h"

void handle_finalize(ethPluginFinalize_t *msg) {
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    msg->numScreens = 2;
    if (memcmp(context->beneficiary, NULL_ETH_ADDRESS, ADDRESS_LENGTH) != 0) {
        // An additional screen is required to display the `beneficiary` field.
        msg->numScreens += 1;
    }
    if (context->selectorIndex == SWAP || context->selectorIndex == SWAP_V5) {
        // An additional screen is required to display the partial fill field.
        msg->numScreens += 1;
    }
    if (!ADDRESS_IS_NETWORK_TOKEN(context->contract_address_sent)) {
        // Address is not network token (0xeee...) so we will need to look up the token in the
        // CAL.
        printf_hex_array("Setting address sent to: ",
                         ADDRESS_LENGTH,
                         context->contract_address_sent);
        msg->tokenLookup1 = context->contract_address_sent;
    } else {
        sent_network_token(context);
        msg->tokenLookup1 = NULL;
    }
    if (!ADDRESS_IS_NETWORK_TOKEN(context->contract_address_received)) {
        // Address is not network token (0xeee...) so we will need to look up the token in the
        // CAL.
        printf_hex_array("Setting address received to: ",
                         ADDRESS_LENGTH,
                         context->contract_address_received);
        msg->tokenLookup2 = context->contract_address_received;
    } else {
        received_network_token(context);
        msg->tokenLookup2 = NULL;
    }

    msg->uiType = ETH_UI_TYPE_GENERIC;
    msg->result = ETH_PLUGIN_RESULT_OK;
}

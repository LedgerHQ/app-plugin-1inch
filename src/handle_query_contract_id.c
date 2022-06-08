#include "one_inch_plugin.h"

void handle_query_contract_id(void *parameters) {
    ethQueryContractID_t *msg = (ethQueryContractID_t *) parameters;
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;

    strlcpy(msg->name, PLUGIN_NAME, msg->nameLength);

    switch (context->selectorIndex) {
        case SWAP:
            strlcpy(msg->version, "Swap", msg->versionLength);
            break;
        case UNOSWAP:
            strlcpy(msg->version, "Unoswap", msg->versionLength);
            break;
        case UNISWAP_V3_SWAP:
            strlcpy(msg->version, "Uniswap V3 Swap", msg->versionLength);
            break;
        case UNISWAP_V3_SWAP_TO:
            strlcpy(msg->version, "Uniswap V3 Swap To", msg->versionLength);
            break;
        case UNISWAP_V3_SWAP_TO_WITH_PERMIT:
            strlcpy(msg->version, "Uniswap V3 Swap To With Permit", msg->versionLength);
            break;
        case UNOSWAP_WITH_PERMIT:
            strlcpy(msg->version, "Unoswap With Permit", msg->versionLength);
            break;
        case CLIPPER_SWAP:
            strlcpy(msg->version, "Clipper Swap", msg->versionLength);
            break;
        case CLIPPER_SWAP_TO_WITH_PERMIT:
            strlcpy(msg->version, "Clipper Swap To With Permit", msg->versionLength);
            break;
        case FILL_ORDER_RFQ:
            strlcpy(msg->version, "Fill Order RFQ", msg->versionLength);
            break;
        case FILL_ORDER_RFQ_TO_WITH_PERMIT:
            strlcpy(msg->version, "Fill Order RFQ To With Permit", msg->versionLength);
            break;
        default:
            PRINTF("Selector Index :%d not supported\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}
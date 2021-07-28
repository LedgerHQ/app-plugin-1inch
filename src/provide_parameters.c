#include "one_inch_plugin.h"

void printf_hex_array(const char* title __attribute__((unused)), int len __attribute__((unused)), const uint8_t* data __attribute__((unused))){
    PRINTF(title);
    for(int i = 0; i < len; ++i){
        PRINTF("%02x", data[i]);
    };
    PRINTF("\n");
}

// Store the amount sent in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_sent(ethPluginProvideParameter_t *msg, one_inch_parameters_t *context) {
    memset(context->amount_sent, 0, sizeof(context->amount_sent));

    // Convert to string.
    amountToString(msg->parameter,
                   PARAMETER_LENGTH,
                   0,
                   "",
                   (char *) context->amount_sent,
                   sizeof(context->amount_sent));
    PRINTF("AMOUNT SENT: %s\n", context->amount_sent);
}

// Store the amount received in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_received(ethPluginProvideParameter_t *msg,
                                   one_inch_parameters_t *context) {
    memset(context->amount_received, 0, sizeof(context->amount_received));

    // Convert to string.
    amountToString(msg->parameter,
                   PARAMETER_LENGTH,
                   0,   // No decimals
                   "",  // No ticker
                   (char *) context->amount_received,
                   sizeof(context->amount_received));
    PRINTF("AMOUNT RECEIVED: %s\n", context->amount_received);
}

static void handle_beneficiary(ethPluginProvideParameter_t *msg, one_inch_parameters_t *context) {
    memset(context->beneficiary, 0, sizeof(context->beneficiary));
    memcpy(context->beneficiary,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           sizeof(context->beneficiary));
    printf_hex_array("BENEFICIARY: ", ADDRESS_LENGTH, context->beneficiary);
}

static void handle_token_sent(ethPluginProvideParameter_t *msg, one_inch_parameters_t *context) {
    memset(context->contract_address_sent, 0, sizeof(context->contract_address_sent));
    memcpy(context->contract_address_sent,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           sizeof(context->contract_address_sent));
    printf_hex_array("TOKEN SENT: ", ADDRESS_LENGTH, context->contract_address_sent);
}

static void handle_token_received(ethPluginProvideParameter_t *msg,
                                  one_inch_parameters_t *context) {
    memset(context->contract_address_received, 0, sizeof(context->contract_address_received));
    memcpy(context->contract_address_received,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           sizeof(context->contract_address_received));
    printf_hex_array("TOKEN RECEIVED: ", ADDRESS_LENGTH, context->contract_address_received);
}

static void handle_flags(ethPluginProvideParameter_t *msg,
                                  one_inch_parameters_t *context) {
    context->flags = msg->parameter[PARAMETER_LENGTH - 1];
}

static void handle_swap(ethPluginProvideParameter_t *msg, one_inch_parameters_t *context) {
    switch (context->next_param) {
        case TOKEN_SENT:  // fromToken
            handle_token_sent(msg, context);
            context->next_param = TOKEN_RECEIVED;
            break;
        case TOKEN_RECEIVED:  // toToken
            handle_token_received(msg, context);
            context->next_param = SRC_RECEIVER;
            break;
        case SRC_RECEIVER:  // srcReceiver
            context->next_param = DST_RECEIVER;
            break;
        case DST_RECEIVER:  // dstReceiver
            handle_beneficiary(msg, context);
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:  // fromAmount
            handle_amount_sent(msg, context);
            context->next_param = AMOUNT_RECEIVED;
            break;
        case AMOUNT_RECEIVED:  // toAmount
            handle_amount_received(msg, context);
            context->next_param = FLAGS_PARAM;
            break;
        case FLAGS_PARAM:
            handle_flags(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

static void handle_unoswap(ethPluginProvideParameter_t *msg, one_inch_parameters_t *context) {
    switch (context->next_param) {
        case TOKEN_SENT:  // fromToken
            handle_token_sent(msg, context);
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:  // fromAmount
            handle_amount_sent(msg, context);
            context->next_param = AMOUNT_RECEIVED;
            break;
        case AMOUNT_RECEIVED:  // toAmount
            handle_amount_received(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

void handle_provide_parameter(void *parameters) {
    ethPluginProvideParameter_t *msg = (ethPluginProvideParameter_t *) parameters;
    one_inch_parameters_t *context = (one_inch_parameters_t *) msg->pluginContext;
    printf_hex_array("eth2 plugin provide parameter: ", PARAMETER_LENGTH, msg->parameter);

    msg->result = ETH_PLUGIN_RESULT_OK;

    if (context->skip) {
        // Skip this step, and don't forget to decrease skipping counter.
        context->skip--;
    } else {
        if ((context->offset) && msg->parameterOffset != context->checkpoint + context->offset) {
            PRINTF("offset: %d, checkpoint: %d, parameterOffset: %d\n",
                   context->offset,
                   context->checkpoint,
                   msg->parameterOffset);
            return;
        }

        context->offset = 0;  // Reset offset
        switch (context->selectorIndex) {
            case UNOSWAP: {
                handle_unoswap(msg, context);
                break;
            }

            case SWAP: {
                handle_swap(msg, context);
                break;
            }

            default:
                PRINTF("Selector Index %d not supported\n", context->selectorIndex);
                msg->result = ETH_PLUGIN_RESULT_ERROR;
                break;
        }
    }
}
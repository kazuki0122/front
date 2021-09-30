import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
import { Box } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  }, 
  // 郵便番号非表示
  hidePostalCode: true
};
const CardSection = () => {
  return (
    <FormControl isRequired>
      <FormLabel>カード情報</FormLabel>
        <Box borderWidth={1} padding={3} borderRadius={5}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Box>
    </FormControl>
  );
};
export default CardSection;
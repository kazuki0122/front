import React from 'react';
import {useStripe} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { Button } from '@chakra-ui/button';
import { Box, Stack } from '@chakra-ui/layout';
import useRegisterCard from 'hooks/card/useRegisterCard';


export default function CardSetupForm() {
  const stripe = useStripe();
  const {registerCard} = useRegisterCard()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => await registerCard(e)
  
  return (
    <Box mx={'auto'} maxW={'xl'} py={12} px={6} boxShadow={'xl'}>
      <CardSection />
      <Stack>
        <Button 
          mt={5}
          onClick={handleSubmit} 
          disabled={!stripe}
          >
          保存する
        </Button>
      </Stack>
    </Box>
  );
}
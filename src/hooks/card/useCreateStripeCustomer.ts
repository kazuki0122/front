import { useCallback } from 'react';
import { createCustomer } from "api/card/card"

const useCreateStripeCustomer =  () => {
  const createStripeCustomer = useCallback(async () => {
    await createCustomer()
    .then((res) => {
      console.log('顧客情報',res.data.data);
    })
  },[])
  return { createStripeCustomer }
}

export default useCreateStripeCustomer

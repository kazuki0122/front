import {useContext} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { createCards, createCustomer } from 'api/card/card';
import { AuthContext } from 'App';
import useMessage from 'hooks/info/useMessage';
import { useHistory } from 'react-router';

const useRegisterCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history =  useHistory()
  const {showMessage} = useMessage()
  const { setLoading } = useContext(AuthContext)

  const registerCard = async (name: string, email:string) => {
    // e.preventDefault();
    
    await createCustomer()
    .then( async (res) => {
      console.log('顧客情報',res.data.data);
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      if (!stripe || !elements) return;
      console.log('clientSecret',res.data.data.clientSecret);

      console.log('elements',elements.getElement(CardElement));

      const result = await stripe.confirmCardSetup( res.data.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name,
            email: email
          },
        }
      });
      if (result.error) {
        console.log(result.error);
      } else {
        // The setup has succeeded. Display a success message and send
        // result.setupIntent.payment_method to your server to save the
        // card to a Customer
        const params = { 
          paymentMethod: result.setupIntent.payment_method
        }
        createCards(params)
        setLoading(false)
        console.log('カード情報',result);
        history.push("/")
        showMessage({title: 'ユーザー登録が完了しました', status: 'success'})
      }
    })

  }
  return {registerCard}
}

export default useRegisterCard

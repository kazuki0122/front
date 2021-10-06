import { BellIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/layout'
import useFetchRules from 'hooks/group/useFetchRules'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'

const GroupDetail = () => {
  const { id } = useParams()
  const [time, setTime] = useState('')
  const [billingAmount, setBillingAmount] = useState('')
  const {fetchRules} = useFetchRules()

  useEffect(() => fetchRules(id,setTime,setBillingAmount),[fetchRules, id])

  return (
    <>
      {
        time !== '' && billingAmount !== '' ? 
          <Text
            fontSize="xl" 
            textAlign='center' 
            size='xl' 
            mx={'auto'} 
            maxW={'xl'} 
            py={12} 
            px={6}
            boxShadow={'xl'}
          >
            <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
            設定された課金額は{billingAmount}円です。<br/>{time}に起きましょう！
          </Text>
        : <Text 
            textAlign='center' 
            size='xl' 
            mx={'auto'} 
            maxW={'xl'}     
            py={12} e
            px={6}
            boxShadow={'xl'}
          >
            <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
            目覚ましを設定しましょう!
          </Text>
      }
    </>
  )
}

export default GroupDetail

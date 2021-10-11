import { Button } from '@chakra-ui/button'
import { BellIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import useFetchResult from 'hooks/group/useFetchResult'
import useFetchRules from 'hooks/group/useFetchRules'
import { User } from 'interfaces'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

const Detail = () => {
  const { id } = useParams()
  const [time, setTime] = useState('')
  const [billingAmount, setBillingAmount] = useState('')
  const {fetchRules, ruleExist} = useFetchRules()
  const {fetchResult, boolean, userData, dataExist} = useFetchResult()
  const history =  useHistory()


  useEffect(() => {
    fetchRules(id,setTime,setBillingAmount)
  },[fetchRules, id])

  useEffect(() => {
    fetchResult(id)
  },[fetchResult,id])

  const handleClick = async() => {
    await fetchResult(id)
    await fetchRules(id,setTime,setBillingAmount)
  }
  const moveGroupPage = () => history.push(`/group/${id}`)

  return (
    <>
      <Flex
        mx={'auto'} 
        mt={3}
        maxW={'xl'} 
        justify='center'
      >
        <Button 
          onClick={handleClick}
          color={'white'}
          mr='5'
          backgroundColor='#63B3ED'
          _hover={{
            bg: '#4299E1',
          }}
        >
          結果を取得
        </Button>
        <Button onClick={moveGroupPage}>
          グループ画面に戻る
        </Button>
      </Flex>
      <Heading mt={8} align={'center'} fontSize={'2xl'}>設定時間</Heading>
      <Box
        fontSize="xl" 
        textAlign='center' 
        size='xl' 
        mx={'auto'} 
        maxW={'xl'} 
        py={12} 
        px={6}
        boxShadow={'xl'}
      >
        {
          ruleExist === true ?
            time !== '' && billingAmount !== '' ? 
                <Text>
                  <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
                  設定された課金額は{billingAmount}円です。<br/>{time}に起きましょう！
                </Text>
              : <Text>
                  <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
                  起きる時間と罰金額を設定しましょう!
                </Text>
            : 
            <Text>
                <BellIcon  w={8} h={8} color='#ECC94B' /><br/>
                起きる時間と罰金額を設定しましょう!
            </Text>
        }
      </Box>
      <Heading mt={8} align={'center'} fontSize={'2xl'}>前回の結果</Heading>
      <Box
        fontSize="xl" 
        textAlign='center' 
        size='xl' 
        mx={'auto'} 
        maxW={'xl'} 
        py={12} 
        px={6}
        boxShadow={'xl'}
      >
      {
        dataExist === true ?
          boolean === true ?
          <Box 
            mx={'auto'} 
            maxW={'xl'}
            textAlign="center"
          >
            前回は課金が発生しませんでした！
          </Box>
          :
          userData.map((user: User) => (
            <Box
              mx={'auto'} 
              maxW={'xl'}
              textAlign="center"
            >
              {`${user.name}さんが起きれなかったので課金されました。`}
            </Box>
          ))
          : 
          <Box>まだデータが存在しません。</Box>
        }
      </Box>
    </>
  )
}

export default Detail

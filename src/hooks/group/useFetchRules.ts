import { fetchRulesData } from "api/group/rule"
import { useCallback, useState } from "react";

const useFetchRules = () => {
  const [ruleExist, setRuleExist] = useState()
  const fetchRules = useCallback( async (id: number, setTime: React.Dispatch<React.SetStateAction<string>>,setBillingAmount: React.Dispatch<React.SetStateAction<string>>) => {
    await fetchRulesData(id)
    .then((res) => {
      // console.log( '取得してきたルール',res.data.data[0]);
      // console.log( '取得した起きる時間',res.data.wakeupTime);
      // console.log( '取得した金額',res.data.amount);
      setTime(res.data.wakeupTime)
      setBillingAmount(res.data.amount)
      setRuleExist(res.data.ruleExist)
      console.log('ルールがあるかどうか？',res.data.ruleExist);
    })
  },[])
  return {fetchRules, ruleExist}
}

export default useFetchRules

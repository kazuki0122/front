import { createRulesData } from "api/group/rule"
import { RuleParams } from "types/rule"

const useCreateRules = () => {
  const createRules = (params: RuleParams,setTime: React.Dispatch<React.SetStateAction<string>>,setBillingAmount: React.Dispatch<React.SetStateAction<string>>) => {
    createRulesData(params)
    .then((res) => {
       console.log(res.data.data);
       setTime(res.data.wakeupTime)
       setBillingAmount(res.data.amount)
    })
  }
  return {createRules}
}

export default useCreateRules
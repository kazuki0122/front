import { useToast } from "@chakra-ui/toast";

type Props = {
  title: string;
  status: 'success' | 'error';
}
const useMessage = () => {
  const toast = useToast();
  
  const showMessage = (props: Props) => {
    const { title, status} = props;
    toast({
      title: title,
      status: status,
      duration: 2000,
      isClosable: false,
    })
  }
  return {showMessage};
}

export default useMessage
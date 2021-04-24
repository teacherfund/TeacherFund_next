import { Input } from '@chakra-ui/react'

const TextInput = ({ id, type, register, ...props }) => (
  <Input
    id={id}
    type={type}
    backgroundColor='tf-dark-gray'
    borderRadius='10px'
    ref={register}
    {...props}
  />
)

export default TextInput

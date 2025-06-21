import { Input, useRecipe } from '@chakra-ui/react'

const TextInput = ({ id, type, register, ...props }) => {
  const recipe = useRecipe({ key: 'input' })
  const styles = recipe()
  return (
    <Input
      id={id}
      type={type}
      backgroundColor='tf-dark-gray'
      borderRadius='10px'
      ref={register}
      css={styles.field}
      className='tf-lato'
      {...props}
    />
  )
}

export default TextInput

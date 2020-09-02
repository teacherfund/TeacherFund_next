import {
  Box,
  Text,
  Link
} from '@chakra-ui/core'

const ContactForm = () => {
  return (
    <Box aria-atomic='true'>
      <Text>
        You can email us directly at{' '}
        <Link
          href='mailto:joelwass@theteacherfund.com'
          color='blue'
        >
          joelwass @ theteacherfund.com
        </Link>
      </Text>
    </Box>
  )
}

export default ContactForm

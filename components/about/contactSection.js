import { Box, Text } from '@chakra-ui/react'

import Card from '../card'
import ContactForm from './contactForm'

const ContactSection = ({ contactPage, hideHeading, ...props }) => {
  return (
    <Box
      as='section'
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      {...props}
    >
      <Box align='center' fontSize='28px' paddingBottom='2rem'>
        <h1>Contact Us</h1>
      </Box>
      <Card width='100%' maxWidth='45rem'>
        <Text
          textTransform='uppercase'
          textAlign={{ base: 'center', lg: 'left' }}
          color='ocean'
          fontWeight='bold'
          fontSize='0.875rem'
          marginBottom='2.5rem'
        >
          <Box as='span' display={{ base: 'block', md: 'inline-block' }}>
            Want to get in touch?{' '}
          </Box>
          <Box as='span'> Drop us a line.</Box>
        </Text>
        <ContactForm />
      </Card>
    </Box>
  )
}

export default ContactSection

import { Box, Text } from '@chakra-ui/react'

import PageWrapper from '../components/pageWrapper'
import Card from '../components/card'
import ContactForm from '../components/contactForm'

const Contact = () => (
  <PageWrapper title='Contact Us'>
    <Box
      as='section'
      display='flex'
      justifyItems='center'
      flexDirection='column'
      alignItems='center'
      padding={{ base: '3rem 1.5rem', lg: '6rem 7.5rem' }}
      backgroundColor='gray.50'
      minHeight='90vh'
    >
      <Card width='100%' maxWidth='45rem'>
        <Box align='center' fontSize='28px' paddingBottom='2rem'>
          <Text fontWeight='medium' as='h3' textAlign='center'>
            Contact Us
          </Text>
          <Text
            textTransform='uppercase'
            textAlign='center'
            color='ocean'
            fontSize='0.875rem'
            marginBottom='2.5rem'
            marginTop='0.5rem'
          >
            <Box as='span' display={{ base: 'block', md: 'inline-block' }}>
              Want to get in touch?{' '}
            </Box>
            <Box as='span'> Drop us a line.</Box>
          </Text>
        </Box>
        <ContactForm />
      </Card>
    </Box>
  </PageWrapper>
)

export default Contact

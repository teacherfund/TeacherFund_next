import PageWrapper from '../components/pageWrapper'
// TODO: move this to common?
import ContactSection from '../components/about/contactSection'

const Contact = () => (
  <PageWrapper title='Contact Us'>
    <ContactSection backgroundColor='gray.50' contactPage height='100vh' />
  </PageWrapper>
)

export default Contact

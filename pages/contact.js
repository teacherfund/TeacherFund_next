import PageWrapper from '../components/pageWrapper'
// TODO: move this to common?
import ContactSection from '../components/about/contactSection'
import '../public/styles/partials/contactform.scss'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '15px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const Contact = () => (
  <PageWrapper title='Contact Us'>
    <AlertProvider template={AlertTemplate} {...options}>
      <ContactSection backgroundColor='gray.50' />
    </AlertProvider>
  </PageWrapper>
)

export default Contact

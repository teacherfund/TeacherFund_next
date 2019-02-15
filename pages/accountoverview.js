import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import '../static/styles/main.scss'

const Accountoverview = () => (
  <div className='main-container'>
    <Nav />
    <Head title='Account' />

    <div className='body'>
      <h1>Account Overview</h1>
      <div className='description' />
    </div>
    <Footer />
  </div>
)

export default Accountoverview

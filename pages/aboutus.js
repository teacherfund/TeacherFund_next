import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import '../static/styles/main.scss'

const employees = [
  { picture: '/', name: 'Joel Wasserman', description: '' },
  { picture: '/', name: 'Christine Woeller', description: '' },
  { picture: '/', name: 'Peter Squicciarini', description: '' }
]

const About = () => (
  <div className='main-container'>
    <Nav navColor='black' />
    <Head title='About' />

    <div className='body aboutusBody'>
      <div className='mission'>
        <div className='mission--header'>
          Our Mission
        </div>
        <div className='mission--body'>
          The Teacher Fund is a non-profit organization
          bringing school supplies and supplemental
          funding to public school teachers.
        </div>
      </div>
      <div className='factcards'>
        <div className='factcard--container'>
          <div className='factcard--fact--image' />
          <div className='factcard--fact--title'>
            <h3>We prove every project</h3>
          </div>
          <div className='factcard--fact--text'>
            <p className='p40'>
              We track every dollar spent and received, and show
              the projects you fund with photos and GPS.
            </p>
          </div>
        </div>
        <div className='factcard--container'>
          <div className='factcard--fact--image' />
          <div className='factcard--fact--title'>
            <h3>We're an open book</h3>
          </div>
          <div className='factcard--fact--text'>
            <p className='p40'>
              View our cash inflows and outflows down to the
              penny, at any time. We welcome audits! No more donating into a black box.
            </p>
          </div>
        </div>
        <div className='factcard--container'>
          <div className='factcard--fact--image' />
          <div className='factcard--fact--title'>
            <h3>100% goes into the field</h3>
          </div>
          <div className='factcard--fact--text'>
            <p className='p40'>
              Private donors cover our operating costs so 100%
              of your money goes towards public school education.
            </p>
          </div>
        </div>
      </div>
      <div className='us'>
        <div className='title' />
        <div className='employee--container'>
          {employees.map(({ image, name, description }) => (
            <div key={name}>
              <div className='employee--image' />
              <div className='employee--name' />
              <div className='employee--description' />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
  </div>
)

export default About

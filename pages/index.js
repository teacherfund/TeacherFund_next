import { Component } from 'react'
import Link from 'next/link'
import Nav from '../components/nav'
import Head from '../components/head'
import Team from '../components/team'
import { formatCurrency } from '../utils/formatting'

import * as Api from '../api/api'

class IndexPage extends Component {
  constructor (props) {
    super(props)

    // Fetch current year for footer
    const currentYear = new Date().getFullYear()

    this.fetchStats()

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      error: '',
      subscribed: false,
      currentYear
    }
  }

  async fetchStats () {
    try {
      await this.props.helpers.fetchGlobalStats()
    } catch (e) {
      // Do something with dollars donated, not sure what yet
    }
  }

  subscribe = async (ev) => {
    ev.preventDefault()

    if (!this.state.email) return this.setLocalState({ error: 'Email is required' })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)) return this.setLocalState({ error: 'Please enter a valid email address' })

    const firstName = this.state.firstName
    const lastName = this.state.lastName

    // Make api call to subscribe
    const reqBody = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: this.state.email
    }
    try {
      const responseStream = await Api.subscribe(reqBody)
      const response = await responseStream.json()

      // If error, prompt to try again
      if (!response.ok) return this.setLocalState({ error: 'Whoops, please try again' })

      // Reset form and notify user of success
      this.setLocalState({
        firstName: '',
        lastName: '',
        email: '',
        subscribed: true
      })
    } catch (e) {
      console.error(e)
    }
  }

  setLocalState = (state) => {
    if (!state.error) state.error = ''
    this.setState(state)
  }

  updateFirstName = (e) => {
    this.setLocalState({ firstName: e.target.value })
  }

  updateLastName = (e) => {
    this.setLocalState({ lastName: e.target.value })
  }

  updateEmail = (e) => {
    this.setLocalState({ email: e.target.value })
  }

  render () {
    return (
      <main className='bg-white index tf-dark-gray'>
        <Head title='The Teacher Fund' />
        <section className='index__nav'>
          <Nav />
        </section>
        <section className='index__header h-section pv7 ph2 pr7-l cover-l'>
          <div className='fr flex flex-column mt5 mt0-l w-90-m'>
            <div className='white f2 tf-oswald fl ml-4-l f-5-l'>
              Funding Teachers.<br />
              Empowering Students.
            </div>
            <div className='ts-subtext fl tf-lato-lite white'>
              <p>We provide funding to classrooms so teachers don't have to.</p>
            </div>
          </div>
        </section>
        <section className='h-section ph2 pt4 pt6-l'>
          <div className='tf-lato-lite ts-subtext w-auto m-auto center-l tc ph3 ph5-m pb4-m ph0-l w-50-l'>
            <p className='lh-copy ma0 f4 f3-ns mb4'>
              We believe that by providing funding to public school teachers,
              we can support exemplary teaching, increase retention,
              and impact student success.
            </p>
          </div>
          <div className='w-90 w-70-l w-80-m ba bw1 mh-auto mt3 mt5-l border-tf-teal white'>
            <div className='flex flex-column flex-row-ns bg-tf-teal w-94 tf-lato-lite pa2 pa4-l pa3-m'>
              <div className='mv-auto fl ph1 ph3-m ts-title w4-ns tl-ns tc'>
                <p className='pa0 ma0 f2 f1-ns ml3 ml0-ns'>94%</p>
              </div>
              <div className='m-auto tf-lato-lite f4 f3-l pl6-m f5-m'>
                <p className='pa0 ma0 dn db-ns'>Amount of public school teachers spend their own money on school supplies</p>
              </div>
            </div>
          </div>
          <div className='w-90 mh-auto dn-ns tc tf-lato-lite'>
            <p className=''>Amount of public school teachers who spend their own money on school supplies</p>
          </div>
          <div className='w-90 w-70-l w-80-m ba bw1 mh-auto mt3 border-tf-pink white bg-tf-pink'>
            <div className='flex flex-column flex-row-ns w-94 tf-lato-lite pa2 pa4-l pa3-m'>
              <div className='mv-auto fl ph1 ph3-m ts-title w4-ns tl-ns tc'>
                <p className='pa0 ma0 f2 f1-ns ml3 ml0-ns'>100%</p>
              </div>
              <div className='m-auto tf-lato-lite f4 f3-l pl6-m f5-m'>
                <p className='pa0 ma0 dn db-ns'>How much of your donation goes to providing resources for classrooms in need.</p>
              </div>
            </div>
          </div>
          <div className='w-90 mh-auto dn-ns tc tf-lato-lite'>
            <p>How much of your donation goes directly to providing resources for classrooms in need.</p>
          </div>
        </section>
        <section className='index__provide h-section bg-trans-gray flex justify-center items-center relative'>
          <div className='bg-transparent pa3-m pa5-l z-1 w-30-m w-30-l index__provide-content absolute lh-title'>
            <h2 className='ma0 tf-oswald f2-l f3 pv3 tc tl-ns'>
              What We Provide
            </h2>
            <p className='tf-lato-lite ma0 f4-l f5 tl-ns tc pa1 pa0-ns'>
              We support teachers in need of everything from the most basic of
              classroom supplies to extracurricular and after-school funding and equipment.
            </p>
          </div>
          <img className='index__provide-image' src='/static/images/children-class-classroom.png' alt='art classroom' />
        </section>
        <section className='h-section'>
          <div className='flex flex-column mt3 pt5-l pb4 pb0-ns'>
            <div className='f3 f2-l mb3-m tf-oswald center'>
              Our Process
            </div>
            <div className='flex flex-row flex-wrap justify-center w-auto mt2 mt5-l center ph3 ph0-ns'>
              <div className='ma3 ma3-m w-25-m w-25-l'>
                <div className='w-100 pa3 pt3-m bg-card h5-25'>
                  <div className='pa2 tc'>
                    <div className='center br-100 pa2-m pa4 ba b--black-05 mb2 ma3-m h4 h3-m w4 w3-m bg-white'>
                      <img src='/static/images/Mortarboard_icon.png' className='contain' title='Icon of graduation cap' />
                    </div>
                    <div className='tf-oswald f3-l f4 pv2 tc'>
                      Quality Teachers
                    </div>
                    <div className='tf-lato-lite f3-l pt2 tc f5-m lh-title'>
                      We fund dedicated teachers working diligently to improve their
                      classrooms and their students’ education.
                    </div>
                  </div>
                </div>
              </div>
              <div className='ma3 ma3-m w-25-m w-25-l'>
                <div className='w-100 pa3 pt3-m bg-card h5-25'>
                  <div className='pa2 tc'>
                    <div className='center br-100 pa4 pa2-m ba b--black-05 mb2 ma3-m h4 h3-m w4 w3-m bg-white'>
                      <img src='/static/images/School_icon.png' className='contain' title='Icon of school' />
                    </div>
                    <div className='tf-oswald f3-l f4 pv2 tc'>
                      Local Schools
                    </div>
                    <div className='tf-lato-lite f3-l pt2 tc f5-m lh-title'>
                      Partnering with nearby schools ensures we are providing exactly what
                      their teachers and students need.
                    </div>
                  </div>
                </div>
              </div>
              <div className='ma3 ma3-m w-25-m w-25-l'>
                <div className='w-100 pa3 pt3-m bg-card h5-25'>
                  <div className='pa2 tc'>
                    <div className='center br-100 pa4 pa2-m ba b--black-05 mb2 ma3-m h4 h3-m w4 w3-m bg-white'>
                      <img src='/static/images/Hand_icon.png' className='contain' title='Icon of hand holding money cap' />
                    </div>
                    <div className='tf-oswald f3-l f4 pv2 tc'>
                      Tangible Impact
                    </div>
                    <div className='tf-lato-lite f3-l f5-m pt2 tc lh-title'>
                      We monitor each dollar donated so you can see the direct
                      impact your donation has on these classrooms.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='h-section bg-tf-teal pt5-l'>
          <div className='flex flex-column pv3 pv0-l'>
            <div className='f2-l f3 tf-oswald white tc mb5-l mv4'>
              See How We're Doing
            </div>
            <div className='center pa2 pv0-ns flex flex-column'>
              <div className='index__metrics mb4-m'>
                <div className='index__metric border-tf-yellow' aria-label='Amount of money raised for teachers'>
                  <div className='tf-lato ts-title center'>
                    ${formatCurrency(this.props.context.globalAmountDonated) || 0}
                  </div>
                  <div className='pt2 tf-lato-lite ts-subtext center'>
                    Raised
                  </div>
                </div>
                <div className='index__metric border-tf-pink' aria-label='Number of teachers funded by TeacherFund'>
                  <div className='tf-lato ts-title center'>
                    3
                  </div>
                  <div className='pt2 tf-lato-lite ts-subtext center'>
                    Teachers Funded
                  </div>
                </div>
                <div className='index__metric border-tf-dark-gray' aria-label='Number of schools partenered with TeacherFund'>
                  <div className='tf-lato ts-title center'>
                    2
                  </div>
                  <div className='pt2 tf-lato-lite ts-subtext center'>
                    Partner Schools
                  </div>
                </div>
                <div className='index__metric border-tf-gray' aria-label='Number of students impacted by TeacherFund'>
                  <div className='tf-lato ts-title center'>
                    450
                  </div>
                  <div className='pt2 tf-lato-lite ts-subtext center'>
                    Students Impacted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='h-section pt4 pt0-ns'>
          <div className='flex flex-column pt4-ns pt6-l'>
            <div className='f2-l f3 tf-oswald center mb3 mb4-l'>
              Get Involved
            </div>
            <div className='flex flex-row flex-wrap justify-center w-auto mt3-m center'>
              <div className='pa2 pa4-ns w-40-m w-33-l w-80 bg-card h5-5-ns ma3'>
                <div className='w-100 pa2'>
                  <div className='pa2 tc'>
                    <div className='tf-lato f3 pv2 tc'>
                      Fund Teachers
                    </div>
                    <div className='tf-lato-lite f3-l f5 pt2 tc h4-m lh-title'>
                      Because private donors cover our operating costs, you can give knowing your whole gift
                      will go toward helping equip teachers and students with the supplies they need to be successful.
                    </div>
                  </div>
                  <div className='db center w-auto pv4 pb0-ns ph4 tc pointer'>
                    <Link href='/donate'>
                      <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-yellow w-80 m-auto'>Donate</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className='pa2 pa4-ns w-40-m w-33-l w-80 bg-card h5-5-ns ma3'>
                <div className='w-100 pa2'>
                  <div className='pa2 tc'>
                    <div className='tf-lato f3 pv2 tc'>
                      Volunteer
                    </div>
                    <div className='tf-lato-lite f3-l f5 pt2 tc h4-m lh-title'>
                      Interested in helping us? We’re looking for a web designer, non-profit
                      lawyer, and boots-on-the-ground volunteers to help handout supplies
                      and build teacher relationships.
                    </div>
                  </div>
                  <div className='db center w-auto pv4 pb0-ns ph4 tc pointer'>
                    <a className='white no-underline pa3 db br-pill tf-lato b v-mid bg-tf-pink w-80 m-auto'
                      href='mailto:joelwass@theteacherfund.com?subject=Application'>
                       Apply Today
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Team />
        <section className='h-footer bg-tf-dark-gray'>
          <div className='flex flex-column m-auto w-20-l w-40-m w-75 tc'>
            <div className='white pt4 mb2 tf-oswald ts-subtext'>
              <h3 className='ma0 pa0 '>Let's Keep in Touch</h3>
            </div>
            <div className='pt2'>
              <div className=''>
                <p className='center pb1 pt1 mv0 white tf-lato' aria-live='assertive'>{this.state.subscribed && "You're in the loop!"}</p>
              </div>
              {!this.state.subscribed &&
                <form onSubmit={this.subscribe}>
                  <div className='mt2 m-auto'>
                    <input placeholder='First Name' className='w-100 bn pa3 mv2' value={this.state.firstName} onChange={this.updateFirstName} aria-label='First Name' />
                  </div>
                  <div className='mt2 m-auto'>
                    <input placeholder='Last Name' className='w-100 bn pa3 mv2' value={this.state.lastName} onChange={this.updateLastName} aria-label='Last Name' />
                  </div>
                  <div className='m-auto pb3'>
                    <input type='email' placeholder='Email Address' className='w-100 bn pa3 mv2' value={this.state.email} onChange={this.updateEmail} aria-label='Email' aria-required='true' />
                  </div>
                  <div className='mb3 red tf-lato' aria-live='assertive'>
                    {this.state.error}
                  </div>
                  <button className='white no-underline pa3 db br-pill tf-lato bn v-mid bg-tf-yellow w-40 m-auto'>
                      Submit
                  </button>
                </form>
              }
            </div>
            <div className='pt4 center white m-auto tf-lato-lite'>
              <p>The Teacher Fund is 501(c)(3) pending</p>
              <p>EIN: 83-2285506</p>
              <p>&copy; Copyright {this.state.currentYear}</p>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default IndexPage

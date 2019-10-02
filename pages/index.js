import { Component } from 'react'
import Link from 'next/link'
import Nav from '../components/nav'
import Head from '../components/head'
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

  subscribe = async () => {
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
      <div className='bg-white index tf-dark-gray'>
        <Head />
        <section className='index__nav'>
          <Nav />
        </section>
        <main>
          <section className='index__header h-section pv6 pv7-ns ph2 pr7-ns cover-l'>
            <div className='fr flex flex-column mt6 mt0-ns'>
              <div className='white ts-title tf-oswald fl'>
              Funding Teachers.<br />
              Empowering Students.
              </div>
              <div className='ts-subtext fl tf-lato-lite white'>
                <p>We provide funding to classrooms so teachers don't have to.</p>
              </div>
            </div>
          </section>
          <section className='h-section ph2 pt3 pt6-l'>
            <div className='tf-lato-lite ts-subtext w-auto m-auto center-l tc ph3 ph0-l w-50-l'>
              <p className='lh-copy ma0'>
              We believe that by providing funding to public school teachers,
              we can support exemplary teaching, increase retention,
              and impact student success.
              </p>
            </div>
            <div className='w-90 w-70-ns ba bw1 mh-auto mt3 mt5-l border-tf-teal white'>
              <div className='flex flex-column flex-row-ns w-94 bg-tf-teal tf-lato-lite pa2 pa4-ns'>
                <div className='mv-auto fl ph1 ts-title w4'>
                94%
                </div>
                <div className='m-auto tf-lato-lite ts-subtext'>
                of public school teachers spend their own money on school supplies
                </div>
              </div>
            </div>
            <div className='w-90 w-70-ns ba bw1 mh-auto mt3 border-tf-pink white bg-tf-pink'>
              <div className='flex flex-column flex-row-ns w-94 tf-lato-lite pa2 pa4-ns'>
                <div className='mv-auto fl ph1 ts-title w4'>
               100%
                </div>
                <div className='m-auto tf-lato-lite ts-subtext'>
                of your donation goes to providing resources for classrooms in need.
                </div>
              </div>
            </div>
          </section>
          <section className='h-section'>
            <div className='bg-tf-gray o-10 h-section w-100 absolute' />
            <div className='w-100 flex pa4-l index__provide'>
              <div className='bg-transparent w6 mt7-l ml6-l flex flex-column pa4-l z-1 index__provide--content'>
                <div className='pa2'>
                  <div className='tf-oswald o-100 ts-title pv3 tc tl-ns'>
                  What We Provide
                  </div>
                  <div className='tf-lato-lite ts-subtext tl-ns tc'>
                  We support teachers in need of everything from the most basic of
                  classroom supplies to extracurricular and after-school funding and equipment.
                  </div>
                </div>
              </div>
              <div className='ma5 cover absolute di-l dn index__provide--image' />
            </div>
          </section>
          <section className='h-section'>
            <div className='flex flex-column mt3 pt5-l'>
              <div className='ts-title tf-oswald center'>
              Our Process
              </div>
              <div className='flex flex-row flex-wrap justify-center w-auto mt2 mt5-l center'>
                <div className='ma3 ma4-m w-50-m w-25-l'>
                  <div className='w-100 pa3 pt4-m bg-card h5-25'>
                    <div className='pa2 tc'>
                      <div className='center br-100 pa4 ba b--black-05 mb2 ma3-m h4 w4 bg-white'>
                        <img src='/static/images/Mortarboard_icon.png' className='contain' title='Icon of graduation cap' />
                      </div>
                      <div className='tf-oswald ts-subtext pv2 tc'>
                      Quality Teachers
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
                      We fund dedicated teachers working diligently to improve their
                      classrooms and their students’ education.
                      </div>
                    </div>
                  </div>
                </div>
                <div className='ma3 ma4-m w-50-m w-25-l'>
                  <div className='w-100 pa3 pt4-m bg-card h5-25'>
                    <div className='pa2 tc'>
                      <div className='center br-100 pa4 ba b--black-05 mb2 ma3-m h4 w4 bg-white'>
                        <img src='/static/images/School_icon.png' className='contain' title='Icon of school' />
                      </div>
                      <div className='tf-oswald ts-subtext pv2 tc'>
                      Local Schools
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
                      Partnering with nearby schools ensures we are providing exactly what
                      their teachers and students need.
                      </div>
                    </div>
                  </div>
                </div>
                <div className='ma3 ma4-m w-50-m w-25-l'>
                  <div className='w-100 pa3 pt4-m bg-card h5-25'>
                    <div className='pa2 tc'>
                      <div className='center br-100 pa4 ba b--black-05 mb2 ma3-m h4 w4 bg-white'>
                        <img src='/static/images/Hand_icon.png' className='contain' title='Icon of hand holding money cap' />
                      </div>
                      <div className='tf-oswald ts-subtext pv2 tc'>
                      Tangible Impact
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
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
              <div className='ts-title tf-oswald white tc mb5-l'>
              See How We're Doing
              </div>
              <div className='center pa2 pv0-ns flex flex-column'>
                <div className='index__metrics'>
                  <div className='index__metric border-tf-yellow'>
                    <div className='tf-lato ts-title center'>
                    ${this.props.context.globalAmountDonated || 0}
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                    Raised
                    </div>
                  </div>
                  <div className='index__metric border-tf-pink'>
                    <div className='tf-lato ts-title center'>
                    3
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                    Teachers Funded
                    </div>
                  </div>
                  <div className='index__metric border-tf-dark-gray'>
                    <div className='tf-lato ts-title center'>
                    2
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                    Partner Schools
                    </div>
                  </div>
                  <div className='index__metric border-tf-gray'>
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
          <section className='h-section'>
            <div className='flex flex-column pt6-l'>
              <div className='ts-title tf-oswald center mb4-l'>
              Get Involved
              </div>
              <div className='flex flex-row flex-wrap justify-center w-auto mt5-m center'>
                <div className='pa2 pa4-ns w-50-m w-33-l w-80 bg-card h5-5-ns ma3'>
                  <div className='w-100 pa2'>
                    <div className='pa2 tc'>
                      <div className='tf-lato ts-subtext pv2 tc'>
                      Fund Teachers
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
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
                <div className='pa2 pa4-ns w-50-m w-33-l w-80 bg-card h5-5-ns ma3'>
                  <div className='w-100 pa2'>
                    <div className='pa2 tc'>
                      <div className='tf-lato ts-subtext pv2 tc'>
                      Volunteer
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
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
          <section className='h-section mb5 mb0-ns pb5-ns'>
            <div className='flex flex-column z-100'>
              <div className='bg-tf-gray o-10 dn db-ns dn-m h-section w-100 absolute' />
              <div className='ts-title tf-oswald pt5-l center'>
              Meet the Team
              </div>
              <div className='flex flex-row flex-wrap justify-center w-auto mt3 center'>
                <div className='bg-white z-1 ma4-l w-50-m w-25-l w-80'>
                  <div className='w-100 bg-transparent pa4-l'>
                    <div className='pa2-l tc'>
                      <div className='center br-100 ba b--black-05 ma3 h4 w4 bg-white overflow-hidden'>
                        <img src='/static/images/people/joel.jpg' title='Icon of graduation cap' />
                      </div>
                      <div className='tf-oswald ts-subtext pv2 tc'>
                      Joel Wasserman
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
                      A software engineer at Google, Joel formerly worked
                      at two education startups and is passionate about public education and technology.
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-white z-1 ma4-l w-50-m w-25-l w-80'>
                  <div className='w-100 bg-transparent pa4-l'>
                    <div className='pa2-l tc'>
                      <div className='center br-100 ba b--black-05 ma3 h4 w4 bg-white overflow-hidden'>
                        <img src='/static/images/people/christine.jpeg' title='Icon of school' />
                      </div>
                      <div className='tf-oswald ts-subtext pv2 tc'>
                      Christine Woeller
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
                      With a degree in secondary education, Christine seeks to improve public schools
                      and ensure teachers have the best resources available.
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-white z-1 ma4-l w-50-m w-25-l w-80'>
                  <div className='w-100 bg-transparent pa4-l'>
                    <div className='pa2-l tc'>
                      <div className='center br-100 ba b--black-05 ma3 h4 w4 bg-white overflow-hidden'>
                        <img src='/static/images/people/pete.jpeg' title='Icon of hand holding money cap' />
                      </div>
                      <div className='tf-oswald ts-subtext pv2 tc'>
                      Peter Squicciarini
                      </div>
                      <div className='tf-lato-lite ts-subtext pt2 tc'>
                      A software developer at Amazon and loving father of two, Peter strives to
                      help all children and teachers succeed in an educational environment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='h-footer bg-tf-dark-gray'>
            <div className='flex flex-column m-auto w-33-l w-50-m w-100 tc'>
              <div className='white pt5 mb4 tf-oswald ts-subtext'>
              Let's Keep in Touch
              </div>
              <div className='pt2'>
                {this.state.error && <div className='red tf-lato'>
                  {this.state.error}
                </div>}
                {this.state.success && <div className=''>
                  <p className='center pb1 pt1'>You're in the loop!</p>
                </div>}
                {!this.state.success && <div>
                  <div className='mt2 m-auto'>
                    <input placeholder='First Name' className='pa2 tf-lato bn ma2' value={this.state.firstName} onChange={this.updateFirstName} aria-label='First Name' />
                  </div>
                  <div className='mt2 m-auto'>
                    <input placeholder='Last Name' className='pa2 tf-lato bn ma2' value={this.state.lastName} onChange={this.updateLastName} aria-label='Last Name' />
                  </div>
                  <div className='m-auto pb3'>
                    <input type='email' placeholder='Email Address' className='pa2 tf-lato bn ma2' value={this.state.email} onChange={this.updateEmail} aria-label='Email' />
                  </div>
                  <div className='white no-underline pa2 db br-pill tf-lato b v-mid bg-tf-yellow w-40 m-auto' onClick={this.subscribe}>
                    <label className=''>Submit</label>
                  </div>
                </div>}
              </div>
              <div className='pt4 center white m-auto tf-lato-lite'>
                <p>The Teacher Fund is 501(c)(3) pending</p>
                <p>EIN: 83-2285506</p>
                <p>© Copyright {this.state.currentYear}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

export default IndexPage

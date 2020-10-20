import { Component } from 'react'
import { Box } from '@chakra-ui/core'
import PageWrapper from '../components/pageWrapper'
import Team from '../components/team'
import ProcessCard from '../components/ProcessCard'
import Link from 'next/link'
import { formatCurrency } from '../utils/formatting'
import HeroImage from '../components/heroImage'

class IndexPage extends Component {
  constructor (props) {
    super(props)

    // Fetch current year for footer
    const currentYear = new Date().getFullYear()

    this.fetchStats()

    this.state = {
      currentYear
    }
  }

  async fetchStats () {
    // Populate global stats
    try {
      await this.props.helpers.fetchGlobalStats()
    } catch (e) {}
  }

  render () {
    return (
      <PageWrapper title='The Teacher Fund'>
        <div className='bg-white index tf-dark-gray'>
          <HeroImage />
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
            <img className='index__provide-image' src='/images/children-class-classroom.png' alt='art classroom' />
          </section>
          <section className='h-section'>
            <div className='flex flex-column mt3 pt5-l pb4 pb0-ns'>
              <h2 className='f3 f2-l mb3-m tf-oswald center'>
                Our Process
              </h2>
              <div className='flex flex-row flex-wrap justify-center w-auto mt2 mt5-l center ph3 ph0-ns'>
                <ProcessCard
                  title='Quality Teachers'
                  icon={<img src='/images/Mortarboard_icon.png' className='contain' title='Icon of graduation cap' />}
                >
                  We fund dedicated teachers working diligently to improve their
                  classrooms and their students’ education.
                </ProcessCard>
                <ProcessCard
                  title='Local Schools'
                  icon={<img src='/images/School_icon.png' className='contain' title='Icon of school' />}
                >
                  Partnering with nearby schools ensures we are providing exactly what
                  their teachers and students need.
                </ProcessCard>
                <ProcessCard
                  title='Tangible Impact'
                  icon={<img src='/images/Hand_icon.png' className='contain' title='Icon of hand holding money cap' />}
                >
                  We monitor each dollar donated so you can see the direct
                  impact your donation has on these classrooms.
                </ProcessCard>
              </div>
            </div>
          </section>
          <section className='h-section bg-tf-teal pt5-l'>
            <div className='flex flex-column pv3 pv0-l'>
              <h2 className='f2-l f3 tf-oswald white tc mb5-l mv4'>
                See How We're Doing
              </h2>
              <div className='center pa2 pv0-ns flex flex-column'>
                <div className='index__metrics mb4-m'>
                  <Box className='index__metric border-tf-yellow' aria-label='Amount of money raised for teachers'>
                    <div className='tf-lato ts-title center'>
                      ${formatCurrency(this.props.context.globalAmountDonated) || 0}
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                      Raised
                    </div>
                  </Box>
                  <Box className='index__metric border-tf-pink' aria-label='Number of teachers funded by TeacherFund'>
                    <div className='tf-lato ts-title center'>
                      21
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                      Teachers Funded
                    </div>
                  </Box>
                  <Box className='index__metric border-tf-dark-gray' aria-label='Number of schools partenered with TeacherFund'>
                    <div className='tf-lato ts-title center'>
                      4
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                      Partner Schools
                    </div>
                  </Box>
                  <Box className='index__metric border-tf-gray' aria-label='Number of students impacted by TeacherFund'>
                    <div className='tf-lato ts-title center'>
                      973
                    </div>
                    <div className='pt2 tf-lato-lite ts-subtext center'>
                      Students Impacted
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </section>
          <section className='h-section pt0-ns pt4-l'>
            <div className='flex flex-column pt4-ns'>
              <h2 className='f2-l f3 tf-oswald tc mb5-l mv4'>
                Get Involved
              </h2>
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
                        <a className='btn-primary no-underline pa3 db br-pill tf-lato b v-mid w-80 m-auto'>Donate</a>
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
                  </div>
                  <div className='db center w-auto pv4 pb0-ns ph4 tc pointer'>
                    <a className='btn-red no-underline pa3 db br-pill tf-lato b v-mid w-80 m-auto'
                      href='mailto:joelwass@theteacherfund.com?subject=Application'>
                       Apply Today
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Team />
          
          <section className='h-footer bg-tf-dark-gray'>
            <div className='flex flex-column m-auto w-20-l w-40-m w-75 tc'>
              <div className='pt4 center white m-auto tf-lato-lite'>
                <p>The Teacher Fund is US 501(c)(3) public charity</p>
                <p>EIN: 83-2285506</p>
                <p>&copy; Copyright {this.state.currentYear}</p>
              </div>
            </div>
          </section>
        </div>
       
      </PageWrapper>
    )
  }
}

export default IndexPage

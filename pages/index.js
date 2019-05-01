import Nav from '../components/nav'
import Head from '../components/head'

export default (props) => {
  return (
    <div className='bg-white index'>
      <Head />
      <section className='index__nav'>
        <Nav />
      </section>
      <section className='index__header h-section pv7 pr7'>
        <div className='index__header__container fr flex flex-column'>
          <div className='tf-dark-gray ts-title tf-oswald fl'>
            Funding Teachers.<br />
            Empowering Students.
          </div>
          <div className='ts-subtext fl tf-lato'>
            <p>We provide funding to classrooms so teachers don't have to.</p>
          </div>
        </div>
      </section>
      <section className='h-section pv6'>
        <div className='tf-lato-lite ts-subtext w-auto m-auto center tc'>
          <p className='ma1'>We believe that by providing funding to public school</p>
          <p className='ma1'>teachers, we can support exemplary teaching, increase</p>
          <p className='ma1'>retention, and impact student success.</p>
        </div>
        <div className='w-70 ba bw1 mh-auto mt5 border-tf-teal white'>
          <div className='flex flex-row w-94 bg-tf-teal tf-lato-lite pv4 ph4'>
            <div className='mv-auto fl ph1 ts-title w4'>
              94%
            </div>
            <div className='m-auto tf-lato ts-subtext'>
              of public school teachers spend their own money on school supplies
            </div>
          </div>
        </div>
        <div className='w-70 ba bw1 mh-auto mt3 border-tf-pink white bg-tf-pink'>
          <div className='flex flex-row w-94 tf-lato-lite pv4 ph4'>
            <div className='mv-auto fl ph1 ts-title w4'>
             100%
            </div>
            <div className='m-auto tf-lato ts-subtext'>
              of your donation goes to providing resources for classrooms in need.
            </div>
          </div>
        </div>
      </section>
      <section className=''>
        What we provide
      </section>
      <section className=''>
        Our process
      </section>
      <section className=''>
        Stats
      </section>
      <section className=''>
        Get involved
      </section>
      <section className=''>
        Meet the team
      </section>
      <section className=''>
        Footer
      </section>
    </div>
  )
}

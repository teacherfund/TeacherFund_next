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
        <div className='fr flex flex-column'>
          <div className='tf-dark-gray ts-title tf-oswald fl'>
            Funding Teachers.<br />
            Empowering Students.
          </div>
          <div className='ts-subtext fl tf-lato'>
            <p>We provide funding to classrooms so teachers don't have to.</p>
          </div>
        </div>
      </section>
      <section className='h-section pt6'>
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
      <section className='h-section'>
        <div className='bg-tf-gray o-10 h-section w-100 absolute' />
        <div className='w-100 flex pa4'>
          <div className='bg-white o-80 w6 mt7 ml6 flex flex-column pa4 z-1'>
            <div className='pa2'>
              <div className='tf-oswald o-100 ts-title pv2'>
                What We Provide
              </div>
              <div className='tf-lato-lite ts-subtext'>
                We support teachers in need of everything from the most basic of
                classroom supplies to extracurricular and after-school funding and equipment.
              </div>
            </div>
          </div>
          <div className='ma5 index__provide absolute' />
        </div>
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

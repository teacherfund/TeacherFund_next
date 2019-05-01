import Nav from '../components/nav'

export default (props) => {
  return (
    <div className='bg-white index'>
      <div className='index__nav'>
        <Nav />
      </div>
      <div className='index__header pv7 pr7'>
        <div className='index__header__container fr flex flex-column'>
          <div className='index__header__title fl'>
            Funding Teachers.<br />
            Empowering Students.
          </div>
          <div className='index__header__subtitle fl'>
            <p>We provide funding to classrooms so teachers don't have to.</p>
          </div>
        </div>
      </div>
      <section className=''>
        Facts
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

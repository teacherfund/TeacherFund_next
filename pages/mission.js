import Nav from '../components/nav'
import { Component } from 'react'
import Head from '../components/head'
import '../static/styles/main.scss'

class Mission extends Component {
  render () {
    return (
      <div>
        <Head title='Mission' />
        <Nav />
        <div className='w-100 h-100 flex-column flex'>
          <div className='tf-dark-gray tc w-100 ts-title tf-oswald fl pa4'>
            Our Mission
          </div>
          <div className='flex-row tf-lato-lite pb6-ns pl6-ns pr6-ns pa3 bg-card'>
            <p>Did you know that in 2015, 94% of public school teachers spent their own money on school supplies? We live in a country where teachers aren't given the resources to properly educate our children. How is this possible?</p>

            <p>About six months ago, a few friends and I started TeacherFund: a WA non-profit, with the hope of positively impacting public school education, primarily through financially aiding teachers.</p>

            <p>As I mentioned earlier, 94% of public school teachers spent <a href='https://www.nytimes.com/2018/05/16/us/teachers-school-supplies.html'>their own money on school supplies in 2015</a>. Their own money! These are public school teachers making on average 35k a year, and they're spending their own money on school supplies trying to make their classroom a better learning environment. THIS IS INSANE.</p>

            <p>Our impact begins in Idaho. We will start by supplying classroom supplies to all new teachers in school district 271. This is a baby step, albeit an important one, but a baby step nonetheless, and we acknowledge that.</p>

            <p>This baby step will help us gain insights into the public school education system that we wouldn't otherwise have. Insights that will lead to slightly bigger steps, and on and on.</p>

            <p>If any of this resonates with you, let’s take action and make a difference. If you remember the teacher that believed in you, the one that wrote you a letter of recommendation, or the one that helped you to dream big, consider donating.</p>

            <p>I talk a lot about being a dreamer. What I don't talk a lot about is what enabled me to have big dreams in the first place. It started with school; I was the kid in 4th grade dreaming of walking on Mars. And although I failed the history test later that week because I was daydreaming, it all surmounted to one thing; I was empowered to dream. The reason I had that power was because I had teachers that showed me what was possible in this world. They encouraged me to never shy away from pushing the envelope. Now we're dreaming again, and we have this crazy notion that we can bootstrap a non-profit that could positively impact the lives of hundreds of thousands of kids.</p>

            <p>Every dream sounds crazy when you first say it out loud. We just did that. Now we're going to make it a reality.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Mission

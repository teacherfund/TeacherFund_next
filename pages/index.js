import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">Teacher Fund</h1>
      <p className="description">
        Supplemental funding for the public school education system via structured avenues
      </p>

      <div className="whitepaper">
        In School District 271 (future reference SD271) teachers have come to rely more and more on personal 
        finances to fund their classroom. The current Idaho teacher salary is $42,000, an embarrassingly low 
        amount considering the impact teachers have on students, the most optimistic promise for the future. 
        TeacherFund hopes to supplement teacher federal funding by providing school supplies, for free, to 
        teachers across SD271. Teachers need just select the products they need, put in a valid school address, 
        and the products will be shipped to them. No questions asked. 
        <br /><br />
        TeacherFund is a 501c3 nonprofit corporation, so all donations are tax deductible. additionally, 
        you will be directly helping sow the seeds of education for kids across SD271, and with the hope 
        of eventually providing supplemental funding across the country. 
        We recommend a monthly donation of ~$20, or whatever your economic status can sustain.
        Excess funding will be pooled together to support after school programs, overseen by our team at 
        TeacherFund directly as to ensure accurate and efficient use of funds. Blog posts of progress will be posted. 

        Lastly, I plea to the public to provide these resources. Many of us, who are now successful, were 
        fortunate enough to grow up in a supporting home that supplemented our public school education. 
        I hope we have the foresight to pay it forward for the next generation of kids, kids we hope to 
        provide enough resources so they can solve the next generation of social and scientific challenges. 
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .whitepaper {
        flex-direction: row;
        text-align: center;
        margin: 60px;
      }
    `}</style>
  </div>
)

export default Home

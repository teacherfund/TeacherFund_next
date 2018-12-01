import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />

    <h1 className="title">Teacher Fund</h1>
    <div className="body">
      <p className="description">
        Supplemental funding for the public school education system via structured avenues. With a mission 
        to support teachers in a way that encourages great teachers to stay, and potentially great 
        teachers to choose teaching as a career path.
      </p>
      <div className="whitepaper">
        In School District 271 (future reference SD271) teachers have come to rely more and more on personal 
        finances to fund their classroom. Initial TeacherFund work will be devoted towards providing supplemental teacher funding by providing school supplies, for free, to 
        new public school teachers across SD271. 
        <br /><br />
        TeacherFund is a non-profit Washington based corporation. By donating, you will be 
        directly improving the educational environment for kids across SD271, with the hope 
        of eventually providing supplemental funding across the country. 
        We recommend a monthly donation of ~$20, or whatever your economic status can sustain.
        Excess funding will be pooled together to support after school programs, overseen by our team at 
        TeacherFund directly as to ensure accurate and efficient use of funds.
        <br /><br />
        <h3>What we bring to the table.</h3>
        <br />
        Having an engineering based education, we'd like to incorporate technology as much as possible to
        improve the donating / non profit experience. Additionally, we believe very heavily in transparency.
        Along that theme, we will provide a "Finances" page in the coming months. This page will list all cash
        in-flows and out-flows with anonymized data. If you're ever curious where our money is spent,
        it shouldn't be hard to find out.
        <br />
        On top of that, we will be providing a "cashmap". If you'd like to login and become a recurring donation
        member, you will be able to see directly where your dollars are spent on a rendered map. Zoom in and see
        pictures and blog posts from the teachers that YOUR money, dollar for dollar, is affecting. 
      </div>
    </div>

    <style jsx>{`
      .body {
        color: #333;
        margin: 10%
      }
      .title {
        margin: 0;
        width: 100%;
        text-align: center;
        line-height: 1.15;
        font-size: 48px;
      }
      .description {
        text-align: left;
        font-weight: bold;
        margin-bottom: 50px;
      }
      .whitepaper {
        flex-direction: row;
        text-align: left;
      }
    `}</style>
  </div>
)

export default Home

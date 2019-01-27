import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import Subsection from '../components/subsection'
import EmailCapture from '../components/emailCapture'

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />
    <div className="body">
      <Subsection 
        titleText="100% of your money brings school supplies to teachers and students in need."
        descriptionText="You can help aleviate economic pressure on public school teachers across
          the country. Every penny will help bring school supplies to schools in need."
        buttonText="Give monthly"
      />
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

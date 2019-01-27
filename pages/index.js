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
        To be continued...
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

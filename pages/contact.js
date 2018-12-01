import Nav from '../components/nav'

const Contact = () => (
  <div>
    <Nav title="Contact"/>

    <div className="title">
      <h1>Contact Us</h1>
      <div className="description">
        Please please please help us improve! All suggestions welcome.<br/><br/>
        joel.wasserman8@gmail.com
      </div> 
    </div>
    <style jsx>{`
      .title,
      .description {
        text-align: center;
      }
    `}</style>
  </div>
)

export default Contact
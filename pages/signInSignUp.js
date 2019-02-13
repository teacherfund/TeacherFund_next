import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import LoginForm from '../components/loginform';
import '../static/styles/main.scss'

const SignInSignUp = () => (
  <div className="main-container" style={{backgroundImage: `url(${"/static/images/abc_blackboard.jpg"})`, backgroundSize:'100% 80%', backgroundRepeat: 'no-repeat'}}>
    <Nav />
    <Head title="Sign In" />

    <div className="body text-center login-container">
      <LoginForm />
    </div>
    <Footer />
  </div>
)

export default SignInSignUp
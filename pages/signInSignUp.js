import Nav from '../components/nav'
import Footer from '../components/footer'
import Head from '../components/head'
import LoginForm from '../components/loginform';
import '../static/styles/main.scss'

const SignInSignUp = () => (
  <div>
    <Nav />
    <Head title="Sign In" />

    <div className="container text-center ">
      <LoginForm />
    </div>
    <Footer />
  </div>
)

export default SignInSignUp
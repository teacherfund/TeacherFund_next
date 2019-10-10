import Nav from '../components/nav'
import Head from '../components/head'
import LoginForm from '../components/loginform'
import '../static/styles/main.scss'

const SignIn = (props) => (
  <div>
    <Nav />
    <Head title='Sign In – The Teacher Fund' />
    <main>
      <div className='w-100 h-100 flex pa5'>
        <img className='absolute w-100 h-100 top-0 left-0 z-minus-1' src='/static/images/einstein.jpg' />
        <div className='flex flex-row-reverse m-auto'>
          <LoginForm
            type={props.teacher}
            onSignup={props.helpers.handleSignup}
            onLogin={props.helpers.handleLogin}
          />
        </div>
      </div>
    </main>
  </div>
)

SignIn.getInitialProps = async ({ query }) => {
  return {
    teacher: query.type
  }
}

export default SignIn

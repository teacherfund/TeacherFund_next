import PageWrapper from '../components/pageWrapper'
import LoginForm from '../components/loginform'

const SignIn = (props) => (
  <PageWrapper title='Sign In – The Teacher Fund'>
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
  </PageWrapper>
)

SignIn.getInitialProps = async ({ query }) => {
  return {
    teacher: query.type
  }
}

export default SignIn

import App from 'next/app'
import withContext from '../containers/withContext'
import { ChakraProvider } from '@chakra-ui/react'
import '../public/styles/main.scss'
import { system } from '../public/theme'

class TeacherFundApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    const WrappedPage = withContext(Component, pageProps)

    return (
      <ChakraProvider value={system}>
        <WrappedPage />
      </ChakraProvider>
    )
  }
}

export default TeacherFundApp

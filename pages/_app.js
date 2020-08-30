import React from 'react'
import App from 'next/app'
import withContext from '../containers/withContext'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import '../static/styles/main.scss'
import { ProvideAuth } from '../utils/useAuth'
import CustomTheme from '../public/theme'

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
      <ThemeProvider theme={CustomTheme}>
        <CSSReset />
        <ColorModeProvider>
          <ProvideAuth>
            <WrappedPage />
          </ProvideAuth>
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}

export default TeacherFundApp

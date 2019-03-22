import React from 'react'
import App, { Container } from 'next/app'
import withContext from '../containers/withContext'

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
      <Container>
        <WrappedPage />
      </Container>
    )
  }
}

export default TeacherFundApp

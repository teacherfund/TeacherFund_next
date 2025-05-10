import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <script src='https://js.stripe.com/v3/' />
        <link href='https://fonts.googleapis.com/css?family=Lato:100,200,300,500,700' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Lato:100,200,300,500,700' rel='stylesheet' />
        <link rel='icon' sizes='192x192' href='/touch-icon.png' />
        <link rel='apple-touch-icon' href='/touch-icon.png' />
        <link rel='mask-icon' href='/favicon-mask.svg' color='#49B882' />
        <link rel='icon' href='/favicon.ico' />
        <script src='https://js.stripe.com/basil/stripe.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
// import '../public/styles/main.scss'

const defaultDescription = "Funding Teachers. Empowering Students. We provide funding to classrooms so teachers don't have to."
const defaultOGURL = 'https://theteacherfund.com'
const defaultOGImage = 'https://theteacherfund.com/images/Logo.png'

const Head = props => (
  <div>
    <NextHead>
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='google-site-verification' content='wikyOzO4Q40GHyBwVurDHX1-KTF4AbvmXc80_PV0V4Q' />
      <title>{props.title || 'TeacherFund'}</title>
      <meta
        name='description'
        content={props.description || defaultDescription}
      />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' sizes='192x192' href='/touch-icon.png' />
      <link rel='apple-touch-icon' href='/touch-icon.png' />
      <link rel='mask-icon' href='/favicon-mask.svg' color='#49B882' />
      <link rel='icon' href='/favicon.ico' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={props.url || defaultOGURL} />
      <meta property='og:title' content={props.title || ''} />
      <meta
        property='og:description'
        content={props.description || defaultDescription}
      />
      <meta name='twitter:site' content={props.url || defaultOGURL} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={props.ogImage || defaultOGImage} />
      <meta property='og:image' content={props.ogImage || defaultOGImage} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <script src='https://js.stripe.com/v3/' />
      <link href='https://fonts.googleapis.com/css?family=Lato:100,200,300,500,700' rel='stylesheet' />
      <meta name='monetization' content='$ilp.uphold.com/aNhkaA3n23Gw' />
    </NextHead>
  </div>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head

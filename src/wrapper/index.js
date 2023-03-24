import React, { Fragment } from 'react'

import Header from '@local/header'
import AppBanner from '@local/app-banner'
// import { useLoggedInRedirect } from '@hooks'

import Routes from './routes'
import FontFace from './font-face'
import Layout from './layout'
// import LoadIntialData from './load-initial-data'
import './_style.scss'

const Wrapper = () => (
  <Fragment>
    <FontFace />
    <div id="modal" />
    <AppBanner />
    <Header />
    <Layout>
      <Routes />
    </Layout>
    {/* <LoadIntialData /> */}
  </Fragment>
)

export default Wrapper

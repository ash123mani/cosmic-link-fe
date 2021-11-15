import React, { Fragment } from 'react'

import Header from '@local/header'
import AppBanner from '@local/app-banner'

import Routes from './routes'
import FontFace from './font-face'
import Layout from './layout'
import './_style.scss'

const Wrapper = () => (
  <Fragment>
    <FontFace />
    <div id="app-wrapper">
      <AppBanner />
      <Header />
      <Layout>
        <Routes />
      </Layout>
    </div>
  </Fragment>
)

export default Wrapper

import React, { Fragment } from 'react'

import Header from '@local/header'

import Routes from './routes'
import FontFace from './font-face'
import Layout from './layout'
import './_style.scss'

const Wrapper = () => (
  <Fragment>
    <FontFace />
    <Header />
    <Layout>
      <Routes />
    </Layout>
  </Fragment>
)

export default Wrapper

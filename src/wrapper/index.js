import React, { Fragment } from 'react'

import Header from '@local/header'
import Home from '@pages/home'

import './_style.scss'

import FontFace from './font-face'
import Layout from './layout'

const Wrapper = () => (
  <Fragment>
    <FontFace />
    <Layout>
      <Header />
      <Home />
    </Layout>
  </Fragment>
)

export default Wrapper

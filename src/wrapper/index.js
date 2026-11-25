import React from 'react'
import { connect } from 'react-redux'
import { bool } from 'prop-types'
import { useMediaQuery } from 'react-responsive'

import Header from '@local/header'
import AppBanner from '@local/app-banner'
import BottomNav from '@local/bottom-nav'
import mediaQueries from '@common/media-queries'
import { isLoggedIn } from '@state/selectors/auth'

import Routes from './routes'
import FontFace from './font-face'
import Layout from './layout'
import './_style.scss'

const Wrapper = ({ isUserLoggedIn }) => {
  const isMediumDown = useMediaQuery(mediaQueries.mediumDown)
  const showBottomNav = isUserLoggedIn && isMediumDown

  return (
    <>
      <FontFace />
      <div id="modal" />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <AppBanner />
      <div className="app-shell">
        <Header />
        <Layout hasBottomNav={showBottomNav}>
          <Routes />
        </Layout>
      </div>
      {showBottomNav && <BottomNav />}
    </>
  )
}

Wrapper.propTypes = {
  isUserLoggedIn: bool,
}

Wrapper.defaultProps = {
  isUserLoggedIn: false,
}

export default connect((state) => ({ isUserLoggedIn: isLoggedIn(state) }))(Wrapper)

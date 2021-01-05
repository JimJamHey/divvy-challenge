import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './components/home'
import { Nav } from './components/nav/nav'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <Nav />
        <div className='main-content'>
          <Route component={Home} exact path='/' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    background-color: #E1DED0;
    height: 100vh;
`

import React from 'react'
import styled from '@emotion/styled'

export function Home () {
  return (
    <HomeContainer>
      {/* <Link to='/another'>Another route</Link> */}
      <div>Ready, steady, go!</div>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  background-color: #E1DED0;
  height: 100%;
  width: 100%;
`

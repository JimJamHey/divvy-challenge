import React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

export const Nav = () => {
  return (
    <NavWrapper>
      <div>
        <Link to='/'>
          <ImageStyle src='https://getdivvy.com/wp-content/uploads/2019/05/Divvy-Logo-19-White.png' />
        </Link>
      </div>
      <AltLinks>
        <Link css={LinkStyle} to='/addBudget'><button>Add Budget</button></Link>
        <Link css={LinkStyle} to='/addTransaction'><button>Add Transaction</button></Link>
        <Link css={LinkStyle} to='/someNewLink'><button>Add Something Else...</button></Link>
      </AltLinks>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const AltLinks = styled.div`
    flex-direction: row;
    align-self: flex-end;
    margin-bottom: 1rem;
    margin-right: 0.5rem;
`

const LinkStyle = css`
    flex-direction: row;
    padding: 5px;
`
const ImageStyle = styled.img`
    -webkit-filter: invert(100%); /* Safari/Chrome */
    filter: invert(100%);
    width: 126px;
    height: 50px;
`

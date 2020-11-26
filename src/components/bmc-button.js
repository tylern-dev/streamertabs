import React from 'react'
import styled from 'styled-components'
import {ReactComponent as BmcSvg } from '../icons/bmc-logo.svg'

const StyledBmcSvg = styled(BmcSvg)`
  height: 20px;
  width: 20px;
`

const StyledBmcGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledBmcButton = styled.a`
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: transparent;
  color: #efefef;
  margin-right: 8px;
  text-decoration: none;

  transition: border 0.5s ease;

  :hover {
    border: 1px solid  #6D72D6;
    border-radius: 8px;
  }
`

const Text = styled.span`
  display: block;
  font-size: ${({size}) => size === "sm" ? '10px' : '14px'};
  font-weight: ${({bold}) => bold && 500} ;
  
`

const BmcButton = () => {

  return (
    <StyledBmcButton href="https://www.buymeacoffee.com/tylern" target="_blank">
      <StyledBmcGroup>
        <StyledBmcSvg />
        <div>
          <Text bold>Buy me a coffee</Text>
          <Text size="sm" >Thank you for your support!</Text>
        </div>
      </StyledBmcGroup>
    </StyledBmcButton>
  )
}

export default BmcButton
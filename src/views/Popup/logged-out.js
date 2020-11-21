import React from 'react'
import styled from 'styled-components'

const LoggedOutContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
    height: 600px;
    text-align: center;
`

const StyledTitle = styled.h1`
  color: #efefef;
  font-size: 3em;
`

const StyledLoginButton = styled.button`
  color: #efefef;
  font-size: 1.5em;
  padding: 8px;
  background: #26284A;
  border: 1px solid #6D72D6;
  border-radius: 5px;

  :hover{
    color: #6D95ED;
    border: 1px solid #6D95ED;
    border-radius: 5px;
  }
`

const LoggedOut = ({handleLogin}) => {

  return (
    <LoggedOutContainer>
      <div>
        <StyledTitle>Twitch Tabs</StyledTitle>
        <StyledLoginButton onClick={() => handleLogin()}>Log in with Twitch</StyledLoginButton>
      </div>
    </LoggedOutContainer>
  )
}

export default LoggedOut
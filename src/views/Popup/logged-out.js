import React from 'react'
import Loading from '../../components/loading'
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
  background: #26284a;
  border: 1px solid #6d72d6;
  border-radius: 5px;

  transition: border, color 0.5s ease;

  :hover {
    cursor: pointer;
    color: #6d95ed;
    border: 1px solid #6d95ed;
    border-radius: 5px;
  }
`

const Copy = styled.p`
  color: #efefef;
  font-size: 1em;
`

const Link = styled.a`
  color: #6d95ed;
`

const StyledButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const LoggedOut = ({ handleLogin, isLoading }) => {
  return (
    <LoggedOutContainer>
      <div>
        <StyledTitle>Twitch Tabs</StyledTitle>
        <StyledLoginButton onClick={() => handleLogin()} disabled={isLoading}>
          <StyledButtonContent>
            <span>Log in with Twitch</span>
            {isLoading && <Loading height={20} width={20} />}
          </StyledButtonContent>
        </StyledLoginButton>
        <Copy>
          Don't have an account? Sign up at{' '}
          <Link href="https://twitch.tv" target="_blank" rel="noreferrer">
            Twitch
          </Link>
        </Copy>
      </div>
    </LoggedOutContainer>
  )
}

export default LoggedOut

import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../consts'

const DisplayNameContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
  align-items: center;
  padding: 0 8px;
`

const StyledProfileImage = styled.img`
  max-width: 35px;
  border-radius: 24px;
`

const StyledDisplayName = styled.a`
  text-decoration: none;
  font-size: 1.5em;
  font-weight: 600;
  color: #fefefe;
  &:hover {
    color: #6d72d6;
  }
`

const UserHeader = ({ profileImageUrl, displayName }) => {
  return (
    <DisplayNameContainer>
      <StyledProfileImage src={profileImageUrl} alt="profile" />
      <StyledDisplayName href={`${TWITCH_TV}`} target="_blank">
        {displayName}
      </StyledDisplayName>
    </DisplayNameContainer>
  )
}

export default UserHeader

import React from 'react'
import styled from 'styled-components'
const DisplayNameContainer = styled.div.attrs({as: 'a'})`
  display: grid;
  grid-template-columns:auto 1fr;
  grid-gap: 16px;
  align-items: center;
`

const StyledProfileImage = styled.img`
  max-width: 48px;
`

const StyledDisplayName = styled.h2`
  font-size: 2em;
`

const UserHeader = ({profileImageUrl, displayName}) => {
    return(
      <DisplayNameContainer href="https://twitch.tv" target="_blank">
          <StyledProfileImage src={profileImageUrl} alt="profile" />
          <StyledDisplayName onClick>{displayName}</StyledDisplayName>
      </DisplayNameContainer>
    )
}

export default UserHeader
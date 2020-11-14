import React from 'react'
import styled from 'styled-components'
const DisplayNameContainer = styled.div`
  display: grid;
  grid-template-columns:auto 1fr;
  grid-gap: 16px;
  align-items: center;
  padding: 8px 8px;
`

const StyledProfileImage = styled.img`
  max-width: 35px;
  border-radius: 24px;

`

const StyledDisplayName = styled.h2`
  font-size: 1.5em;
  color: #fefefe;
`



const UserHeader = ({profileImageUrl, displayName}) => {
    return(
      <DisplayNameContainer >
        <StyledProfileImage src={profileImageUrl} alt="profile" />
        <StyledDisplayName onClick>{displayName}</StyledDisplayName>
      </DisplayNameContainer>
    )
}

export default UserHeader
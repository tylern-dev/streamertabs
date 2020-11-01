import React from 'react'
import styled from 'styled-components'

const DisplayNameContainer = styled.div.attrs({as: 'a'})`
  display: grid;
  grid-template-columns:auto 1fr;
  grid-gap: 16px;
  align-items: center;
`

const StyledProfileImage = styled.img`
  max-width: 38px;
`

const StyledDisplayName = styled.h2`
  font-size: 2em;
`

const StreamInfo = ({displayName, profileImageUrl, userFollowsData={}}) => {
  console.log(userFollowsData)
  const { data =[] } = userFollowsData
  console.log('DATA', data)
  return(
    <>
      <DisplayNameContainer href="https://twitch.tv" target="_blank">
        <StyledProfileImage src={profileImageUrl} alt="profile" />
        <StyledDisplayName onClick>{displayName}</StyledDisplayName>
      </DisplayNameContainer>
      <ul>
        {data && data.map(({to_name}) =>
          <li>{to_name}</li>
        )}
      </ul>
    </>
  )
}

export default StreamInfo
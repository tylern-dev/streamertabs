import React from 'react'
import styled from 'styled-components'
import useStreams from '../hooks/useStreams'
import { extractStreamerIds } from '../../utils'
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

const StyledUl = styled.ul`
  list-style-type: none;
  display: grid;
  grid-gap: 16px;
  padding: 0;
`

const StyledListItem = styled.li`
  display: grid;
  grid-gap: 8px;
  border: 2px solid #000;
`

const StreamInfo = ({displayName, profileImageUrl, userFollowsData={}, paginationCursor=[], liveStreams=[]}) => {
  const { data: streamerData =[] } = userFollowsData





  return(
    <>
      <DisplayNameContainer href="https://twitch.tv" target="_blank">
        <StyledProfileImage src={profileImageUrl} alt="profile" />
        <StyledDisplayName onClick>{displayName}</StyledDisplayName>
      </DisplayNameContainer>

      <StyledUl>
        {liveStreams && liveStreams.map(({user_name, title, thumbnail_url}) =>{
          thumbnail_url = thumbnail_url.replace('-{width}x{height}', '')
          return(
            <StyledListItem>
              <div>
                <StyledProfileImage src={thumbnail_url} alt={user_name} />
                <b>{user_name}</b>
              </div>
                {title}
            </StyledListItem>
          )
          }
        )}
      </StyledUl>
      {/* <button onClick={() => loadMoreFollows()} disabled={paginationCursor.length === 0}>More...</button> */}
    </>
  )
}

export default StreamInfo
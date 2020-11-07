import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
import UserHeader from '../../components/user-header'



const StyledProfileImage = styled.img`
  max-width: 48px;
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

const StyledUserName = styled.b`
  font-size: 2em;
`

const StreamInfo = ({
  displayName,
  profileImageUrl,
  paginationCursor=[],
  channels=[],
  isLoading
}) => {

  const liveStreams = channels.filter(channel => channel?.type === 'live')


  const openAllLiveStreams = () => {
    if(liveStreams){
      liveStreams.forEach((stream) => {
        chrome.tabs.create({
          url: `${TWITCH_TV}${stream.user_name.toLowerCase()}`
        })
      })
    }
  }

  const openLiveStream = ({user_name}) => {
    chrome.tabs.create({
      url: `${TWITCH_TV}${user_name.toLowerCase()}`
    })
  }

  if(isLoading) return (<h1>Loading ...</h1>)
  return(
    <>
      <UserHeader displayName={displayName} profileImageUrl={profileImageUrl} />
      <button onClick={() => openAllLiveStreams()}>Open all streams</button>
      <StyledUl>
        {liveStreams && liveStreams.map(({user_name, title, thumbnail_url, type, user_id}) =>{
            // box_art_url = box_art_url.replace('-{width}x{height}', '')
            thumbnail_url = thumbnail_url.replace('-{width}x{height}', '')
            return(
              <StyledListItem onClick={() => openLiveStream({user_name})} key={user_id}>
                <div>

                  <StyledProfileImage src={thumbnail_url} alt={user_name} />
                  <StyledUserName>{user_name}</StyledUserName>
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
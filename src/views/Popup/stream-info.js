import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
import UserHeader from '../../components/user-header'
import { useTwitch } from '../hooks/useTwitchProvider'


const StyledProfileImage = styled.img``

const StyledBoxArt = styled.img``

const StyledUserName = styled.b`
  font-size: 1.1em;
  color: #fefefe;
`

const StyledMeta = styled.div`
  & > span {
    display:block;
    color: #eee;
  }

`

const StyledStreamerSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
  & > ${StyledProfileImage} {
    max-width: 30px;
    border-radius: 16px;
  }
`

const StyledProfileContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
  padding: 8px 8px;
   ${StyledBoxArt} {
    max-width: 80px
  }
  span {
    display: block;
    color: #eee;
  }
`

const StyledUl = styled.ul`
  list-style-type: none;
  display: grid;
  grid-gap: 16px;
  padding: 0;
`

const StyledListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
  /* background: #20213d; */
  background-color: #26284A;

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  }

`


const StreamInfo = ({
  displayName,
  profileImageUrl,
}) => {
  const { userStreamingData, liveStreams, isLoading } = useTwitch()
  console.log("userStreamingData", userStreamingData)


  // console.log('userStreamingData ' , userStreamingData)
  // const liveStreams = userStreamingData.filter(channel => channel?.type === 'live')


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
      {/* <UserHeader displayName={displayName} profileImageUrl={profileImageUrl} /> */}
      {/* <button onClick={() => openAllLiveStreams()}>Open all streams</button> */}
      <StyledUl>
        {liveStreams && liveStreams.map(({user_name,viewer_count, title, thumbnail_url, type, user_id, name, box_art_url, profile_image_url}) =>{
            box_art_url =  box_art_url?.replace('-{width}x{height}', '')
            thumbnail_url = thumbnail_url?.replace('-{width}x{height}', '')
            return(
              <StyledListItem onClick={() => openLiveStream({user_name})} key={user_id}>
                <StyledProfileContainer>
                  <div>
                    <StyledBoxArt src={box_art_url ?? 'https://via.placeholder.com/150'} />
                    <span>{viewer_count}</span>
                  </div>

                  <StyledStreamerSection>
                    <StyledProfileImage src={profile_image_url}/>
                    <StyledMeta>
                      <StyledUserName>{user_name}</StyledUserName>
                      <span>{name}</span>
                      <span>{title}</span>

                    </StyledMeta>
                  </StyledStreamerSection>
                  {/* <StyledStreamerHeader>
                  </StyledStreamerHeader> */}


                </StyledProfileContainer>
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
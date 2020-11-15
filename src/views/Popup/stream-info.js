import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'


const StyledProfileImage = styled.img``

const StyledBoxArt = styled.img``

const StyledUserName = styled.b`
  font-size: 1.3em;
  color: #fefefe;
`

const StyledMeta = styled.div`
  & > span {
    display:block;
    color: #eee;
  }

`

const StyledSreamHeader = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 8px;
  align-items: center;
  ${StyledProfileImage} {
    max-width: 30px;
    border-radius: 16px;
  }
  button{
    place-self: center end;
  }

`

const StyledStreamerSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
  /* & > ${StyledProfileImage} {
    max-width: 30px;
    border-radius: 16px;
  } */
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
  background-color: #26284A;
  padding: 8px 16px;
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  }

`


const StreamInfo = ({streamData}) => {
  const { favoriteStreams, setFavorites, removeFavorite, } = useFavorites()

  const openLiveStream = ({display_name}) => {
    chrome.tabs.create({
      url: `${TWITCH_TV}${display_name.toLowerCase()}`
    })
  }

  const handleFavorite = (id) =>{
    setFavorites(id)
  }

  const handleRemoveFavorite = (id) => {
    removeFavorite(id)
  }

  return(
    <>
      <StyledUl>
        {streamData && streamData.map(({
          display_name,
          viewer_count,
          title,
          thumbnail_url,
          type,
          user_id,
          name,
          box_art_url,
          profile_image_url
        }) =>{
            box_art_url =  box_art_url?.replace('-{width}x{height}', '')
            thumbnail_url = thumbnail_url?.replace('-{width}x{height}', '')
            const favorited = favoriteStreams.includes(user_id)
            return(
              <StyledListItem  key={user_id}>
                <StyledSreamHeader>
                  <StyledProfileImage src={profile_image_url}/>
                  <StyledUserName>{display_name}</StyledUserName>
                  <button onClick={() => {
                    favorited
                      ? handleRemoveFavorite(user_id)
                      : handleFavorite(user_id)
                  }}>{favorited ? 'un-favorite' : 'favorite'}</button>
                </StyledSreamHeader>
                <StyledProfileContainer onClick={() => openLiveStream({display_name})}>

                    {/* <StyledBoxArt src={box_art_url ?? thumbnail_url} />
                    <span>{viewer_count}</span>

                  <StyledStreamerSection>
                    <StyledMeta>
                      <span>{name}</span>
                      <span>{title}</span>
                    </StyledMeta>
                  </StyledStreamerSection> */}
                </StyledProfileContainer>

              </StyledListItem>
            )
          }
        )}
      </StyledUl>
    </>
  )
}

export default StreamInfo
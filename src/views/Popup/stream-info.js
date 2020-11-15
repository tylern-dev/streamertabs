import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'


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
  grid-template-columns: 1fr auto ;
  grid-gap: 8px;
  background-color: #26284A;
  justify-content: start;

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
                <StyledProfileContainer onClick={() => openLiveStream({display_name})}>
                  <div>
                    <StyledBoxArt src={box_art_url ?? thumbnail_url} />
                    <span>{viewer_count}</span>
                  </div>
                  <StyledStreamerSection>
                    <StyledProfileImage src={profile_image_url}/>
                    <StyledMeta>
                      <StyledUserName>{display_name}</StyledUserName>
                      <span>{name}</span>
                      <span>{title}</span>
                    </StyledMeta>
                  </StyledStreamerSection>
                </StyledProfileContainer>
                <button onClick={() => {
                  favorited
                    ? handleRemoveFavorite(user_id)
                    : handleFavorite(user_id)
                  }}>{favorited ? 'un-favorite' : 'favorite'}</button>
              </StyledListItem>
            )
          }
        )}
      </StyledUl>
    </>
  )
}

export default StreamInfo
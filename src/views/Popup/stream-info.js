import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'
import {HiStar, HiOutlineStar, HiUserGroup} from 'react-icons/hi'

const StyledProfileImage = styled.img``

const StyledBoxArt = styled.img``

const StyledUserName = styled.a`
  text-decoration: none;
  font-size: 1.6em;
  font-weight: 600;
  color: #fefefe;
  &:hover{
    color: #6D72D6;
  }
`

const StyledGameLink = styled.a`
  text-decoration: none;
  color: #eee;
  &:hover{
    color: #6D72D6;
    text-decoration: underline;
  }
`

const StyledStreamTitle = styled.span`
  font-weight: 600;
`

const StyledMeta = styled.div`
  margin-top: 8px;
  & > ${StyledStreamTitle} {
    display:block;
    color: #eee;
    & > ${HiUserGroup}{
      color: #6D72D6;
    }
  }

`
const StyledFavoriteBtn = styled.button`
  background: none;
  outline: none;
  border: none;
`

const StyledStreamHeader = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 8px;
  ${StyledProfileImage} {
    max-width: 30px;
    border-radius: 16px;
  }
  ${StyledFavoriteBtn}{
    place-self: start end;
    font-size: 2em;
    color: #6D72D6;

    :hover{
      cursor: pointer;
    }
  }
  button{
    place-self: center end;
  }

`

const StyledStreamInfo = styled.div`
  display: grid;
  grid-template-columns: auto;
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
  gap: 16px;
  background-color: #26284A;
  padding: 8px 16px;

`

const StyledImgLink = styled.a`
  height: calc(100% - 30px);
`


const StreamInfo = ({streamData}) => {
  const { favoriteStreams, setFavorites, removeFavorite, } = useFavorites()

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
          id,
          name,
          box_art_url,
          profile_image_url
        }) =>{
            box_art_url =  box_art_url?.replace('-{width}x{height}', '')
            thumbnail_url = thumbnail_url?.replace('-{width}x{height}', '')
            const favorited = favoriteStreams.includes(id)
            return(
              <StyledListItem  key={id}>
                <StyledStreamHeader >
                  <StyledImgLink href={`${TWITCH_TV}${display_name.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
                    <StyledProfileImage src={profile_image_url}/>
                  </StyledImgLink>
                  <div>
                    <StyledUserName href={`${TWITCH_TV}${display_name.toLowerCase()}`} target="_blank" rel="noopener noreferrer">{display_name}</StyledUserName>
                    {type &&
                      <StyledMeta>
                        <StyledGameLink href={`${TWITCH_TV}directory/game/${name}`} target="_blank" rel="noopener noreferrer">{name}</StyledGameLink>
                        <StyledStreamTitle>{title}</StyledStreamTitle>
                      </StyledMeta>
                    }
                  </div>
                  <StyledFavoriteBtn title={favorited ? "Unfavorite" : "Favorite"} onClick={() => favorited
                      ? handleRemoveFavorite(id)
                      : handleFavorite(id)}>
                    {favorited ? <HiStar /> : <HiOutlineStar />}
                  </StyledFavoriteBtn>
                </StyledStreamHeader>
              </StyledListItem>
            )
          }
        )}
      </StyledUl>
    </>
  )
}

export default StreamInfo
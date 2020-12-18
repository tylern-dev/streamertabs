import React from 'react'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { TWITCH_TV } from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'
import { useNotification } from '../hooks/useNotificationsProvider'
import { HiUserGroup } from 'react-icons/hi'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import DropdownMenu from '../../components/dropdown-menu'
import { useTwitch } from '../hooks/useTwitchProvider'
import Toggle from '../../components/toggle'

const StyledProfileImage = styled.img``

const MetaButtonContainer = styled.div``

const StyledUserName = styled.a`
  text-decoration: none;
  font-size: 1.6em;
  font-weight: 600;
  color: #fefefe;
  &:hover {
    color: #6d72d6;
  }
`

const StyledGameLink = styled.a`
  text-decoration: none;
  color: #eee;
  &:hover {
    color: #6d72d6;
    text-decoration: underline;
  }
`

const StyledStreamTitle = styled.span`
  font-weight: 600;
`

const StyledMeta = styled.div`
  margin-top: 8px;
  & > ${StyledStreamTitle} {
    display: block;
    color: #eee;
    & > ${HiUserGroup} {
      color: #6d72d6;
    }
  }
`
const StyledMetaButton = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
`

const StyledStreamHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  ${StyledProfileImage} {
    max-width: 30px;
    border-radius: 16px;
  }
  ${DropdownMenu},${StyledMetaButton} {
    place-self: start end;
    font-size: 1.5em;
    color: #6d72d6;

    :hover {
      cursor: pointer;
    }
  }
  button {
    place-self: center end;
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
  background-color: #26284a;
  padding: 8px;
`

const StyledImgLink = styled.a`
  height: calc(100% - 30px);
`

const StreamInfo = ({ streamData }) => {
  const { favoriteStreams, setFavorites, removeFavorite } = useFavorites()
  const { handleDeleteFollow } = useTwitch()
  const { stoppedNotifications, startNotification, stopNotification } = useNotification()
  console.log('stoppedNotifications', stoppedNotifications)

  const handleFavorite = (id) => {
    setFavorites(id)
  }

  const handleRemoveFavorite = (id) => {
    removeFavorite(id)
  }

  const handleUnfollow = (id) => {
    handleDeleteFollow({ toId: id })
  }

  const handleNotificationToggle = (id) => {
    if (stoppedNotifications.includes(id)) {
      startNotification(id)
    } else {
      stopNotification(id)
    }
  }

  const isNotificationOn = (id) => {
    return !stoppedNotifications.includes(id)
  }
  return (
    <StyledUl>
      {streamData?.map(
        ({ display_name, viewer_count, title, thumbnail_url, type, id, name, box_art_url, profile_image_url }) => {
          box_art_url = box_art_url?.replace('-{width}x{height}', '')
          thumbnail_url = thumbnail_url?.replace('-{width}x{height}', '')
          const favorited = favoriteStreams.includes(id)
          return (
            <LazyLoad height="100%" offset={100} key={id} once>
              <StyledListItem>
                <StyledStreamHeader>
                  <StyledImgLink
                    href={`${TWITCH_TV}${display_name?.toLowerCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StyledProfileImage src={profile_image_url} />
                  </StyledImgLink>
                  <div>
                    <StyledUserName
                      href={`${TWITCH_TV}${display_name?.toLowerCase()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {display_name}
                    </StyledUserName>
                    {type && (
                      <StyledMeta>
                        <StyledGameLink
                          href={`${TWITCH_TV}directory/game/${name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </StyledGameLink>
                        <StyledStreamTitle>{title}</StyledStreamTitle>
                      </StyledMeta>
                    )}
                  </div>
                  <MetaButtonContainer>
                    <StyledMetaButton
                      title={favorited ? 'Unfavorite' : 'Favorite'}
                      onClick={() => (favorited ? handleRemoveFavorite(id) : handleFavorite(id))}
                    >
                      {favorited ? <BsBookmarkFill /> : <BsBookmark />}
                    </StyledMetaButton>
                    <DropdownMenu
                      menuItems={[{ text: 'Unfollow', handleOnClick: () => handleUnfollow(id) }]}
                      menuId={id}
                    >
                      <Toggle
                        id={id}
                        value={isNotificationOn(id)}
                        onToggle={() => {
                          handleNotificationToggle(id)
                        }}
                      />
                    </DropdownMenu>
                  </MetaButtonContainer>
                </StyledStreamHeader>
              </StyledListItem>
            </LazyLoad>
          )
        }
      )}
    </StyledUl>
  )
}

export default StreamInfo

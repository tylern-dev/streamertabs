import React from 'react'
import styled from 'styled-components'
import { useTwitch } from '../hooks/useTwitchProvider'
import { TWITCH_TV } from '../../consts'
const StyledProfileImage = styled.img`
  border-radius: 25px;
  max-width: 50px;
`

const ChannelDescription = styled.span`
  color: #ccc;
`

const StyledUserName = styled.a`
  text-decoration: none;
  font-size: 1.6em;
  font-weight: 600;
  color: #fefefe;
  &:hover {
    color: #6d72d6;
  }
`

const StyledChannelInfo = styled.div`
  display: grid;
  ${StyledUserName} {
    padding-bottom: 8px;
  }
`

const StyledUserHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: start;
`

const StyledImgLink = styled.a`
  height: calc(100% - 18px);
`

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`

const Live = styled.span`
  color: #ff1719;
  font-weight: 600;
`

const Result = ({ userData, gameData, followingUserData }) => {
  const { id, is_live, description, title, display_name, profile_image_url } = userData
  const { to_id } = followingUserData ?? {}

  const { handleDeleteFollow, handleCreateFollow } = useTwitch()

  const FollowUnfollowButton = () => {
    return (
      <button
        onClick={() => (followingUserData ? handleDeleteFollow({ toId: to_id }) : handleCreateFollow({ toId: id }))}
      >
        {followingUserData ? 'UnFollow' : 'Follow'}
      </button>
    )
  }

  return (
    <StyledUserHeader>
      <ImageContainer>
        <StyledImgLink href={`${TWITCH_TV}${display_name?.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
          <StyledProfileImage src={profile_image_url} />
        </StyledImgLink>
        {is_live && <Live>Live</Live>}
      </ImageContainer>
      <StyledChannelInfo>
        <StyledUserName href={`${TWITCH_TV}${display_name?.toLowerCase()}`} target="_blank" rel="noopener noreferrer">
          {display_name}
        </StyledUserName>
        {is_live && <ChannelDescription>{gameData?.name}</ChannelDescription>}
        {is_live ? (
          <ChannelDescription>{title}</ChannelDescription>
        ) : (
          <ChannelDescription>{description}</ChannelDescription>
        )}
      </StyledChannelInfo>
      <FollowUnfollowButton />
    </StyledUserHeader>
  )
}

export default Result

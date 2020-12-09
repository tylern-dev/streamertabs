import React from 'react'
import styled from 'styled-components'
import { useTwitch } from '../hooks/useTwitchProvider'
import { TWITCH_TV } from '../../consts'

const StyledProfileImage = styled.img`
  border-radius: 25px;
  max-width: 50px;
`

const ChannelDescription = styled.span`
  display: block;
  color: #ccc;
`

const StyledUserName = styled.a`
  text-decoration: none;
  font-size: 1.6em;
  font-weight: 600;
  color: #fefefe;
  padding-bottom: 8px;
  &:hover {
    color: #6d72d6;
  }
`

const StyledChannelInfo = styled.div`
  /* display: grid; */
  /* ${StyledUserName} {
    padding-bottom: 8px;
  } */
`

const StyledResultContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  align-items: start;
  border: 1px solid transparent;
  padding: 8px;

  :hover {
    border: 1px solid #26284a;
  }
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

const StyledFollowUnfollowButton = styled.button`
  border: 0;
  border: 1px solid #6d72d6;
  background: transparent;
  color: #6d72d6;
  border-radius: 5px;
  font-size: 1.1em;
  padding: 4px 8px;

  transition: color, border 0.5s ease;

  :hover {
    cursor: pointer;
    color: #6d95ed;
    border: 1px solid #6d95ed;
    border-radius: 5px;
  }
`

const StyledQueryMeta = styled.div`
  padding-top: 8px;
`

const Result = ({ userData, gameData, followingUserData }) => {
  const { id, is_live, description, title, display_name, profile_image_url } = userData
  const { to_id } = followingUserData ?? {}

  const { handleDeleteFollow, handleCreateFollow } = useTwitch()

  const FollowUnfollowButton = () => {
    return (
      <StyledFollowUnfollowButton
        onClick={() => (followingUserData ? handleDeleteFollow({ toId: to_id }) : handleCreateFollow({ toId: id }))}
      >
        {followingUserData ? 'UnFollow' : 'Follow'}
      </StyledFollowUnfollowButton>
    )
  }

  return (
    <StyledResultContainer>
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
        <StyledQueryMeta>
          {is_live && <ChannelDescription>{gameData?.name}</ChannelDescription>}
          {is_live ? (
            <ChannelDescription>{title}</ChannelDescription>
          ) : (
            <ChannelDescription>{description}</ChannelDescription>
          )}
        </StyledQueryMeta>
      </StyledChannelInfo>
      <FollowUnfollowButton />
    </StyledResultContainer>
  )
}

export default Result

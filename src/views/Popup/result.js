import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
const StyledProfileImage = styled.img`
  border-radius: 25px;
  max-width: 50px;
`

const ChannelDescription = styled.span`
  color: #ccc;
`

const StyledChannelInfo = styled.div`
  display: grid;
`

const StyledUserHeader = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
  align-items: start;
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

const Result = ({ userData, gameData }) => {
  const { is_live, description, title, display_name, profile_image_url } = userData

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
    </StyledUserHeader>
  )
}

export default Result

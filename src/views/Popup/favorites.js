import React from 'react'
import styled from 'styled-components'
import {TWITCH_TV} from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'
import { useTwitch } from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'
import StreamSection from '../../components/stream-section'

const StyledOpenAllFavorites = styled.button`
  border: 0;
  border: 1px solid #6D72D6;
  background: transparent;
  color: #6D72D6;
  border-radius: 5px;

  transition: color,border 0.5s ease;

  :hover{
    cursor: pointer;
    color: #6D95ED;
    border: 1px solid #6D95ED;
    border-radius: 5px;
  }
`

const Favorites = () => {
  const {liveStreams} = useTwitch()
  const { favoriteStreams, clearAllFavorites } = useFavorites()

  const liveFavorites = liveStreams.filter((ls) => favoriteStreams.includes(ls.id))

  const handleOpenAllStreams = () => {
    liveFavorites.forEach((favorite) => {
      chrome.tabs.create({
        url: `${TWITCH_TV}${favorite.login}`
      })
    })
  }

  return(
    <StreamSection section="Favorites" count={liveFavorites.length}>
      {liveFavorites.length > 0 &&
        <>
          <StyledOpenAllFavorites onClick={() => handleOpenAllStreams() }>Open favorites</StyledOpenAllFavorites>
          {/* <button onClick={() => clearAllFavorites()}>Clear all favorites</button> */}
        </>
      }
      <StreamInfo streamData={liveFavorites} />
    </StreamSection>

  )
}

export default Favorites
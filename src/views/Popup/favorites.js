import React from 'react'
import styled from 'styled-components'
import { TWITCH_TV } from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'
import { useTwitch } from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'
import StreamSection from '../../components/stream-section'
import Empty from './empty'

const StyledOpenAllFavorites = styled.button`
  border: 0;
  border: 1px solid #6d72d6;
  background: transparent;
  color: #6d72d6;
  border-radius: 5px;

  transition: color, border 0.5s ease;

  :hover {
    cursor: pointer;
    color: #6d95ed;
    border: 1px solid #6d95ed;
    border-radius: 5px;
  }
`

const Favorites = () => {
  const { liveStreams } = useTwitch()
  const { favoriteStreams } = useFavorites()

  const liveFavorites = liveStreams.filter((ls) => favoriteStreams.includes(ls.id))

  const handleOpenAllStreams = () => {
    liveFavorites.forEach((favorite) => {
      chrome.tabs.create({
        url: `${TWITCH_TV}${favorite.login}`,
      })
    })
  }

  return (
    <StreamSection section="Favorites" count={liveFavorites.length}>
      {liveFavorites.length > 0 ? (
        <>
          <StyledOpenAllFavorites title="Open all favorite channels in tabs" onClick={() => handleOpenAllStreams()}>
            Open all favorites
          </StyledOpenAllFavorites>
        </>
      ) : (
        <Empty />
      )}
      <StreamInfo streamData={liveFavorites} />
    </StreamSection>
  )
}

export default Favorites

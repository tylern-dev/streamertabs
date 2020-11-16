import React from 'react'
import {TWITCH_TV} from '../../consts'
import { useFavorites } from '../hooks/useFavoritesProvider'
import { useTwitch } from '../hooks/useTwitchProvider'
import StreamInfo from './stream-info'
import StreamSection from '../../components/stream-section'
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
          <button onClick={() => handleOpenAllStreams() }>Open all favorite streams</button>
          <button onClick={() => clearAllFavorites()}>Clear all favorites</button>
        </>
      }
      <StreamInfo streamData={liveFavorites} />
    </StreamSection>

  )
}

export default Favorites
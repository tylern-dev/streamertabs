import { useState, useEffect, useCallback } from 'react'
import { getApi } from '../../fetchUtil'
import { chunkArray, buildGamesUrl } from '../../utils'
import { T_TKN } from '../../consts'

const useGames = ({ streamsData, isStreamsLoading, isLoggedIn }) => {
  const [gameData, setGameData] = useState([])
  const [isGamesLoading, setIsGamesLoading] = useState(true)

  const getGames = useCallback(() => {
    const gameIds = streamsData?.map((game) => game.game_id)
    const uniqueGameIds = [...new Set(gameIds)] // removes duplicate game IDs
    const chunkedArray = chunkArray(uniqueGameIds, 100)
    chunkedArray.forEach((chunk) => {
      setIsGamesLoading(true)
      chrome.storage.local.get([T_TKN], (response) => {
        getApi({
          url: buildGamesUrl({ gameId: chunk }),
          accessToken: response[T_TKN],
        })
          .then(({ data }) => {
            data.forEach((g) => {
              setGameData((game) => [...game, g])
            })
            setIsGamesLoading(false)
          })
          .catch(() => setIsGamesLoading(false))
      })
    })
    setIsGamesLoading(false)
  }, [streamsData])

  useEffect(() => {
    if (streamsData.length > 0 && !isStreamsLoading) {
      getGames()
    } else {
      setIsGamesLoading(false)
    }
  }, [streamsData, isStreamsLoading, getGames])

  useEffect(() => {
    if (!isLoggedIn) {
      setGameData([])
    }
  }, [isLoggedIn])

  return {
    gameData,
    isGamesLoading,
  }
}

export default useGames

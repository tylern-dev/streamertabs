import React, { useContext, useState, useEffect, useCallback } from 'react'
import { T_TKN } from '../../consts'
import { getApi } from '../../fetchUtil'
import useLoadUserFollows from './useLoadUserFollows'
import useStreams from './useStreams'
import useGames from './useGames'
import { buildGamesUrl, buildFollowsUrl, buildStreamsUrl, chunkArray, reconstructUsersObj} from '../../utils'

const TwitchContext = React.createContext({})

const TwitchProvider = ({userId, first=100, isLoggedIn, children}) => {
  const {isUsersLoading, userFollowsData} = useLoadUserFollows({userId})
  const {isStreamsLoading, streamsData} = useStreams({userFollowsData, isUsersLoading})
  const { isGamesLoading, gameData} = useGames({streamsData, isStreamsLoading})

  const [userStreamingData, setUserStreamingData] = useState([])

  useEffect(() => {
    if(!isStreamsLoading && !isGamesLoading && streamsData.length > 0 && gameData.length > 0){
      setUserStreamingData(reconstructUsersObj({userData: userFollowsData, streamsToAdd: streamsData, gamesToAdd:gameData}))
    }
  }, [streamsData, userFollowsData, isStreamsLoading, gameData, isGamesLoading])

  const isLoading = [isGamesLoading, isStreamsLoading, isUsersLoading].every(Boolean)

  const values = {isLoading, userStreamingData}

  return (
    <TwitchContext.Provider value={values}>
      {children}
    </TwitchContext.Provider>
  )
}


const useTwitch = () =>{
  const {userStreamingData, isLoading} = useContext(TwitchContext)

  return {userStreamingData, isLoading}
}

export {
  TwitchProvider,
  useTwitch
}
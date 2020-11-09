import React, { useContext, useState, useEffect, useCallback } from 'react'
import { T_TKN } from '../../consts'
import { getApi } from '../../fetchUtil'
import useLoadUserFollows from './useLoadUserFollows'
import useStreams from './useStreams'
import useGames from './useGames'
import useUserData from './useUserData'
import { buildGamesUrl, buildFollowsUrl, buildStreamsUrl, chunkArray, reconstructUsersObj} from '../../utils'

const TwitchContext = React.createContext({})

const TwitchProvider = ({userId, first=100, isLoggedIn, children}) => {
  const {isUsersLoading, userFollowsData} = useLoadUserFollows({userId, isLoggedIn})
  const {isStreamsLoading, streamsData} = useStreams({userFollowsData, isUsersLoading, isLoggedIn})
  const { isGamesLoading, gameData} = useGames({streamsData, isStreamsLoading, isLoggedIn})
  const { isGetUserDataLoading, userData } = useUserData({userFollowsData, isUsersLoading, isLoggedIn})

  const [userStreamingData, setUserStreamingData] = useState([])

  const canReconstructUserObj = [!isStreamsLoading, !isGamesLoading, streamsData.length > 0, gameData.length > 0, userData.length > 0, !isGetUserDataLoading].every(Boolean)
 

  useEffect(() => {
    if(canReconstructUserObj){
      setUserStreamingData(reconstructUsersObj({userFollowsData: userFollowsData, streamsToAdd: streamsData, gamesToAdd:gameData, userData: userData}))
    }
  }, [canReconstructUserObj, streamsData, userFollowsData, gameData, userData])


  useEffect(() => {
    if(!isLoggedIn){
      setUserStreamingData([])
    }
  }, [isLoggedIn])


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
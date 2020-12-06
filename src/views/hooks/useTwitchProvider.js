import React, { useContext, useState, useEffect } from 'react'
import useLoadUserFollows from './useLoadUserFollows'
import useStreams from './useStreams'
import useGames from './useGames'
import useUserData from './useUserData'
import { reconstructUsersObj } from '../../utils'

const TwitchContext = React.createContext({})

const TwitchProvider = ({ userId, isLoggedIn, children }) => {
  // work on pulling deleteUser and create user out of this hook. That way this should trigger a re-render🤞
  const { isUsersLoading, userFollowsData } = useLoadUserFollows({ userId, isLoggedIn })
  const { isStreamsLoading, streamsData } = useStreams({ userFollowsData, isUsersLoading, isLoggedIn })
  const { isGetUserDataLoading, userData } = useUserData({ userFollowsData, isUsersLoading, isLoggedIn })
  const { isGamesLoading, gameData } = useGames({ streamsData, isStreamsLoading, isLoggedIn })

  const [userStreamingData, setUserStreamingData] = useState([])

  const canReconstructUserObj = [!isStreamsLoading, !isGamesLoading, !isGetUserDataLoading].every(Boolean)

  useEffect(() => {
    if (canReconstructUserObj) {
      setUserStreamingData(
        reconstructUsersObj({
          userFollowsData: userFollowsData,
          streamsToAdd: streamsData,
          gamesToAdd: gameData,
          userData: userData,
        })
      )
    }
  }, [canReconstructUserObj, streamsData, userFollowsData, gameData, userData])

  useEffect(() => {
    if (!isLoggedIn) {
      setUserStreamingData([])
    }
  }, [isLoggedIn])

  const isLoading = [isGamesLoading, isStreamsLoading, isUsersLoading, isGetUserDataLoading].some(Boolean)
  const liveStreams = userStreamingData.filter((channel) => channel?.type === 'live')
  const offlineStreams = userStreamingData.filter((channel) => channel?.type !== 'live')

  const values = { isLoading, userStreamingData, liveStreams, offlineStreams, userFollowsData }

  return <TwitchContext.Provider value={values}>{children({ isLoading: isLoading })}</TwitchContext.Provider>
}

const useTwitch = () => {
  const { userStreamingData, liveStreams, offlineStreams, userFollowsData, isLoading } = useContext(TwitchContext)

  return { userStreamingData, liveStreams, offlineStreams, userFollowsData, isLoading }
}

export { TwitchProvider, useTwitch }

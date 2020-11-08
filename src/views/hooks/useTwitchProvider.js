import React, { useContext, useState, useEffect, useCallback } from 'react'
import { T_TKN } from '../../consts'
import { getApi } from '../../fetchUtil'
import useLoadUserFollows from './useLoadUserFollows'
import { buildGamesUrl, buildFollowsUrl, buildStreamsUrl, chunkArray, reconstructUsersObj} from '../../utils'

const TwitchContext = React.createContext({})

const TwitchProvider = ({userId, first=100, isLoggedIn, children}) => {
  // const {isUsersLoading, userFollowsData} = useLoadUserFollows({userId})


  const [userFollows, setUserFollows] = useState([])
  const [streams, setStreams ] = useState([])
  const [userStreamingData, setUserStreamingData] = useState([])
  const [gameData, setGameData] = useState([])
  const [userStreamsGamingData, setUserStreamsGamingData] = useState([])
  const [isUsersLoading, setIsUsersLoading ] = useState(true)
  const [isStreamsLoading, setIsStreamsLoading] = useState(true)
  const [ isGamesLoading, setIsGamesLoading ]= useState(true)


  const loadUserFollows = useCallback(({after}) => {
    return new Promise((resolve, reject)=>{
      chrome.storage.local.get([T_TKN], (response) => {
        if(response[T_TKN]) {
          setIsUsersLoading(true)
          getApi({
            url: buildFollowsUrl({from_id: userId, after, first}),
            accessToken: response[T_TKN],
          })
            .then(({data, pagination}) => {
              data.forEach(o => {
                setUserFollows(users => [...users, o])
              })
              if(pagination?.cursor){
                loadUserFollows({after: pagination?.cursor})
              } else {
                setIsUsersLoading(false)
              }
            })
            .catch(error => {
              setIsUsersLoading(false)
              return reject(new Error(error))
            })
        }

      })

    })
  },[first, userId])


  const loadUsersWithStreams = useCallback(({after}) => {
    const followedUserIds = (userFollows && userFollows?.map(({to_id}) => to_id)) || []

    const chunkedArray = chunkArray(followedUserIds, 50)
    setIsStreamsLoading(true)
    chunkedArray.forEach(chunk => {
      chrome.storage.local.get([T_TKN], (response) => {
        getApi({
          url: buildStreamsUrl({user_id: chunk }),
          accessToken: response[T_TKN],
        })
          .then(({data, pagination}) => {
            data.forEach((u) =>{
              setStreams(users => [...users, u])
            })


          })
          .catch(error => {
            setIsStreamsLoading(false)
            new Error(error)
          })
      })

    })
    setIsStreamsLoading(false)
  }, [ userFollows ])

  const getGames = useCallback(() => {
    if(streams){
      const gameIds = streams?.map(game => game.game_id)
      const chunkedArray = chunkArray(gameIds, 50)
      chunkedArray.forEach(chunk => {
        setIsGamesLoading(true)
        chrome.storage.local.get([T_TKN], (response) =>{
          getApi({
            url: buildGamesUrl({gameId: chunk}),
            accessToken: response[T_TKN]
          }).then(({data}) =>{

            data.forEach((d)=>{
              setGameData(games => [...games, d])
            })
          })
        })

      })
      setIsGamesLoading(false)
    }
  },[streams])

  useEffect(() => {
    if(userId){
      loadUserFollows({})
    }
  }, [userId, first, loadUserFollows])


  useEffect(() => {
    if(userFollows  && !isUsersLoading){
      loadUsersWithStreams({})
    }
  }, [userFollows, first, isUsersLoading,  loadUsersWithStreams])

  useEffect(() => {
    if(streams && !isStreamsLoading){
      getGames()
    }
  }, [getGames, streams, isStreamsLoading])


  useEffect(() => {
    if(!isStreamsLoading && !isGamesLoading && streams.length > 0 && gameData.length > 0){
      setUserStreamingData(reconstructUsersObj({userData: userFollows, streamsToAdd: streams, gamesToAdd:gameData}))
    }
  }, [streams, userFollows, isStreamsLoading, gameData, isGamesLoading])

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
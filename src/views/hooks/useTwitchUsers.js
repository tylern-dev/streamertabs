import { useState, useEffect, useCallback } from 'react'
import {  T_TKN } from '../../consts'
import { getApi} from '../../fetchUtil'
import { buildFollowsUrl, buildStreamsQueryUrl, buildStreamsUrl, chunkArray, reconstructUsersObj } from '../../utils'



const useTwitchUsers = ({userId, isLoggedIn,  first=100}) => {

  const [userFollows, setUserFollows] = useState([])
  const [streams, setStreams ] = useState([])
  const [isUsersLoading, setIsUsersLoading ] = useState(true)
  const [isStreamsLoading, setIsStreamsLoading] = useState(true)
  const [userStreamingData, setUserStreamingData] = useState([])


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

    const chunkedArray = chunkArray(followedUserIds, 1)
    chunkedArray.forEach(chunk => {
      chrome.storage.local.get([T_TKN], (response) => {
        setIsStreamsLoading(true)
        getApi({
          url: buildStreamsUrl({user_id: chunk }),
          accessToken: response[T_TKN],
        })
          .then(({data, pagination}) => {
            data.forEach((u) =>{
              setStreams(users => [...users, u])
            })
            setIsStreamsLoading(false)
            
          })
          .catch(error => {
            setIsStreamsLoading(false)
            new Error(error)
          })
      })

    })
  }, [ userFollows ])

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
    if(!isStreamsLoading && streams.length > 0){
      setUserStreamingData(reconstructUsersObj({userData: userFollows, dataToAdd: streams}))
    }
  }, [streams, userFollows, isStreamsLoading])

  useEffect(() => {
    if(!isLoggedIn){
      setUserFollows([])
      setStreams([])
      setUserStreamingData([])
    }
  }, [isLoggedIn])

  
  const isLoading = [isUsersLoading, isStreamsLoading].every(Boolean)

  return {
    userFollows,
    streams,
    loadUserFollows,
    userStreamingData,
    isLoading

  }
}

export default useTwitchUsers
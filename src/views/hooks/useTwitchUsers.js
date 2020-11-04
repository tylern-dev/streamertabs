import { useState, useEffect, useCallback } from 'react'
import {  T_TKN } from '../../consts'
import { getApi} from '../../fetchUtil'
import { buildFollowsUrl, buildStreamsQueryUrl, buildStreamsUrl, reconstructUsersObj } from '../../utils'



const useTwitchUsers = ({userId,  first=20}) => {

  const [userFollows, setUserFollows] = useState([])
  const [streams, setStreams ] = useState([])
  const [isUsersLoading, setIsUsersLoading ] = useState(true)
  const [isStreamsLoading, setIsStreamsLoading] = useState()



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

  useEffect(() => {
    if(userId){
      loadUserFollows({})
    }
  }, [userId, first, loadUserFollows])


  useEffect(() => {
    const followedUserIds = (userFollows && userFollows?.map(({to_id}) => to_id)) || []

    if(userFollows && followedUserIds.length > 0 && !isUsersLoading){
      chrome.storage.local.get([T_TKN], (response) => {
        setIsStreamsLoading(true)
        getApi({
          url: buildStreamsUrl({user_id: followedUserIds, first }),
          accessToken: response[T_TKN],
        })
          .then(({data, pagination}) => {
            if(data){
              reconstructUsersObj({userData: userFollows, dataToAdd: data})

            }
            setIsStreamsLoading(false)
            setStreams(data)
            // setCursors(cursor => ({
            //   ...cursor,

            // }))
          })
          .catch(error => {
            setIsStreamsLoading(false)
            new Error(error)
          })

      })
    }
  }, [userFollows, first, isUsersLoading])


  return {
    userFollows,
    streams,
    loadUserFollows,

  }
}

export default useTwitchUsers
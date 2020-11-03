import { useState, useEffect } from 'react'
import {  T_TKN } from '../../consts'
import { getApi} from '../../fetchUtil'
import { buildFollowsUrl, buildStreamsQueryUrl } from '../../utils'


const useTwitchUsers = ({userId, cursor, first=20}) => {

  const [userFollows, setUserFollows] = useState({})
  const [streams, setStreams ] = useState({})
  const [isLoading, setIsLoading ] = useState(false)

  useEffect(() => {

    if(userId){
      chrome.storage.local.get([T_TKN], (response) => {
        if(response[T_TKN]) {
          setIsLoading(true)
          getApi({
            url: buildFollowsUrl({from_id: userId, after: cursor, first}),
            accessToken: response[T_TKN],
          })
            .then(data => {
              setIsLoading(false)
              setUserFollows(data)
            })
            .catch(error => {
              setIsLoading(false)
              new Error(error)
            })
        }

      })
    }

  }, [userId, cursor, first])

  useEffect(() => {
    const followedUserNames = (userFollows && userFollows['data']?.map(({to_name}) => to_name)) || []
    if(userFollows && followedUserNames.length > 0){
          chrome.storage.local.get([T_TKN], (response) => {
            setIsLoading(true)
            getApi({
              url: buildStreamsQueryUrl({query: followedUserNames}),
              accessToken: response[T_TKN],
            })
              .then((data) => {
                setIsLoading(false)
                setStreams(data)
              })
              .catch(error => {
                setIsLoading(false)
                new Error(error)
              })

          })
        }
  }, [userFollows])

  return {
    userFollows,
    streams,
    isLoading
  }
}

export default useTwitchUsers
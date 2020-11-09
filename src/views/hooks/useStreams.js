import { useEffect, useState, useCallback } from 'react'
import {getApi} from '../../fetchUtil'
import { T_TKN } from '../../consts'
import { buildStreamsUrl, chunkArray } from '../../utils'


const useStreams = ({userFollowsData, isUsersLoading, isLoggedIn}) => {

  const [ isStreamsLoading, setIsStreamsLoading ] = useState(true)
  const [streamsData, setStreams] = useState([])

  const loadUsersWithStreams = useCallback(() => {

      const followedUserIds = (userFollowsData && userFollowsData?.map(({to_id}) => to_id)) || []

      const chunkedArray = chunkArray(followedUserIds, 75)
      chunkedArray.forEach(chunk => {
        setIsStreamsLoading(true)
        chrome.storage.local.get([T_TKN], (response) => {
          getApi({
            url: buildStreamsUrl({user_id: chunk }),
            accessToken: response[T_TKN],
          })
            .then(({data, pagination}) => {
              data.forEach((s) =>{
                setStreams(streams => [...streams, s])
              })
              setIsStreamsLoading(false)
            })
            .catch(error => {
              setIsStreamsLoading(false)
              new Error(error)
            })
        })

      })
  }, [ userFollowsData ])

  useEffect(() => {
    if(userFollowsData.length > 0 && !isUsersLoading){
      loadUsersWithStreams()
    }
  }, [userFollowsData, isUsersLoading, loadUsersWithStreams])

  useEffect(() => {
    if(!isLoggedIn){
      setStreams([])
    }
  }, [isLoggedIn])

  return {
    streamsData,
    isStreamsLoading
  }
}

export default useStreams
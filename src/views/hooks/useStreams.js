import { useEffect, useState } from 'react'
import {getApi} from '../../fetchUtil'
import { T_TKN, TWITCH_GET_STREAMS } from '../../consts'

const buildStreamsUrl = ({user_id, user_login, game_id, first=20, before, after:cursor}) => {
  let userIds
  if(user_id instanceof Array){
    userIds = user_id.join('&user_id=')
  }
  return `${TWITCH_GET_STREAMS}?${user_id ? `${userIds}` : ''}${first ? `&first=${first}`: ''}${cursor ? `after=${cursor}` : ''}`
}

const useStreams = (user_id) => {
  const [ streams, setStreams ] = useState([])
  const [ offlineStreams, setOfflineStreams ] = useState([])

  useEffect(() => {
    if(user_id) {
      chrome.storage.local.get([T_TKN], (response) =>{
        if(response[T_TKN]){
          getApi({
            url: buildStreamsUrl({user_id}),
            accessToken: response[T_TKN],
          })
            .then((data) => {
              console.log('bad boy data', data)
              // setStreams(data)
            })
            .catch(error => new Error(error))
        }
      })
    }
  }, [user_id, setStreams])




  return {
    streams
  }
}

export default useStreams
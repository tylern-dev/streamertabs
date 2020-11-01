import { useState, useEffect } from 'react'
import { TWITCH_USERS_FOLLOWS, T_TKN, TWITCH_CLIENT_ID } from '../../consts'
import { getApi} from '../../fetchUtil'


const useTwitchUsers = ({userId}) => {

  const [userFollows, setUserFollows] = useState()
  useEffect(() => {
    if(userId){
      chrome.storage.local.get([T_TKN], (response) => {
        if(response[T_TKN]) {
          getApi({
            url: TWITCH_USERS_FOLLOWS(userId),
            accessToken: response[T_TKN],
          })
            .then(data => {
              setUserFollows(data)
            })
            .catch(error => new Error(error))
        }

      })
    }

  }, [userId])

  return {
    userFollows
  }
}

export default useTwitchUsers
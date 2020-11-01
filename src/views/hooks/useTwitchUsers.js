import { useState, useEffect } from 'react'
import { TWITCH_USERS_FOLLOWS, T_TKN, TWITCH_CLIENT_ID } from '../../consts'
import { getApi} from '../../fetchUtil'

function buildFollowsUrl({after, from_id, first}) {
  return `${TWITCH_USERS_FOLLOWS}?from_id=${from_id}${after ? `&after=${after}` : ''}${first ? `&first=${first}` : ''}`
}

const useTwitchUsers = ({userId, cursor, first=20}) => {

  const [userFollows, setUserFollows] = useState()
  console.log(buildFollowsUrl({from_id: userId, after: cursor, first}))
  useEffect(() => {
    if(userId){
      chrome.storage.local.get([T_TKN], (response) => {
        if(response[T_TKN]) {
          getApi({
            
            url: buildFollowsUrl({from_id: userId, after: cursor, first}),
            accessToken: response[T_TKN],
          })
            .then(data => {
              setUserFollows(data)
            })
            .catch(error => new Error(error))
        }

      })
    }

  }, [userId, cursor])

  return {
    userFollows
  }
}

export default useTwitchUsers
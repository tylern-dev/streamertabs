import { useState, useEffect } from 'react'
import { TWITCH_USERS_FOLLOWS, T_TKN, TWITCH_CLIENT_ID } from '../../consts'


const useTwitchUsers = ({userId}) => {
  console.log(userId)
  const [userFollows, setUserFollows] = useState()
  useEffect(() => {
    if(userId){
      chrome.storage.local.get([T_TKN], (response) => {
        if(response[T_TKN]) {
          fetch(TWITCH_USERS_FOLLOWS(userId), {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${response[T_TKN]}`,
              'Client-Id': `${TWITCH_CLIENT_ID}`
            }
          }).then((response) => {
            if(response.status === 200){
              response.json().then(data =>{
                console.log(data)
              })
            }
          })
        }

      })
    }

  }, [userId])

  return {
    userFollows
  }
}

export default useTwitchUsers
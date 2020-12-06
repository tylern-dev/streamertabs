import { useState, useEffect } from 'react'
import { T_TKN, TWITCH_CLIENT_ID, TWITCH_USERS_URL, REVOKE_TWITCH_URL } from '../../consts'

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({})

  const getUserObj = () => {
    chrome.storage.local.get([T_TKN], (result) => {
      fetch(TWITCH_USERS_URL, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${result[T_TKN]}`,
          'Client-Id': TWITCH_CLIENT_ID,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(({ data }) => {
            const { id, display_name, profile_image_url } = data?.[0] ?? {}
            setUserData({
              userId: id,
              displayName: display_name,
              profileImageUrl: profile_image_url,
            })
            setIsLoggedIn(true)
          })
        } else setIsLoggedIn(false)
      })
    })
  }
  useEffect(() => {
    chrome.storage.local.get([T_TKN], (result) => {
      if (result[T_TKN]) {
        getUserObj()
      }
    })
  }, [isLoggedIn])

  const buildAccessUrl = (url) => {
    if (url) {
      const access_token = url.match(/#(?:access_token)=([\S\s]*?)&/)[1]
      chrome.storage.local.set({ [T_TKN]: access_token })
      return Promise.resolve()
    }
  }

  const handleUserLogin = () => {
    setIsLoading(true)
    chrome.identity.launchWebAuthFlow(
      {
        url: `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${TWITCH_CLIENT_ID}&scope=user:edit:follows&redirect_uri=https://${chrome.runtime.id}.chromiumapp.org/provider_cb&scope=viewing_activity_read&force_verify=true`,
        interactive: true,
      },
      (redirect_url) => {
        buildAccessUrl(redirect_url)
          .then(() => {
            getUserObj()
            setIsLoggedIn(true)
            setIsLoading(false)
          })
          .catch(() => {
            setIsLoading(false)
            setIsLoggedIn(false)
          })
      }
    )
  }

  const handleLogout = () => {
    chrome.storage.local.get([T_TKN], (result) => {
      if (result[T_TKN]) {
        fetch(`${REVOKE_TWITCH_URL}?client_id=${TWITCH_CLIENT_ID}&token=${result[T_TKN]}`, {
          method: 'POST',
        }).then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(false)
            setUserData({})
            chrome.storage.local.set({ [T_TKN]: '' })
          }
        })
      }
    })
  }

  return {
    isLoggedIn,
    isLoading,
    userData,
    handleUserLogin,
    handleLogout,
  }
}

export default useLogin

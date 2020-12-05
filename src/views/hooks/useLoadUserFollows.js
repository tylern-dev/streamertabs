import { useState, useCallback, useEffect } from 'react'
import { T_TKN } from '../../consts'
import { getApi } from '../../fetchUtil'
import { buildFollowsUrl } from '../../utils'

const useLoadUserFollows = ({ userId, first = 100, isLoggedIn }) => {
  const [userFollowsData, setUserFollowsData] = useState([])
  const [isUsersLoading, setIsUsersLoading] = useState(true)

  const loadUserFollows = useCallback(
    ({ after }) => {
      chrome.storage.local.get([T_TKN], (response) => {
        if (response[T_TKN]) {
          setIsUsersLoading(true)
          getApi({
            url: buildFollowsUrl({ from_id: userId, after, first }),
            accessToken: response[T_TKN],
          })
            .then(({ data, pagination }) => {
              data.forEach((o) => {
                setUserFollowsData((users) => [...users, o])
              })
              if (pagination?.cursor) {
                loadUserFollows({ after: pagination?.cursor })
              } else {
                setIsUsersLoading(false)
              }
            })
            .catch((error) => {
              setIsUsersLoading(false)
              return new Error(error)
            })
        }
      })
    },
    [first, userId]
  )

  useEffect(() => {
    if (userId) {
      loadUserFollows({})
    }
  }, [loadUserFollows, userId])

  useEffect(() => {
    if (!isLoggedIn) {
      setUserFollowsData([])
    }
  }, [isLoggedIn])

  return {
    userFollowsData,
    isUsersLoading,
  }
}

export default useLoadUserFollows

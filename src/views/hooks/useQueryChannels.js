import { useEffect, useState } from 'react'
import { getApi } from '../../fetchUtil'
import { T_TKN } from '../../consts'
import { buildStreamsQueryUrl } from '../../utils'

const useQueryChannels = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [queryData, setQueryData] = useState([])

  const handleQueryChannels = ({searchTerm, isLive, cursor}) => {
    setIsLoading(true)
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([T_TKN], (response) => {
        getApi({
          url: buildStreamsQueryUrl({query: searchTerm, liveOnly: isLive, after: cursor }),
          accessToken: response[T_TKN],
        }).then((response) => {
          setIsLoading(false)
          resolve(response)
        }).catch((error) => {
          setIsLoading(false)
          reject(error)
        })
      })
    })
  }
  return ({
    isLoading,
    queryData,
    handleQueryChannels
  })
}

export default useQueryChannels
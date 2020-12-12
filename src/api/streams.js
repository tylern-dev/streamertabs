import { getApi } from '../fetchUtil'
import { T_TKN } from '../consts'
import { buildStreamsUrl } from '../utils'

export const getStreams = ({ userIds }) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([T_TKN], (tokenData) => {
      getApi({
        url: buildStreamsUrl({ user_id: userIds }),
        accessToken: tokenData[T_TKN],
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  })
}

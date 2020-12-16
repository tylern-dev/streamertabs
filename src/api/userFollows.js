import { getApi, postApi } from '../fetchUtil'
import { T_TKN } from '../consts'
import { buildFollowsUrl } from '../utils'

export const getFollows = ({ fromId, after }) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([T_TKN], (tokenData) => {
      getApi({
        url: buildFollowsUrl({ from_id: fromId, after }),
        accessToken: tokenData[T_TKN],
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  })
}

export const deleteFollow = ({ fromId, toId }) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([T_TKN], (tokenData) => {
      postApi({
        url: buildFollowsUrl({ to_id: toId, from_id: fromId }),
        method: 'delete',
        accessToken: tokenData[T_TKN],
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  })
}

export const createFollow = ({ fromId, toId }) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([T_TKN], (tokenData) => {
      postApi({
        url: buildFollowsUrl({ to_id: toId, from_id: fromId }),
        accessToken: tokenData[T_TKN],
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error))
    })
  })
}

import { getApi } from '../fetchUtil'
import { T_TKN } from '../consts'
import { buildGamesUrl } from '../utils'

export const getGames = (gameIds) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([T_TKN], (tokenData) => {
      getApi({
        url: buildGamesUrl({ gameId: gameIds }),
        accessToken: tokenData[T_TKN],
      })
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  })
}

import { TWITCH_CLIENT_ID } from './consts'

function status(response) {
  if (response.status === 204) {
    return Promise.resolve()
  } else if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response ? response.json() : {}
}

export const getApi = ({ url = '', accessToken, queryParams = {}, method = '', isOauth }) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': `${TWITCH_CLIENT_ID}`,
      },
    })
      .then(status)
      .then(json)
      .then((data) => {
        resolve(data)
      })
      .catch((error) => reject(new Error(error)))
  })
}

export const postApi = ({ url = '', method = 'post', accessToken, isOauth }) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: {
        Authorization: `${isOauth ? 'OAuth ' : 'Bearer '}${accessToken}`,
        'Client-Id': `${TWITCH_CLIENT_ID}`,
      },
    })
      .then(status)
      .then(json)
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  })
}

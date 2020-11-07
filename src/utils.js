import { TWITCH_USERS_FOLLOWS, TWITCH_GET_STREAMS, TWITCH_QUERY_STREAMS, TWITCH_GAMES } from './consts'

export const extractStreamerIds = (usersData) => {
  return usersData.map(userData => userData.to_id)
}

export const  buildFollowsUrl = ({after, from_id, first}) => {
  return `${TWITCH_USERS_FOLLOWS}?from_id=${from_id}${after ? `&after=${after}` : ''}${first ? `&first=${first}` : ''}`
}

export const buildStreamsUrl = ({user_id, user_login, game_id, first, before, after}) => {

  if(user_id instanceof Array){
    user_id = user_id.join('&user_id=')
  }
  return `${TWITCH_GET_STREAMS}?${user_id ? `user_id=${user_id}` : ''}${first ? `&first=${first}`: ''}${after ? `&after=${after}` : ''}`
}

export const buildStreamsQueryUrl = ({query, first, after: cursor, liveOnly=false}) => {
  if(query instanceof Array){
    query = query.join('&query=')
  }
  return `${TWITCH_QUERY_STREAMS}?${query ? `query=${query}`:''}${first ? `&first=${first}` : ''}${cursor ? `&after=${cursor}` : ''}&live_only=${liveOnly}`
}

export const buildGamesUrl = ({gameId}) => {
  if(gameId instanceof Array){
    gameId = gameId.join('&id=')
  }
  return `${TWITCH_GAMES}?${gameId ? `id=${gameId}` : ''}`
}

export const reconstructUsersObj = ({userData, streamsToAdd, gamesToAdd}) => {
  return userData.map(ud => ({
    ...ud,
    ...streamsToAdd.find(dta => dta.user_id === ud.to_id),
    ...gamesToAdd.find(gta => {
        let result
        streamsToAdd.forEach((sta) => {
          if(sta.user_id === ud.to_id && gta.id === sta.game_id){
            result = gta
          }
        })
        return result
    })
  }))
}

export const chunkArray = (array, size)=>{
  const result = []
  for (let i = 0; i < array.length; i += size){
    const chunk = array.slice(i, i + size)
    result.push(chunk)
  }

  return result
}



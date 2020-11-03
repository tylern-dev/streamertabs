import { useState, useEffect } from 'react'
import {  T_TKN } from '../../consts'
import { getApi} from '../../fetchUtil'
import { buildFollowsUrl, buildStreamsQueryUrl, buildStreamsUrl } from '../../utils'


const useTwitchUsers = ({userId,  first=100}) => {

  const [userFollows, setUserFollows] = useState([])
  const [ userFollowsCursors, setUserFollowsCursors ] = useState([])
  const [streams, setStreams ] = useState([])
  const [isLoading, setIsLoading ] = useState(false)
  console.log('userFollows', userFollows)

  const loadStreams = () => {

    const followedUserIds = (userFollows && userFollows?.map(({to_id}) => to_id)) || []
    console.log('followedUserIds', followedUserIds)
    if(userFollows && followedUserIds.length > 0){
          chrome.storage.local.get([T_TKN], (response) => {
            setIsLoading(true)
            getApi({
              url: buildStreamsUrl({user_id: followedUserIds, first }),
              accessToken: response[T_TKN],
            })
              .then(({data, pagination}) => {
                console.log(data)
          
                setIsLoading(false)
                setStreams(data)
                // setCursors(cursor => ({
                //   ...cursor,
                   
                // }))
              })
              .catch(error => {
                setIsLoading(false)
                new Error(error)
              })

          })
        }
  }

  const loadUserFollows = ({after}) => {
    return new Promise((resolve, reject)=>{
      chrome.storage.local.get([T_TKN], (response) => {
        if(response[T_TKN]) {
          setIsLoading(true)
          getApi({
            url: buildFollowsUrl({from_id: userId, after, first}),
            accessToken: response[T_TKN],
          })
            .then(({data, pagination}) => {
              data.forEach(o => {
                setUserFollows(users => [...users, o])
              })
              if(pagination?.cursor){
                setUserFollowsCursors(cursors => [...cursors, pagination?.cursor])
                loadUserFollows({after: pagination?.cursor})
              } else {
                return resolve()
              }
              setIsLoading(false)
            })
            .catch(error => {
              setIsLoading(false)
              return reject(new Error(error))
            })
        }
  
      })

    })
  }
  useEffect(() => {
    if(userId){
      loadUserFollows({}).then(loadStreams)
    }
  }, [userId,  first])


  useEffect(() => {
    // const followedUserIds = (userFollows && userFollows?.map(({to_id}) => to_id)) || []
    // if(userFollows && followedUserIds.length > 0){
    //       chrome.storage.local.get([T_TKN], (response) => {
    //         setIsLoading(true)
    //         getApi({
    //           url: buildStreamsUrl({user_id: followedUserIds, first }),
    //           accessToken: response[T_TKN],
    //         })
    //           .then(({data, pagination}) => {
    //             console.log(data)
          
    //             setIsLoading(false)
    //             setStreams(data)
    //             // setCursors(cursor => ({
    //             //   ...cursor,
                   
    //             // }))
    //           })
    //           .catch(error => {
    //             setIsLoading(false)
    //             new Error(error)
    //           })

    //       })
    //     }
  }, [userFollows])


  return {
    userFollows,
    streams,
    userFollowsCursors,
    loadUserFollows,
    isLoading
  }
}

export default useTwitchUsers
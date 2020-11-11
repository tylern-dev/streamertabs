import { useState, useCallback, useEffect } from 'react'
import { T_TKN } from '../../consts'
import { getApi } from '../../fetchUtil'
import {  buildTwitchUsersUrl, chunkArray } from '../../utils'


const useUserData = ({userFollowsData, isUsersLoading, isLoggedIn}) => {
    const [isGetUserDataLoading, setIsGetUserDataLoading] = useState()
    const [userData, setUserData] = useState([])

    const getUserData = useCallback(() =>{
      const userIds = userFollowsData.map(ud => ud.to_id)
      const chunkedArray = chunkArray(userIds, 75)
      chunkedArray.forEach((chunk) =>{
        setIsGetUserDataLoading(true)
        chrome.storage.local.get([T_TKN], (response) =>{
          getApi({
            url: buildTwitchUsersUrl({user_id: chunk}),
            accessToken: response[T_TKN]
          })
          .then(({data}) =>{
            data.forEach(u => {
              setUserData(ud => [...ud, u])

              setIsGetUserDataLoading(false)
            })
          })
          .catch((error)=>{
            return new Error(error)
          })
        })
      })
    }, [userFollowsData])

    useEffect(() => {
      if(userFollowsData.length > 0 && !isUsersLoading){
        getUserData()
      }
    },[userFollowsData, isUsersLoading, getUserData])

    useEffect(() => {
      if(!isLoggedIn){
        setUserData([])
      }
    }, [isLoggedIn])

    return{
      isGetUserDataLoading,
      userData
    }

}

export default useUserData
import React, { useState, useEffect, useContext } from 'react'
import { FAVORITES } from '../../consts'
const FavoritesContext = React.createContext({})

const FavoritesProvider = ({children}) => {

  const [ favoriteStreams, setFavoriteStreams] = useState([])
  const [ isLoading, setIsLoading ] = useState()

  const getFavorites = () => {
    chrome.storage.sync.get(['favorites'], (response) =>{
      console.log(response)
      // setFavoriteStreams(streams => [...response, ])
    })
  }

  const setFavorites = ({id}) => {
    if(!favoriteStreams?.includes(id)){
      setFavoriteStreams(stream => [...stream, id])
      chrome.storage.sync.set({favorites: favoriteStreams})
    }
    console.log(favoriteStreams)
  }

  const removeFavorite = ({id}) => {
    if(favoriteStreams?.includes(id)){
      setFavoriteStreams(favoriteStreams.filter(streamId => streamId !== id))
    }
  }

  const clearAllFavorites = () => {
    setFavoriteStreams([])
    chrome.storage.sync.set({favorites: []})
  }
  const data = {favoriteStreams, isLoading, setFavorites, getFavorites, removeFavorite, clearAllFavorites}

  // useEffect(() => {
  //   if(favoriteStreams){
  //     chrome.storage.sync.set({favorites: favoriteStreams})
  //   }
  // }, [favoriteStreams])

  useEffect(() => {
      chrome.storage.sync.get([FAVORITES], ({favorites}) => {
        console.log('favorites', favorites)
        if(favorites){
          setFavoriteStreams([...favorites])
        }
      })
  },[])

  return (
    <FavoritesContext.Provider value={data}>
      {children}
    </FavoritesContext.Provider>
  )
}

const useFavorites = () => {
  const {favoriteStreams, setFavorites, getFavorites, removeFavorite, clearAllFavorites} = useContext(FavoritesContext)

  return {favoriteStreams, setFavorites, getFavorites, removeFavorite, clearAllFavorites}
}

export {
  FavoritesProvider,
  useFavorites
}
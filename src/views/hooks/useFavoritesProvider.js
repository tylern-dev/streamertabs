import React, { useState, useEffect, useContext } from 'react'
const FavoritesContext = React.createContext({})

const FavoritesProvider = ({children}) => {

  const [ favoriteStreams, setFavoriteStreams] = useState([])

  const getFavorites = () => {
    chrome.storage.sync.get(['favorites'], ({favorites}) =>{
      if(favorites){
        setFavoriteStreams(favorites)
      }
    })
  }

  const setFavorites = (id) => {
    if(id){
      setFavoriteStreams(streamIds => [...streamIds, id])
      chrome.storage.sync.set({favorites: [...favoriteStreams, id]})
    }
  }

  const removeFavorite = (id) => {
    if(id){
      const streamsWithRemovedId = favoriteStreams.filter(streamId => streamId !== id)
      setFavoriteStreams(streamsWithRemovedId)
      chrome.storage.sync.set({favorites: streamsWithRemovedId})
    }
  }

  const clearAllFavorites = () => {
    setFavoriteStreams([])
    chrome.storage.sync.set({favorites: []})
  }

  useEffect(() => {
    getFavorites()
  },[])

  const data = {favoriteStreams, setFavorites, getFavorites, removeFavorite, clearAllFavorites}

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
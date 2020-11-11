import React, { useState, useEffect, useContext } from 'react'

const FavoritesContext = React.createContext({})

const FavoritesProvider = ({children}) => {

  const [ favoriteStreams, setFavoriteStreams] = useState([])
  const [ isLoading, setIsLoading ] = useState()

  const getFavorites = () => {}

  const setFavorites = ({id}) => {
    chrome.storage.sync.set()
  }

  const data = {favoriteStreams, isLoading, setFavorites}

  return (
    <FavoritesContext.Provider value={data}>
      {children}
    </FavoritesContext.Provider>
  )
}

const useFavorites = () => {
  const {favoriteStreams, setFavorites} = useContext(FavoritesContext)

  return {favoriteStreams, setFavorites}
}

export {
  FavoritesProvider,
  useFavorites
}
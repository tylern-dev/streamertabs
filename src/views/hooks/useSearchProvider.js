import React, {useEffect, useState, useContext} from 'react'

const SearchContext = React.createContext({})

const SearchProvider = ({children}) => {

  return (
    <SearchContext.Provider>
      {children}
    </SearchContext.Provider>
  )
}

const useSearch = () => {
  return {}
}

export {
  SearchProvider,
  useSearch
}
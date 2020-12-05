import React, { useState, useContext} from 'react'
import useQueryChannel from '../hooks/useQueryChannels'
import useUserData from './useUserData'
import { getGames } from '../../api/getGames'
const SearchContext = React.createContext({})

const SearchProvider = ({children }) => {
  const { getUserDataByLoginName } = useUserData({})
  const { handleQueryChannels } = useQueryChannel()
  const [isLoading, setIsLoading] = useState(false)
  // const [shouldShowQueryResults, setShouldShowQueryResults] = useState(false)
  const [searchedTerm, setSearchedTerm] = useState('')
  const [queryResult, setQueryResult] = useState([])
  const [paginationCursor, setPaginationCursor] = useState('')
  const [gameData, setGameData] = useState([])

  const handleSearchTwitch = ({query, searchedTerm, first}) => {
    setIsLoading(true)

    // need to clear these out if there is a new query. Not if we are loading more
    if(query){
      setSearchedTerm(query)
      setQueryResult([])
      setPaginationCursor('')
    }

    handleQueryChannels({
      searchTerm: query ?? searchedTerm,
      first: first ?? 5,
      cursor: paginationCursor
    })
      .then(({data: channelData, pagination}) => {
        if(channelData){
          const loginNames = channelData.map(cd => cd?.display_name)
          getUserDataByLoginName({loginNames}).then((userData) => {
            const channelDataWithUserData =  channelData.map(cd => Object.assign({}, cd, userData.find(ud => ud.login === cd.display_name)))

            const gameIds = channelDataWithUserData.map(ud => ud?.game_id)
            if(gameIds.length){
              getGames(gameIds).then(({data}) => setGameData(gameData => [...gameData, ...data]))
            }
            setQueryResult(prevData => [...prevData, ...channelDataWithUserData])
          })
        }
        if(pagination?.cursor) {
          setPaginationCursor(pagination?.cursor)
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const handleShowMoreResults = () => {
    handleSearchTwitch({searchedTerm: searchedTerm, first: 10})
  }

  const handleClearSearch = () => {
    setSearchedTerm('')
    setQueryResult([])
    setPaginationCursor('')
  }


  const data = {gameData, searchedTerm, queryResult, handleSearchTwitch, handleClearSearch,handleShowMoreResults, isLoading}

  return (
    <SearchContext.Provider value={data}>
      {children}
    </SearchContext.Provider>
  )
}

const useSearch = () => {
  const { gameData, searchedTerm, queryResult, handleSearchTwitch, handleClearSearch, handleShowMoreResults, isLoading} = useContext(SearchContext)
  return { gameData, searchedTerm, queryResult, handleSearchTwitch, handleClearSearch, handleShowMoreResults, isLoading }
}

export {
  SearchProvider,
  useSearch
}
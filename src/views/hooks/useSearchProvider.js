import React, { useState, useContext} from 'react'
import useQueryChannel from '../hooks/useQueryChannels'
const SearchContext = React.createContext({})

const SearchProvider = ({children, }) => {
  const { handleQueryChannels } = useQueryChannel()
  const [isLoading, setIsLoading] = useState(false)
  const [shouldShowQueryResults, setShouldShowQueryResults] = useState(false)
  const [searchedTerm, setSearchedTerm] = useState('')
  const [queryResult, setQueryResult] = useState([])
  const [paginationCursor, setPaginationCursor] = useState('')

  const handleSearchTwitch = ({query, isLive}) => {
    if(query.length > 0){
      setSearchedTerm(query)
      setIsLoading(true)
      setShouldShowQueryResults(true)

      handleQueryChannels({searchTerm: query, isLive })
        .then(({data, pagination}) => {
          if(data){
            setQueryResult(data)
          }
          if(pagination?.cursor) {
            setPaginationCursor(pagination?.cursor)
          }
          setIsLoading(false)

        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          setShouldShowQueryResults(false)
        })
    }
  }

  const handleShowMoreResults = () => {
    console.log(searchedTerm, paginationCursor, )
    handleQueryChannels({searchTerm: searchedTerm, cursor: paginationCursor })
        .then(({data, pagination}) => {
          if(data){
            setQueryResult(prevData => [...prevData, ...data])
          }
          if(pagination?.cursor) {
            setPaginationCursor(pagination?.cursor)
          }
          setIsLoading(false)

        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          setShouldShowQueryResults(false)
        })
  }

  const handleCloseSearchResults = () => {
    setShouldShowQueryResults(false)
    setSearchedTerm('')
    setQueryResult([])
    setPaginationCursor('')
  }


  const data = {queryResult, handleSearchTwitch, handleCloseSearchResults,handleShowMoreResults, isLoading}

  return (
    <SearchContext.Provider value={data}>
      {children({ shouldShowQueryResults })}
    </SearchContext.Provider>
  )
}

const useSearch = () => {
  const {queryResult, handleSearchTwitch, handleCloseSearchResults, handleShowMoreResults, isLoading} = useContext(SearchContext)
  return {queryResult, handleSearchTwitch, handleCloseSearchResults, handleShowMoreResults, isLoading }
}

export {
  SearchProvider,
  useSearch
}
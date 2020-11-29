import React from 'react'
import styled from 'styled-components'
import { useSearch } from '../hooks/useSearchProvider'

const StyledHeader = styled.h1`
  color: #efefef;
`

const ResultsSection = styled.section`
  display: grid;
  gap: 16px;
`
const QueryResult = () => {
  const {queryResult, handleShowMoreResults, isLoading} = useSearch()
  console.log(queryResult)
  return (
    <ResultsSection>
      <StyledHeader>Results</StyledHeader>

      {/* <Result /> */}
      <button onClick={() => handleShowMoreResults()}>show more</button>
    </ResultsSection>
  )
}

export default QueryResult
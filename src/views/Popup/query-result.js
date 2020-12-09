import React from 'react'
import styled from 'styled-components'
import { useSearch } from '../hooks/useSearchProvider'
import Result from './result'
import Loading from '../../components/loading'

import { useTwitch } from '../hooks/useTwitchProvider'
const StyledHeader = styled.h1`
  color: #efefef;
`

const ResultsSectionContainer = styled.section`
  display: grid;
  gap: 16px;
  grid-auto-rows: min-content;
`

const ResultSection = styled.div`
  display: grid;
  gap: 24px;
`

const StyledShowMoreButton = styled.button`
  justify-self: start;
  border: 0;
  background: none;
  color: #6d72d6;
  font-size: 1.3em;
  padding: 16px;
  cursor: pointer;
  font-weight: 600;

  :hover {
    text-decoration: underline;
  }
`

const QueryResult = () => {
  const { queryResult, gameData, handleShowMoreResults, searchedTerm, isLoading } = useSearch()
  const { userFollowsData } = useTwitch()

  const buildGameData = (userData) => gameData?.find((gd) => gd?.id === userData?.game_id)
  const getFollowingUserData = (userData) => userFollowsData?.find((ufd) => ufd.to_id === userData?.id)

  if (isLoading) return <Loading />

  if (!queryResult) return null
  return (
    <ResultsSectionContainer>
      <StyledHeader>Results for {`"${searchedTerm}"`}</StyledHeader>
      <ResultSection>
        {!queryResult.length && <b>{`No channels found for "${searchedTerm}" `}</b>}
        {queryResult.map((userData, index) => (
          <Result
            userData={userData}
            gameData={buildGameData(userData)}
            followingUserData={getFollowingUserData(userData)}
            key={index}
          />
        ))}
      </ResultSection>
      <StyledShowMoreButton onClick={() => handleShowMoreResults()}>show more</StyledShowMoreButton>
    </ResultsSectionContainer>
  )
}

export default QueryResult
